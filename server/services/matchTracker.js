const Match = require('../models/Match');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { getMatches } = require('./footballApi');
const { sendNotificationToUsers } = require('./notificationService');

const teamNamesMap = {
  'Mexico': 'المكسيك',
  'South Korea': 'كوريا الجنوبية',
  'South Africa': 'جنوب أفريقيا',
  'Czechia': 'التشيك',
  'Canada': 'كندا',
  'Switzerland': 'سويسرا',
  'Qatar': 'قطر',
  'Bosnia-Herzegovina': 'البوسنة والهرسك',
  'Brazil': 'البرازيل',
  'Morocco': 'المغرب',
  'Scotland': 'اسكتلندا',
  'Haiti': 'هايتي',
  'United States': 'أمريكا',
  'Paraguay': 'باراغواي',
  'Australia': 'أستراليا',
  'Turkey': 'تركيا',
  'Germany': 'ألمانيا',
  'Ecuador': 'إكوادور',
  'Ivory Coast': 'ساحل العاج',
  'Curaçao': 'كوراساو',
  'Netherlands': 'هولندا',
  'Japan': 'اليابان',
  'Tunisia': 'تونس',
  'Sweden': 'السويد',
  'Belgium': 'بلجيكا',
  'Egypt': 'مصر',
  'IR Iran': 'إيران',
  'New Zealand': 'نيوزيلندا',
  'Spain': 'إسبانيا',
  'Cape Verde': 'الرأس الأخضر',
  'Saudi Arabia': 'السعودية',
  'Uruguay': 'أوروغواي',
  'France': 'فرنسا',
  'Senegal': 'السنغال',
  'Iraq': 'العراق',
  'Norway': 'النرويج',
  'Argentina': 'الأرجنتين',
  'Austria': 'النمسا',
  'Algeria': 'الجزائر',
  'Jordan': 'الأردن',
  'Portugal': 'البرتغال',
  'Colombia': 'كولومبيا',
  'Uzbekistan': 'أوزبكستان',
  'Congo DR': 'الكونغو الديمقراطية',
  'England': 'إنجلترا',
  'Croatia': 'كرواتيا',
  'Ghana': 'غانا',
  'Panama': 'بنما'
};

const teamIdsMap = {
  'Mexico': 769, 'South Korea': 772, 'South Africa': 774, 'Czechia': 798,
  'Canada': 828, 'Switzerland': 788, 'Qatar': 8030, 'Bosnia-Herzegovina': 1060,
  'Brazil': 764, 'Morocco': 815, 'Scotland': 8873, 'Haiti': 836,
  'United States': 771, 'Paraguay': 761, 'Australia': 779, 'Turkey': 803,
  'Germany': 759, 'Ecuador': 791, 'Ivory Coast': 1935, 'Curaçao': 9460,
  'Netherlands': 8601, 'Japan': 766, 'Tunisia': 802, 'Sweden': 792,
  'Belgium': 805, 'Egypt': 825, 'IR Iran': 840, 'New Zealand': 783,
  'Spain': 760, 'Cape Verde': 1930, 'Saudi Arabia': 801, 'Uruguay': 758,
  'France': 773, 'Senegal': 804, 'Iraq': 8062, 'Norway': 8872,
  'Argentina': 762, 'Austria': 816, 'Algeria': 778, 'Jordan': 8049,
  'Portugal': 765, 'Colombia': 818, 'Uzbekistan': 8070, 'Congo DR': 1934,
  'England': 770, 'Croatia': 799, 'Ghana': 763, 'Panama': 1836
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

      const homeNameEn = apiMatch.homeTeam.name;
      const awayNameEn = apiMatch.awayTeam.name;
      const homeNameAr = teamNamesMap[homeNameEn] || homeNameEn;
      const awayNameAr = teamNamesMap[awayNameEn] || awayNameEn;
      const homeTeamId = teamIdsMap[homeNameEn] || apiMatch.homeTeam.id;
      const awayTeamId = teamIdsMap[awayNameEn] || apiMatch.awayTeam.id;

      let match = await Match.findOne({ apiMatchId: apiMatch.id });
      if (!match) {
        match = new Match({
          apiMatchId: apiMatch.id,
          homeTeamId: homeTeamId,
          awayTeamId: awayTeamId,
          homeTeamName: homeNameEn,
          awayTeamName: awayNameEn,
          homeTeamNameAr: homeNameAr,
          awayTeamNameAr: awayNameAr,
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
