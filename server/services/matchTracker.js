const Match = require('../models/Match');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { getMatches } = require('./footballApi');
const { sendNotificationToUsers } = require('./notificationService');

const teamNamesAr = {
  758: 'أوروغواي', 759: 'ألمانيا', 760: 'إسبانيا', 761: 'باراغواي',
  762: 'الأرجنتين', 763: 'غانا', 764: 'البرازيل', 765: 'البرتغال',
  766: 'اليابان', 769: 'المكسيك', 770: 'إنجلترا', 771: 'أمريكا',
  772: 'كوريا الجنوبية', 773: 'فرنسا', 774: 'جنوب أفريقيا',
  778: 'الجزائر', 779: 'أستراليا', 783: 'نيوزيلندا', 788: 'سويسرا',
  791: 'إكوادور', 792: 'السويد', 798: 'التشيك', 799: 'كرواتيا',
  801: 'السعودية', 802: 'تونس', 803: 'تركيا', 804: 'السنغال',
  805: 'بلجيكا', 815: 'المغرب', 816: 'النمسا', 818: 'كولومبيا',
  825: 'مصر', 828: 'كندا', 836: 'هايتي', 840: 'إيران',
  1060: 'البوسنة والهرسك', 1836: 'بنما', 1930: 'الرأس الأخضر',
  1934: 'الكونغو الديمقراطية', 1935: 'ساحل العاج', 8030: 'قطر',
  8049: 'الأردن', 8062: 'العراق', 8070: 'أوزبكستان', 8601: 'هولندا',
  8872: 'النرويج', 8873: 'اسكتلندا', 9460: 'كوراساو'
};

async function trackMatches(fastOnly = false, slowOnly = false) {
  try {
    console.log('Tracking matches...');
    const apiMatches = await getMatches();
    for (const apiMatch of apiMatches) {
      const isLive = apiMatch.status === 'IN_PLAY' || apiMatch.status === 'PAUSED';
      const isFinished = apiMatch.status === 'FINISHED';
      if (fastOnly && !isLive) continue;
      if (slowOnly && !isFinished) continue;

      const homeTeamId = apiMatch.homeTeam.id;
      const awayTeamId = apiMatch.awayTeam.id;
      const homeTeamName = apiMatch.homeTeam.name;
      const awayTeamName = apiMatch.awayTeam.name;
      const homeTeamNameAr = teamNamesAr[homeTeamId] || homeTeamName;
      const awayTeamNameAr = teamNamesAr[awayTeamId] || awayTeamName;

      let match = await Match.findOne({ apiMatchId: apiMatch.id });
      if (!match) {
        match = new Match({
          apiMatchId: apiMatch.id,
          homeTeamId: homeTeamId,
          awayTeamId: awayTeamId,
          homeTeamName: homeTeamName,
          awayTeamName: awayTeamName,
          homeTeamNameAr: homeTeamNameAr,
          awayTeamNameAr: awayTeamNameAr,
          homeScore: apiMatch.score.fullTime.home || 0,
          awayScore: apiMatch.score.fullTime.away || 0,
          status: apiMatch.status,
          utcDate: new Date(apiMatch.utcDate),
          matchday: apiMatch.matchday,
          group: apiMatch.group ? apiMatch.group.replace('GROUP_', '') : null,
          stage: apiMatch.stage,
          events: apiMatch.goals ? apiMatch.goals.map(g => ({
            type: 'GOAL',
            teamId: g.team.id,
            player: g.scorer.name,
            assist: g.assist ? g.assist.name : null,
            minute: g.minute,
            extraTime: g.extraTime || 0
          })) : [],
          lastChecked: new Date()
        });
        await match.save();
      } else {
        const oldHomeScore = match.homeScore;
        const oldAwayScore = match.awayScore;
        match.homeScore = apiMatch.score.fullTime.home || 0;
        match.awayScore = apiMatch.score.fullTime.away || 0;
        match.status = apiMatch.status;
        match.events = apiMatch.goals ? apiMatch.goals.map(g => ({
          type: 'GOAL',
          teamId: g.team.id,
          player: g.scorer.name,
          assist: g.assist ? g.assist.name : null,
          minute: g.minute,
          extraTime: g.extraTime || 0
        })) : [];
        match.lastChecked = new Date();
        match.lastUpdated = new Date();
        await match.save();
        if (match.homeScore > oldHomeScore || match.awayScore > oldAwayScore) {
          await handleGoalScored(match, apiMatch, oldHomeScore, oldAwayScore);
        }
      }
    }
    console.log('Match tracking completed');
  } catch (error) {
    console.error('Error tracking matches:', error);
  }
}

async function handleGoalScored(match, apiMatch, oldHomeScore, oldAwayScore) {
  try {
    const users = await User.find({ notificationsEnabled: true });
    for (const user of users) {
      const isHomeTeam = user.selectedTeams.includes(match.homeTeamId);
      const isAwayTeam = user.selectedTeams.includes(match.awayTeamId);
      if (!isHomeTeam && !isAwayTeam) continue;
      if (match.homeScore > oldHomeScore && isHomeTeam) {
        await createNotification(user, match, 'GOAL_SCORED', match.homeTeamId);
      }
      if (match.homeScore > oldHomeScore && isAwayTeam) {
        await createNotification(user, match, 'GOAL_CONCEDED', match.homeTeamId);
      }
      if (match.awayScore > oldAwayScore && isAwayTeam) {
        await createNotification(user, match, 'GOAL_SCORED', match.awayTeamId);
      }
      if (match.awayScore > oldAwayScore && isHomeTeam) {
        await createNotification(user, match, 'GOAL_CONCEDED', match.awayTeamId);
      }
    }
  } catch (error) {
    console.error('Error handling goal:', error);
  }
}

async function createNotification(user, match, type, teamId) {
  try {
    const teamName = teamId === match.homeTeamId ? match.homeTeamName : match.awayTeamName;
    const teamNameAr = teamId === match.homeTeamId ? match.homeTeamNameAr : match.awayTeamNameAr;
    const isScored = type === 'GOAL_SCORED';
    const message = isScored
      ? `${teamName} scored! ${match.homeTeamName} ${match.homeScore} - ${match.awayScore} ${match.awayTeamName}`
      : `${teamName} conceded! ${match.homeTeamName} ${match.homeScore} - ${match.awayScore} ${match.awayTeamName}`;
    const messageAr = isScored
      ? `${teamNameAr} سجلت هدف! ${match.homeTeamNameAr} ${match.homeScore} - ${match.awayScore} ${match.awayTeamNameAr}`
      : `${teamNameAr} استقبلت هدف! ${match.homeTeamNameAr} ${match.homeScore} - ${match.awayScore} ${match.awayTeamNameAr}`;
    const notification = new Notification({
      userId: user._id,
      matchId: match._id,
      type,
      teamId,
      teamName,
      teamNameAr,
      message,
      messageAr,
      matchInfo: {
        homeTeam: match.homeTeamName,
        awayTeam: match.awayTeamName,
        homeTeamAr: match.homeTeamNameAr,
        awayTeamAr: match.awayTeamNameAr,
        homeScore: match.homeScore,
        awayScore: match.awayScore
      },
      read: false
    });
    await notification.save();
    await sendNotificationToUsers(user, {
      title: isScored ? `${teamName} scored!` : `${teamName} conceded!`,
      titleAr: isScored ? `${teamNameAr} سجلت هدف!` : `${teamNameAr} استقبلت هدف!`,
      body: message,
      bodyAr: messageAr,
      teamId,
      matchId: match.apiMatchId
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}

module.exports = { trackMatches };
