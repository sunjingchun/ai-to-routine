import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const key = process.env.WILDCARD_API_KEY;

  if (!key) {
    console.error("❌ WILDCARD_API_KEY 未设置");
    return NextResponse.json(
      { error: "服务器未配置 API KEY" },
      { status: 500 }
    );
  }

  const body = await req.json();

  // 构建你的 prompt
  const prompt = `
你是一名专业的皮肤顾问，请根据以下用户信息，用 The Ordinary 产品生成科学、温和、安全的护肤方案。

用户信息：
年龄：${body.age}
性别：${body.gender}
肤质：${body.skinType}
主要诉求：${body.concerns}
预算：${body.budget}

请输出结构化 JSON：
{
  "summary": "...",
  "morning": [ { "step": 1, "product": "...", "description": "..." } ],
  "evening": [ { "step": 1, "product": "...", "description": "..." } ],
  "warnings": "...",
  "disclaimer": "..."
}
`;

  try {
    const result = await fetch(
      "https://api.gptsapi.net/v1/chat/completions",   // Wildcard 的 endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",     // Wildcard 支持的模型
          messages: [
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!result.ok) {
      const error = await result.text();
      console.error("❌ Wildcard API 错误：", error);
      return NextResponse.json(
        { error: "调用 AI 服务失败", detail: error },
        { status: 500 }
      );
    }

    const data = await result.json();
    const content = data.choices[0].message.content;
    return NextResponse.json(JSON.parse(content));
  } catch (err: any) {
    console.error("❌ 服务器异常：", err);
    return NextResponse.json(
      { error: "服务器内部错误" },
      { status: 500 }
    );
  }
}
