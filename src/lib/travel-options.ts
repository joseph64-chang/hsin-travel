export const REGION_OPTIONS = ["國內", "國外"] as const;

export const DOMESTIC_AREA_OPTIONS = ["北部", "中部", "南部", "東部", "離島"] as const;

export const INTERNATIONAL_AREA_GROUPS = [
  {
    continent: "亞洲",
    countries: ["日本", "韓國", "泰國", "新加坡", "馬來西亞", "越南", "中國"],
  },
  {
    continent: "歐洲",
    countries: ["法國", "英國", "義大利", "德國", "西班牙", "瑞士"],
  },
  {
    continent: "美洲",
    countries: ["美國", "加拿大", "墨西哥", "巴西"],
  },
  {
    continent: "大洋洲",
    countries: ["澳洲", "紐西蘭"],
  },
  {
    continent: "非洲",
    countries: ["埃及", "南非", "摩洛哥"],
  },
] as const;

export const DAYS_OPTIONS = [
  "1天",
  "2天",
  "3天",
  "4天",
  "5天",
  "6天",
  "7天",
  "8-10天",
  "10天以上",
] as const;

export const BUDGET_OPTIONS = [
  "5,000元以下",
  "5,000-10,000元",
  "10,000-20,000元",
  "20,000-50,000元",
  "50,000元以上",
] as const;

export const STYLE_OPTIONS = [
  "城市遊",
  "古蹟",
  "美食",
  "時尚",
  "海邊",
  "山林",
  "購物",
  "親子",
  "小眾秘境",
  "夜生活",
] as const;

export const ADULT_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

export const CHILDREN_OPTIONS = ["0", "1", "2", "3", "4", "5"] as const;

export const CHILD_AGE_OPTIONS = [
  "未滿 1 歲",
  ...Array.from({ length: 17 }, (_, i) => `${i + 1} 歲`),
] as const;

export const TRIP_MODE_OPTIONS = ["包車", "自由行"] as const;

export const TRANSPORT_OPTIONS = [
  "高鐵/台鐵",
  "飛機",
  "租車自駕",
  "遊覽車",
  "大眾運輸",
  "計程車/叫車",
] as const;

export const ACCOMMODATION_OPTIONS = [
  "五星級飯店",
  "精品飯店",
  "商務旅館",
  "民宿",
  "青年旅館",
  "露營",
] as const;
