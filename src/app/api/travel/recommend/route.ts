import { NextResponse } from "next/server";
import type { TravelPreferences } from "@/lib/types/travel";

const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

function buildPrompt(prefs: TravelPreferences) {
  const stylesText = prefs.styles.length > 0 ? prefs.styles.join("、") : "不限";
  const childrenCount = Number(prefs.children) || 0;
  const childrenText =
    childrenCount > 0
      ? `${childrenCount} 位（年紀：${prefs.childrenAges.join("、")}）`
      : "無";

  const isDomestic = prefs.region === "國內";
  const areaLabel = isDomestic ? "台灣地區" : "目的地國家";
  const destinationInstruction = isDomestic
    ? `使用者要在「台灣」旅遊，指定地區為「${prefs.area}」。三個行程方案都必須是台灣「${prefs.area}」地區內的真實景點，絕對不可以是海外行程。`
    : `使用者要出國旅遊，目的地國家是「${prefs.area}」。三個行程方案都必須是「${prefs.area}」當地的真實景點與城市，絕對不可以是台灣本地的行程。`;

  const system =
    "你是一位專業的旅遊行程規劃顧問，熟悉全球各地的旅遊景點、交通與住宿安排。" +
    "請根據使用者提供的條件，設計恰好三個彼此風格不同、但都符合條件的旅遊行程方案。" +
    "目的地國家或地區是使用者最重要的指定條件，絕對不能忽略或替換成其他地點。" +
    "若同行包含小孩，請特別考量親子友善的景點與行程節奏。" +
    "只能回覆 JSON，不要加任何說明文字，也不要使用 markdown code block。";

  const user = `【最重要】${destinationInstruction}

旅客條件如下：
- 國內或國外：${prefs.region}
- ${areaLabel}：${prefs.area}
- 預計出發日期：${prefs.departureDate}
- 天數：${prefs.days}
- 預算：${prefs.budget}
- 大人人數：${prefs.adults} 位
- 小孩人數：${childrenText}
- 旅遊屬性：${stylesText}
- 包車或自由行：${prefs.tripMode}
- 交通選擇：${prefs.transportation}
- 住宿選擇：${prefs.accommodation}

標題、highlights、每日行程都必須明確指名「${prefs.area}」當地真實存在的城市、地區或景點名稱（例如具體的城市名、山川、地標），絕對不可以使用「當地」「市中心」「古老的城鎮」等籠統字眼帶過。

請以下列 JSON 格式回覆，且務必包含至少 3 個 recommendations，且每個行程都必須發生在「${prefs.area}」：
{
  "recommendations": [
    {
      "title": "行程名稱",
      "summary": "一段簡短介紹，說明此行程的特色與適合對象",
      "estimatedBudget": "預估總花費，例如 NT$25,000 起",
      "highlights": ["亮點1", "亮點2", "亮點3"],
      "transportation": "建議交通方式說明",
      "accommodation": "建議住宿說明",
      "dailyItinerary": [
        { "day": 1, "title": "第一天主題", "activities": ["活動1", "活動2", "活動3"] }
      ]
    }
  ]
}
每個行程的 dailyItinerary 天數需對應使用者指定的天數。`;

  return { system, user };
}

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-openai-key")?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "尚未設定 OpenAI API Key，請前往「設定」頁面輸入你的 API Key。" },
      { status: 401 }
    );
  }

  let prefs: TravelPreferences;
  try {
    prefs = await request.json();
  } catch {
    return NextResponse.json({ error: "請求格式錯誤" }, { status: 400 });
  }

  const requiredFields: (keyof TravelPreferences)[] = [
    "region",
    "area",
    "departureDate",
    "days",
    "budget",
    "adults",
    "tripMode",
    "transportation",
    "accommodation",
  ];
  const missing = requiredFields.filter((field) => !prefs[field]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `缺少必要欄位：${missing.join(", ")}` },
      { status: 400 }
    );
  }
  if (!Array.isArray(prefs.styles)) {
    prefs.styles = [];
  }
  if (!prefs.children) {
    prefs.children = "0";
  }
  if (!Array.isArray(prefs.childrenAges)) {
    prefs.childrenAges = [];
  }

  const { system, user } = buildPrompt(prefs);

  let openaiRes: Response;
  try {
    openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
        temperature: 0.6,
      }),
    });
  } catch {
    return NextResponse.json({ error: "無法連線至 OpenAI API" }, { status: 502 });
  }

  if (!openaiRes.ok) {
    const detail = await openaiRes.text();
    return NextResponse.json(
      { error: "OpenAI API 呼叫失敗", detail },
      { status: 502 }
    );
  }

  const data = await openaiRes.json();
  const content: string | undefined = data.choices?.[0]?.message?.content;
  if (!content) {
    return NextResponse.json({ error: "OpenAI 回應為空" }, { status: 502 });
  }

  let parsed: { recommendations?: unknown };
  try {
    parsed = JSON.parse(content);
  } catch {
    return NextResponse.json(
      { error: "OpenAI 回應非有效 JSON", raw: content },
      { status: 502 }
    );
  }

  const recommendations = parsed.recommendations;
  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    return NextResponse.json(
      { error: "沒有取得有效的行程推薦", raw: content },
      { status: 502 }
    );
  }

  return NextResponse.json({ recommendations });
}
