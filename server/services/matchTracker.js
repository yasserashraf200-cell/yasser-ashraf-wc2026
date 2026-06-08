const Match = require('../models/Match');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { getMatches } = require('./footballApi');
const { sendNotificationToUsers } = require('./notificationService');

const teamNamesMap = {
  'Egypt': { ar: 'مصر', id: 825 },
  'Saudi Arabia': { ar: 'السعودية', id: 801 },
  'Morocco': { ar: 'المغرب', id: 815 },
  'Tunisia': { ar: 'تونس', id: 802 },
  'Algeria': { ar: 'الجزائر', id: 778 },
  'Argentina': { ar: 'الأرجنتين', id: 762 },
  'Brazil': { ar: 'البرازيل', id: 764 },
  'Germany': { ar: 'ألمانيا', id: 759 },
  'France': { ar: 'فرنسا', id: 773 },
  'England': { ar: 'إنجلترا', id: 770 },
  'Spain': { ar: 'إسبانيا', id: 760 },
  'Italy': { ar: 'إيطاليا', id: 786 },
  'Netherlands': { ar: 'هولندا', id: 8601 },
  'Portugal': { ar: 'البرتغال', id: 765 },
  'Japan': { ar: 'اليابان', id: 766 },
  'South Korea': { ar: 'كوريا الجنوبية', id: 772 },
  'Mexico': { ar: 'المكسيك', id: 769 },
  'United States': { ar: 'أمريكا', id: 771 },
  'Qatar': { ar: 'قطر', id: 8030 },
  'Australia': { ar: 'أستراليا', id: 779 },
  'Iraq': { ar: 'العراق', id: 8062 },
  'Iran': { ar: 'إيران', id: 840 },
  'Belgium': { ar: 'بلجيكا', id: 805 },
  'Switzerland': { ar: 'سويسرا', id: 788 },
  'Croatia': { ar: 'كرواتيا', id: 799 },
  'Sweden': { ar: 'السويد', id: 792 },
  'Senegal': { ar: 'السنغال', id: 804 },
  'Ghana': { ar: 'غانا', id: 763 },
  'Cameroon': { ar: 'الكاميرون', id: 812 },
  'Nigeria': { ar: 'نيجيريا', id: 813 },
  'Ivory Coast': { ar: 'ساحل العاج', id: 1935 },
  'South Africa': { ar: 'جنوب أفريقيا', id: 774 },
  'New Zealand': { ar: 'نيوزيلندا', id: 783 },
  'Poland': { ar: 'بولندا', id: 827 },
  'Austria': { ar: 'النمسا', id: 816 },
  'Czechia': { ar: 'التشيك', id: 798 },
  'Serbia': { ar: 'صربيا', id: 866 },
  'Norway': { ar: 'النرويج', id: 8872 },
  'Denmark': { ar: 'الدنمارك', id: 820 },
  'Turkey': { ar: 'تركيا', id: 803 },
  'Uruguay': { ar: 'أوروغواي', id: 758 },
  'Colombia': { ar: 'كولومبيا', id: 818 },
  'Ecuador': { ar: 'إكوادور', id: 791 },
  'Paraguay': { ar: 'باراغواي', id: 761 },
  'Canada': { ar: 'كندا', id: 828 },
  'Panama': { ar: 'بنما', id: 1836 },
  'Haiti': { ar: 'هايتي', id: 836 },
  'Jordan': { ar: 'الأردن', id: 8049 },
  'Uzbekistan': { ar: 'أوزبكستان', id: 8070 },
  'Bosnia-Herzegovina': { ar: 'البوسنة والهرسك', id: 1060 },
  'Cape Verde Islands': { ar: 'الرأس الأخضر', id: 1930 },
  'Congo DR': { ar: 'الكونغو الديمقراطية', id: 1934 },
  'Curaçao': { ar: 'كوراساو', id: 9460 },
  'Scotland': { ar: 'اسكتلندا', id: 8873 }
};

function getTeamInfo(teamName) {
  const info = teamNamesMap[teamName];
  if (info) return info;
  return { ar: teamName, id: 0 };
}

async function trackMatches(fastOnly = false, slowOnly = false) {
  try {
    console.log('Tracking matches...');
    const apiMatches = await getMatches();
    for (const apiMatch of apiMatches) {
      const isLive = apiMatch.status === 'IN_PLAY' || apiMatch.status === 'PAUSED';
      const isFinished = apiMatch.status === 'FINISHED';
      const isScheduled = apiMatch.status === 'TIMED' || apiMatch.status === 'SCHEDULED';
      if (fastOnly && !isLive) continue;
      if (slowOnly && !isFinished) continue;

      const homeInfo = getTeamInfo(apiMatch.homeTeam.name);
      const awayInfo = getTeamInfo(apiMatch.awayTeam.name);

      let match = await Match.findOne({ apiMatchId: apiMatch.id });
      if (!match) {
        match = new Match({
          apiMatchId: apiMatch.id,
          homeTeamId: homeInfo.id || apiMatch.homeTeam.id,
          awayTeamId: awayInfo.id || apiMatch.awayTeam.id,
          homeTeamName: apiMatch.homeTeam.name,
          awayTeamName: apiMatch.awayTeam.name,
          homeTeamNameAr: homeInfo.ar,
          awayTeamNameAr: awayInfo.ar,
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
