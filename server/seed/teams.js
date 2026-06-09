const Team = require('../models/Team');

const teamsData = [
  { id: 825, name: 'Egypt', nameAr: 'مصر', code: 'EGY', flag: '🇪🇬', crest: 'https://crests.football-data.org/825.svg', group: 'A', confederation: 'CAF' },
  { id: 801, name: 'Saudi Arabia', nameAr: 'السعودية', code: 'KSA', flag: '🇸🇦', crest: 'https://crests.football-data.org/saudi_arabia.svg', group: 'A', confederation: 'AFC' },
  { id: 769, name: 'Mexico', nameAr: 'المكسيك', code: 'MEX', flag: '🇲🇽', crest: 'https://crests.football-data.org/769.svg', group: 'A', confederation: 'CONCACAF' },
  { id: 774, name: 'South Africa', nameAr: 'جنوب أفريقيا', code: 'RSA', flag: '🇿🇦', crest: 'https://crests.football-data.org/9396.svg', group: 'A', confederation: 'CAF' },

  { id: 762, name: 'Argentina', nameAr: 'الأرجنتين', code: 'ARG', flag: '🇦🇷', crest: 'https://crests.football-data.org/762.png', group: 'B', confederation: 'CONMEBOL' },
  { id: 815, name: 'Morocco', nameAr: 'المغرب', code: 'MAR', flag: '🇲🇦', crest: 'https://crests.football-data.org/morocco.svg', group: 'B', confederation: 'CAF' },
  { id: 779, name: 'Australia', nameAr: 'أستراليا', code: 'AUS', flag: '🇦🇺', crest: 'https://crests.football-data.org/779.svg', group: 'B', confederation: 'AFC' },
  { id: 783, name: 'New Zealand', nameAr: 'نيوزيلندا', code: 'NZL', flag: '🇳🇿', crest: 'https://crests.football-data.org/783.svg', group: 'B', confederation: 'OFC' },

  { id: 764, name: 'Brazil', nameAr: 'البرازيل', code: 'BRA', flag: '🇧🇷', crest: 'https://crests.football-data.org/764.svg', group: 'C', confederation: 'CONMEBOL' },
  { id: 802, name: 'Tunisia', nameAr: 'تونس', code: 'TUN', flag: '🇹🇳', crest: 'https://crests.football-data.org/tunisia.svg', group: 'C', confederation: 'CAF' },
  { id: 759, name: 'Germany', nameAr: 'ألمانيا', code: 'GER', flag: '🇩🇪', crest: 'https://crests.football-data.org/759.svg', group: 'C', confederation: 'UEFA' },
  { id: 766, name: 'Japan', nameAr: 'اليابان', code: 'JPN', flag: '🇯🇵', crest: 'https://crests.football-data.org/766.svg', group: 'C', confederation: 'AFC' },

  { id: 773, name: 'France', nameAr: 'فرنسا', code: 'FRA', flag: '🇫🇷', crest: 'https://crests.football-data.org/773.svg', group: 'D', confederation: 'UEFA' },
  { id: 778, name: 'Algeria', nameAr: 'الجزائر', code: 'ALG', flag: '🇩🇿', crest: 'https://crests.football-data.org/algeria.svg', group: 'D', confederation: 'CAF' },
  { id: 8062, name: 'Iraq', nameAr: 'العراق', code: 'IRQ', flag: '🇮🇶', crest: 'https://crests.football-data.org/iraq.svg', group: 'D', confederation: 'AFC' },
  { id: 771, name: 'USA', nameAr: 'أمريكا', code: 'USA', flag: '🇺🇸', crest: 'https://crests.football-data.org/usa.svg', group: 'D', confederation: 'CONCACAF' },

  { id: 770, name: 'England', nameAr: 'إنجلترا', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', crest: 'https://crests.football-data.org/770.svg', group: 'E', confederation: 'UEFA' },
  { id: 8030, name: 'Qatar', nameAr: 'قطر', code: 'QAT', flag: '🇶🇦', crest: 'https://crests.football-data.org/8030.svg', group: 'E', confederation: 'AFC' },
  { id: 840, name: 'Iran', nameAr: 'إيران', code: 'IRN', flag: '🇮🇷', crest: 'https://crests.football-data.org/iran.svg', group: 'E', confederation: 'AFC' },
  { id: 8049, name: 'Jordan', nameAr: 'الأردن', code: 'JOR', flag: '🇯🇴', crest: 'https://crests.football-data.org/8049.png', group: 'E', confederation: 'AFC' },

  { id: 760, name: 'Spain', nameAr: 'إسبانيا', code: 'ESP', flag: '🇪🇸', crest: 'https://crests.football-data.org/760.svg', group: 'F', confederation: 'UEFA' },
  { id: 805, name: 'Belgium', nameAr: 'بلجيكا', code: 'BEL', flag: '🇧🇪', crest: 'https://crests.football-data.org/805.svg', group: 'F', confederation: 'UEFA' },
  { id: 799, name: 'Croatia', nameAr: 'كرواتيا', code: 'CRO', flag: '🇭🇷', crest: 'https://crests.football-data.org/799.svg', group: 'F', confederation: 'UEFA' },
  { id: 792, name: 'Sweden', nameAr: 'السويد', code: 'SWE', flag: '🇸🇪', crest: 'https://crests.football-data.org/792.svg', group: 'F', confederation: 'UEFA' },

  { id: 786, name: 'Italy', nameAr: 'إيطاليا', code: 'ITA', flag: '🇮🇹', crest: 'https://crests.football-data.org/786.svg', group: 'G', confederation: 'UEFA' },
  { id: 8601, name: 'Netherlands', nameAr: 'هولندا', code: 'NED', flag: '🇳🇱', crest: 'https://crests.football-data.org/8601.svg', group: 'G', confederation: 'UEFA' },
  { id: 788, name: 'Switzerland', nameAr: 'سويسرا', code: 'SUI', flag: '🇨🇭', crest: 'https://crests.football-data.org/788.svg', group: 'G', confederation: 'UEFA' },
  { id: 820, name: 'Denmark', nameAr: 'الدنمارك', code: 'DEN', flag: '🇩🇰', crest: 'https://crests.football-data.org/820.svg', group: 'G', confederation: 'UEFA' },

  { id: 765, name: 'Portugal', nameAr: 'البرتغال', code: 'POR', flag: '🇵🇹', crest: 'https://crests.football-data.org/765.svg', group: 'H', confederation: 'UEFA' },
  { id: 772, name: 'South Korea', nameAr: 'كوريا', code: 'KOR', flag: '🇰🇷', crest: 'https://crests.football-data.org/772.png', group: 'H', confederation: 'AFC' },
  { id: 816, name: 'Austria', nameAr: 'النمسا', code: 'AUT', flag: '🇦🇹', crest: 'https://crests.football-data.org/816.svg', group: 'H', confederation: 'UEFA' },
  { id: 763, name: 'Ghana', nameAr: 'غانا', code: 'GHA', flag: '🇬🇭', crest: 'https://crests.football-data.org/ghana.svg', group: 'H', confederation: 'CAF' },

  { id: 827, name: 'Poland', nameAr: 'بولندا', code: 'POL', flag: '🇵🇱', crest: 'https://crests.football-data.org/827.svg', group: 'I', confederation: 'UEFA' },
  { id: 804, name: 'Senegal', nameAr: 'السنغال', code: 'SEN', flag: '🇸🇳', crest: 'https://crests.football-data.org/senegal.svg', group: 'I', confederation: 'CAF' },
  { id: 868, name: 'Romania', nameAr: 'رومانيا', code: 'ROU', flag: '🇷🇴', crest: 'https://crests.football-data.org/868.svg', group: 'I', confederation: 'UEFA' },
  { id: 813, name: 'Nigeria', nameAr: 'نيجيريا', code: 'NGA', flag: '🇳🇬', crest: 'https://crests.football-data.org/813.svg', group: 'I', confederation: 'CAF' },

  { id: 866, name: 'Serbia', nameAr: 'صربيا', code: 'SRB', flag: '🇷🇸', crest: 'https://crests.football-data.org/866.svg', group: 'J', confederation: 'UEFA' },
  { id: 798, name: 'Czechia', nameAr: 'التشيك', code: 'CZE', flag: '🇨🇿', crest: 'https://crests.football-data.org/798.svg', group: 'J', confederation: 'UEFA' },
  { id: 8872, name: 'Norway', nameAr: 'النرويج', code: 'NOR', flag: '🇳🇴', crest: 'https://crests.football-data.org/813.svg', group: 'J', confederation: 'UEFA' },
  { id: 812, name: 'Cameroon', nameAr: 'الكاميرون', code: 'CMR', flag: '🇨🇲', crest: 'https://crests.football-data.org/812.svg', group: 'J', confederation: 'CAF' },

  { id: 8070, name: 'Uzbekistan', nameAr: 'أوزبكستان', code: 'UZB', flag: '🇺🇿', crest: 'https://crests.football-data.org/8070.png', group: 'K', confederation: 'AFC' },
  { id: 1935, name: 'Ivory Coast', nameAr: 'ساحل العاج', code: 'CIV', flag: '🇨🇮', crest: 'https://crests.football-data.org/787.svg', group: 'K', confederation: 'CAF' },
  { id: 1836, name: 'Panama', nameAr: 'بنما', code: 'PAN', flag: '🇵🇦', crest: 'https://crests.football-data.org/panama.svg', group: 'K', confederation: 'CONCACAF' },
  { id: 818, name: 'Colombia', nameAr: 'كولومبيا', code: 'COL', flag: '🇨🇴', crest: 'https://crests.football-data.org/818.svg', group: 'K', confederation: 'CONMEBOL' },

  { id: 758, name: 'Uruguay', nameAr: 'أوروغواي', code: 'URU', flag: '🇺🇾', crest: 'https://crests.football-data.org/758.svg', group: 'L', confederation: 'CONMEBOL' },
  { id: 791, name: 'Ecuador', nameAr: 'إكوادور', code: 'ECU', flag: '🇪🇨', crest: 'https://crests.football-data.org/791.svg', group: 'L', confederation: 'CONMEBOL' },
  { id: 761, name: 'Paraguay', nameAr: 'باراغواي', code: 'PAR', flag: '🇵🇾', crest: 'https://crests.football-data.org/761.svg', group: 'L', confederation: 'CONMEBOL' },
  { id: 803, name: 'Turkey', nameAr: 'تركيا', code: 'TUR', flag: '🇹🇷', crest: 'https://crests.football-data.org/803.svg', group: 'L', confederation: 'UEFA' }
];

async function seedTeams() {
  try {
    const count = await Team.countDocuments();
    if (count === 0) {
      await Team.insertMany(teamsData);
      console.log('Teams seeded successfully');
    } else {
      await Team.deleteMany({});
      await Team.insertMany(teamsData);
      console.log('Teams reseeded successfully');
    }
  } catch (error) {
    console.error('Error seeding teams:', error);
  }
}

module.exports = { seedTeams, teamsData };
