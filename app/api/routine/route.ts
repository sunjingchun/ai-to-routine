import { NextRequest, NextResponse } from 'next/server';

// 处理 POST 请求
export async function POST(req: NextRequest) {
  // 解析前端传来的 JSON 数据
  const body = await req.json();

  const { age, gender, skinType, concerns, budget } = body;

  // 这里暂时不做复杂逻辑，先返回一份“示例方案”
  // 未来我们会在这里接入大模型，根据这些参数生成真实搭配
  const mockRoutine = {
    summary: `演示方案：${age || '未知年龄'}岁的${gender || '用户'}，肤质：${
      skinType || '未填写'
    }，主要诉求：${concerns || '未填写'}，预算：${budget || '未填写'}`,
    morning: [
      {
        step: 1,
        product: 'Squalane Cleanser',
        description: '温和洁面，不破坏皮肤屏障',
      },
      {
        step: 2,
        product: 'Hyaluronic Acid 2% + B5',
        description: '补水保湿，为后续精华打底',
      },
      {
        step: 3,
        product: '天然保湿因子 + HA（Natural Moisturizing Factors + HA）',
        description: '锁水保湿，适合作为日常面霜',
      },
    ],
    evening: [
      {
        step: 1,
        product: 'Squalane Cleanser',
        description: '卸妆 + 洁面二合一',
      },
      {
        step: 2,
        product: 'Niacinamide 10% + Zinc 1%',
        description: '控油、淡痘印，适合多数肤质',
      },
      {
        step: 3,
        product: 'Granactive Retinoid 2% Emulsion（视黄醇精华）',
        description: '晚间抗老精华，逐步建立耐受，一周 2–3 次',
      },
      {
        step: 4,
        product: '天然保湿因子 + HA',
        description: '修护保湿，减少刺激',
      },
    ],
    disclaimer:
      '本方案为演示用示例，不构成医疗建议。敏感肌和严重皮肤问题请优先咨询皮肤科医生，并做好皮肤测试。',
  };

  return NextResponse.json(mockRoutine);
}
