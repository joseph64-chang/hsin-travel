import type { StaticImageData } from "next/image";

import taipei101 from "../../images/taipei-101.jpg";
import sunMoonLake from "../../images/sun-moon-lake.jpg";
import jiufen from "../../images/jiufen.jpg";
import alishan from "../../images/alishan.jpg";
import kenting from "../../images/kenting.jpg";
import mountFuji from "../../images/mount-fuji.jpg";
import eiffelTower from "../../images/eiffel-tower.jpg";
import aurora from "../../images/aurora.jpg";
import grandCanyon from "../../images/grand-canyon.jpg";
import sydneyOpera from "../../images/sydney-opera-house.jpg";

export type DestinationCategory = "domestic" | "international";

export interface Destination {
  slug: string;
  name: string;
  place: string;
  category: DestinationCategory;
  image: StaticImageData;
  tagline: string;
  highlights: string[];
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "taipei-101",
    name: "台北 101",
    place: "台灣・台北",
    category: "domestic",
    image: taipei101,
    tagline: "登上曾經的世界第一高樓，360 度俯瞰台北盆地。",
    highlights: [
      "89 樓觀景台捕捉大台北盆地天際線",
      "登頂鑑賞全球最大主動式風阻尼球",
      "信義商圈精品購物、美食與跨年煙火盛事",
    ],
  },
  {
    slug: "sun-moon-lake",
    name: "日月潭",
    place: "台灣・南投",
    category: "domestic",
    image: sunMoonLake,
    tagline: "台灣最大高山湖泊，山水如鏡的療癒景致。",
    highlights: [
      "搭乘纜車或遊船欣賞高山湖泊如鏡水色",
      "環潭自行車道被譽為全球最美單車道之一",
      "邵族文化與向山遊客中心建築美學",
    ],
  },
  {
    slug: "jiufen",
    name: "九份老街",
    place: "台灣・新北",
    category: "domestic",
    image: jiufen,
    tagline: "山城紅燈籠與石階小巷交織的懷舊氛圍。",
    highlights: [
      "山城紅燈籠與石階小巷的懷舊氛圍",
      "電影場景靈感取景地之一，日式老屋風情濃厚",
      "品嚐芋圓、九份茶樓俯瞰基隆山海景",
    ],
  },
  {
    slug: "alishan",
    name: "阿里山",
    place: "台灣・嘉義",
    category: "domestic",
    image: alishan,
    tagline: "雲海、日出與千年神木的森林秘境。",
    highlights: [
      "搭乘百年阿里山森林小火車穿越雲霧森林",
      "祝山觀日平台欣賞雲海日出奇景",
      "神木群步道感受千年紅檜巨木",
    ],
  },
  {
    slug: "kenting",
    name: "墾丁",
    place: "台灣・屏東",
    category: "domestic",
    image: kenting,
    tagline: "台灣最南端的陽光沙灘與熱帶海島風情。",
    highlights: [
      "白沙灣、南灣等多處海灘可戲水衝浪",
      "墾丁大街夜市感受南台灣度假氛圍",
      "國家公園珊瑚礁地形與熱帶植物生態",
    ],
  },
  {
    slug: "mount-fuji",
    name: "富士山",
    place: "日本",
    category: "international",
    image: mountFuji,
    tagline: "日本第一高峰，四季皆有不同風貌。",
    highlights: [
      "日本第一高峰，四季皆有不同風貌",
      "河口湖倒影是拍攝富士山最佳角度",
      "周邊溫泉鄉泡湯放鬆兼賞山景",
    ],
  },
  {
    slug: "eiffel-tower",
    name: "艾菲爾鐵塔",
    place: "法國・巴黎",
    category: "international",
    image: eiffelTower,
    tagline: "巴黎地標，浪漫之都的天際線象徵。",
    highlights: [
      "巴黎地標，登頂俯瞰塞納河與市景",
      "夜晚整點燈光秀浪漫必看",
      "塔下戰神廣場野餐感受巴黎日常",
    ],
  },
  {
    slug: "aurora",
    name: "極光",
    place: "冰島",
    category: "international",
    image: aurora,
    tagline: "夜空中舞動的自然奇景，一生必看一次。",
    highlights: [
      "秋冬季節在極圈周邊高機率一睹極光舞動",
      "遠離光害的冰島高地是絕佳觀測地點",
      "可搭配冰川健行、溫泉等行程一次滿足",
    ],
  },
  {
    slug: "grand-canyon",
    name: "大峽谷",
    place: "美國",
    category: "international",
    image: grandCanyon,
    tagline: "億萬年地質切割出的壯闊奇觀。",
    highlights: [
      "科羅拉多河億萬年切割的地質奇觀",
      "天空步道體驗懸空俯瞰峽谷深處",
      "日出日落峽谷岩層色彩變化萬千",
    ],
  },
  {
    slug: "sydney-opera-house",
    name: "雪梨歌劇院",
    place: "澳洲",
    category: "international",
    image: sydneyOpera,
    tagline: "20 世紀最具代表性的建築地標之一。",
    highlights: [
      "20 世紀最具代表性的建築地標之一",
      "港灣大橋與歌劇院同框經典打卡點",
      "環形碼頭周邊酒吧欣賞港灣夜景",
    ],
  },
];

export const DOMESTIC_DESTINATIONS = DESTINATIONS.filter((d) => d.category === "domestic");
export const INTERNATIONAL_DESTINATIONS = DESTINATIONS.filter(
  (d) => d.category === "international"
);
