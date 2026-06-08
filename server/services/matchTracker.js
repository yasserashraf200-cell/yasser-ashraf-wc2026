const Match = require('../models/Match');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { getMatches } = require('./footballApi');
const { sendNotificationToUsers } = require('./notificationService');

const teamNamesAr = {
  773: 'مصر', 778: 'السعودية', 792: 'المغرب', 790: 'تونس', 789: 'الجزائر',
  783: 'الأرجنتين', 772: 'البرازيل', 762: 'ألمانيا', 773: 'مصر',
  771: 'فرنسا', 770: 'إنجلترا', 769: 'إسبانيا', 784: 'إيطاليا',
  786: 'هولندا', 785: 'البرتغال', 782: 'اليابان', 780: 'كوريا',
  768: 'المكسيك', 767: 'أمريكا', 794: 'الإمارات', 791: 'قطر',
  795: 'هونغ كونغ', 781: 'إيران', 779: 'الأردن', 793: 'أستراليا',
  796: 'العراق', 797: 'أوزبكستان', 798: 'بنما', 799: 'كوستاريكا',
  800: 'هايتي', 801: 'كوراساو', 802: 'بنما', 803: 'باراغواي',
  804: 'إكوادور', 805: 'كولومبيا', 806: 'أوروغواي', 807: 'بيرو',
  808: 'بوليفيا', 809: 'تشيلي', 810: 'فنزويلا', 811: 'غانا',
  812: 'الكاميرون', 813: 'نيجيريا', 814: 'السنغال', 815: 'ساحل العاج',
  816: 'جنوب أفريقيا', 817: 'كينيا', 818: 'أثيوبيا', 819: 'تنزانيا',
  820: 'نيوزيلندا', 821: 'فيجي', 822: 'بابوا غينيا الجديدة',
  1882: 'بلجيكا', 1883: 'سويسرا', 1884: 'الدنمارك', 1885: 'السويد',
  1886: 'النرويج', 1887: 'بولندا', 1888: 'النمسا', 1889: ' التشيك',
  1890: 'رومانيا', 1891: 'صربيا', 1892: 'كرواتيا', 1893: 'بلغاريا',
  1894: 'المجر', 1895: 'سلوفاكيا', 1896: 'سلوفينيا', 1897: 'ليتوانيا',
  1898: 'لاتفيا', 1899: 'إستونيا', 1900: 'بيلاروسيا', 1901: 'أوكرانيا',
  1902: 'جورجيا', 1903: 'أرمينيا', 1904: 'أذربيجان', 1905: 'كازاخستان',
  1906: 'قيرغيزستان', 1907: 'طاجيكستان', 1908: 'تركمانستان',
  1909: 'كوريا الشمالية', 1910: 'الصين', 1911: 'تايلاند', 1912: 'فيتنام',
  1913: 'ماليزيا', 1914: 'إندونيسيا', 1915: 'الفلبين', 1916: 'سنغافورة',
  1917: 'ميانمار', 1918: 'كمبوديا', 1919: 'لاوس', 1920: 'بروناي',
  1921: 'تيمور الشرقية', 1922: 'منغوليا', 1923: 'غواتيمالا',
  1924: 'هندوراس', 1925: 'السلفادور', 1926: 'نيكاراغوا',
  1927: 'كوستاريكا', 1928: 'بنما', 1929: 'كوبا', 1930: 'جامايكا',
  1931: 'ترينيداد وتوباغو', 1932: 'هايتي', 1933: 'غيانا',
  1934: 'سورينام', 1935: 'بربادوس', 1936: 'البهاما',
  1937: 'بليز', 1938: 'سانت لوسيا', 1938: 'سانت فينسنت والغرينادين',
  1939: 'غرناطة', 1940: 'دومينيكا', 1941: 'سانت كيتس ونيفيس',
  1942: 'أنتيغوا وباربودا', 1943: 'جزر العذراء الأمريكية',
  1944: 'جزر العذراء البريطانية', 1945: 'كوراساو'
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
      let match = await Match.findOne({ apiMatchId: apiMatch.id });
      if (!match) {
        match = new Match({
          apiMatchId: apiMatch.id,
          homeTeamId: apiMatch.homeTeam.id,
          awayTeamId: apiMatch.awayTeam.id,
          homeTeamName: apiMatch.homeTeam.shortName || apiMatch.homeTeam.name,
          awayTeamName: apiMatch.awayTeam.shortName || apiMatch.awayTeam.name,
          homeTeamNameAr: teamNamesAr[apiMatch.homeTeam.id] || apiMatch.homeTeam.name,
          awayTeamNameAr: teamNamesAr[apiMatch.awayTeam.id] || apiMatch.awayTeam.name,
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
      ? `${teamNameAr} سجلت جول! ${match.homeTeamNameAr} ${match.homeScore} - ${match.awayScore} ${match.awayTeamNameAr}`
      : `${teamNameAr} استقبلت جول! ${match.homeTeamNameAr} ${match.homeScore} - ${match.awayScore} ${match.awayTeamNameAr}`;
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
      titleAr: isScored ? `${teamNameAr} سجلت جول!` : `${teamNameAr} استقبلت جول!`,
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
