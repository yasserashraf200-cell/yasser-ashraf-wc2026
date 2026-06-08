const Team = require('../models/Team');

const teamsData = [
  { id: 773, name: 'Egypt', nameAr: 'مصر', code: 'EGY', flag: '🇪🇬', group: 'A', confederation: 'CAF' },
  { id: 778, name: 'Saudi Arabia', nameAr: 'السعودية', code: 'KSA', flag: '🇸🇦', group: 'A', confederation: 'AFC' },
  { id: 768, name: 'Mexico', nameAr: 'المكسيك', code: 'MEX', flag: '🇲🇽', group: 'A', confederation: 'CONCACAF' },
  { id: 816, name: 'South Africa', nameAr: 'جنوب أفريقيا', code: 'RSA', flag: '🇿🇦', group: 'A', confederation: 'CAF' },
  
  { id: 783, name: 'Argentina', nameAr: 'الأرجنتين', code: 'ARG', flag: '🇦🇷', group: 'B', confederation: 'CONMEBOL' },
  { id: 792, name: 'Morocco', nameAr: 'المغرب', code: 'MAR', flag: '🇲🇦', group: 'B', confederation: 'CAF' },
  { id: 793, name: 'Australia', nameAr: 'أستراليا', code: 'AUS', flag: '🇦🇺', group: 'B', confederation: 'AFC' },
  { id: 820, name: 'New Zealand', nameAr: 'نيوزيلندا', code: 'NZL', flag: '🇳🇿', group: 'B', confederation: 'OFC' },
  
  { id: 772, name: 'Brazil', nameAr: 'البرازيل', code: 'BRA', flag: '🇧🇷', group: 'C', confederation: 'CONMEBOL' },
  { id: 790, name: 'Tunisia', nameAr: 'تونس', code: 'TUN', flag: '🇹🇳', group: 'C', confederation: 'CAF' },
  { id: 762, name: 'Germany', nameAr: 'ألمانيا', code: 'GER', flag: '🇩🇪', group: 'C', confederation: 'UEFA' },
  { id: 782, name: 'Japan', nameAr: 'اليابان', code: 'JPN', flag: '🇯🇵', group: 'C', confederation: 'AFC' },
  
  { id: 771, name: 'France', nameAr: 'فرنسا', code: 'FRA', flag: '🇫🇷', group: 'D', confederation: 'UEFA' },
  { id: 789, name: 'Algeria', nameAr: 'الجزائر', code: 'ALG', flag: '🇩🇿', group: 'D', confederation: 'CAF' },
  { id: 796, name: 'Iraq', nameAr: 'العراق', code: 'IRQ', flag: '🇮🇶', group: 'D', confederation: 'AFC' },
  { id: 767, name: 'USA', nameAr: 'أمريكا', code: 'USA', flag: '🇺🇸', group: 'D', confederation: 'CONCACAF' },
  
  { id: 770, name: 'England', nameAr: 'إنجلترا', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'E', confederation: 'UEFA' },
  { id: 791, name: 'Qatar', nameAr: 'قطر', code: 'QAT', flag: '🇶🇦', group: 'E', confederation: 'AFC' },
  { id: 781, name: 'Iran', nameAr: 'إيران', code: 'IRN', flag: '🇮🇷', group: 'E', confederation: 'AFC' },
  { id: 794, name: 'UAE', nameAr: 'الإمارات', code: 'UAE', flag: '🇦🇪', group: 'E', confederation: 'AFC' },
  
  { id: 769, name: 'Spain', nameAr: 'إسبانيا', code: 'ESP', flag: '🇪🇸', group: 'F', confederation: 'UEFA' },
  { id: 1882, name: 'Belgium', nameAr: 'بلجيكا', code: 'BEL', flag: '🇧🇪', group: 'F', confederation: 'UEFA' },
  { id: 1892, name: 'Croatia', nameAr: 'كرواتيا', code: 'CRO', flag: '🇭🇷', group: 'F', confederation: 'UEFA' },
  { id: 1885, name: 'Sweden', nameAr: 'السويد', code: 'SWE', flag: '🇸🇪', group: 'F', confederation: 'UEFA' },
  
  { id: 784, name: 'Italy', nameAr: 'إيطاليا', code: 'ITA', flag: '🇮🇹', group: 'G', confederation: 'UEFA' },
  { id: 786, name: 'Netherlands', nameAr: 'هولندا', code: 'NED', flag: '🇳🇱', group: 'G', confederation: 'UEFA' },
  { id: 1883, name: 'Switzerland', nameAr: 'سويسرا', code: 'SUI', flag: '🇨🇭', group: 'G', confederation: 'UEFA' },
  { id: 1884, name: 'Denmark', nameAr: 'الدنمارك', code: 'DEN', flag: '🇩🇰', group: 'G', confederation: 'UEFA' },
  
  { id: 785, name: 'Portugal', nameAr: 'البرتغال', code: 'POR', flag: '🇵🇹', group: 'H', confederation: 'UEFA' },
  { id: 780, name: 'South Korea', nameAr: 'كوريا', code: 'KOR', flag: '🇰🇷', group: 'H', confederation: 'AFC' },
  { id: 1888, name: 'Austria', nameAr: 'النمسا', code: 'AUT', flag: '🇦🇹', group: 'H', confederation: 'UEFA' },
  { id: 811, name: 'Ghana', nameAr: 'غانا', code: 'GHA', flag: '🇬🇭', group: 'H', confederation: 'CAF' },
  
  { id: 1887, name: 'Poland', nameAr: 'بولندا', code: 'POL', flag: '🇵🇱', group: 'I', confederation: 'UEFA' },
  { id: 814, name: 'Senegal', nameAr: 'السنغال', code: 'SEN', flag: '🇸🇳', group: 'I', confederation: 'CAF' },
  { id: 1890, name: 'Romania', nameAr: 'رومانيا', code: 'ROU', flag: '🇷🇴', group: 'I', confederation: 'UEFA' },
  { id: 813, name: 'Nigeria', nameAr: 'نيجيريا', code: 'NGA', flag: '🇳🇬', group: 'I', confederation: 'CAF' },
  
  { id: 1891, name: 'Serbia', nameAr: 'صربيا', code: 'SRB', flag: '🇷🇸', group: 'J', confederation: 'UEFA' },
  { id: 1889, name: 'Czechia', nameAr: 'التشيك', code: 'CZE', flag: '🇨🇿', group: 'J', confederation: 'UEFA' },
  { id: 1886, name: 'Norway', nameAr: 'النرويج', code: 'NOR', flag: '🇳🇴', group: 'J', confederation: 'UEFA' },
  { id: 812, name: 'Cameroon', nameAr: 'الكاميرون', code: 'CMR', flag: '🇨🇲', group: 'J', confederation: 'CAF' },
  
  { id: 797, name: 'Uzbekistan', nameAr: 'أوزبكستان', code: 'UZB', flag: '🇺🇿', group: 'K', confederation: 'AFC' },
  { id: 815, name: 'Ivory Coast', nameAr: 'ساحل العاج', code: 'CIV', flag: '🇨🇮', group: 'K', confederation: 'CAF' },
  { id: 798, name: 'Panama', nameAr: 'بنما', code: 'PAN', flag: '🇵🇦', group: 'K', confederation: 'CONCACAF' },
  { id: 805, name: 'Colombia', nameAr: 'كولومبيا', code: 'COL', flag: '🇨🇴', group: 'K', confederation: 'CONMEBOL' },
  
  { id: 806, name: 'Uruguay', nameAr: 'أوروغواي', code: 'URU', flag: '🇺🇾', group: 'L', confederation: 'CONMEBOL' },
  { id: 1890, name: 'Ecuador', nameAr: 'إكوادور', code: 'ECU', flag: '🇪🇨', group: 'L', confederation: 'CONMEBOL' },
  { id: 803, name: 'Paraguay', nameAr: 'باراغواي', code: 'PAR', flag: '🇵🇾', group: 'L', confederation: 'CONMEBOL' },
  { id: 804, name: 'Bolivia', nameAr: 'بوليفيا', code: 'BOL', flag: '🇧🇴', group: 'L', confederation: 'CONMEBOL' }
];

async function seedTeams() {
  try {
    const count = await Team.countDocuments();
    if (count === 0) {
      await Team.insertMany(teamsData);
      console.log('Teams seeded successfully');
    } else {
      console.log('Teams already exist');
    }
  } catch (error) {
    console.error('Error seeding teams:', error);
  }
}

module.exports = { seedTeams, teamsData };
