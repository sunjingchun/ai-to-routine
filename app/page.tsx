"use client";

import { useState } from "react";

type RoutineStep = {
  step: number;
  product: string;
  description: string;
};

type RoutineResult = {
  summary: string;
  morning: RoutineStep[];
  evening: RoutineStep[];
  warnings?: string;
  disclaimer?: string;
} | null;

export default function Home() {
  // 表单状态
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("男");
  const [skinType, setSkinType] = useState("干性");
  const [concerns, setConcerns] = useState("");
  const [budget, setBudget] = useState("");

  // AI 返回的护肤方案
  const [routine, setRoutine] = useState<RoutineResult>(null);

  // UI 状态
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setCopied(false);

    try {
      const res = await fetch("/api/routine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age,
          gender,
          skinType,
          concerns,
          budget,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const msg =
          (errorData && (errorData.error || errorData.detail)) ||
          "服务器返回错误";
        throw new Error(msg);
      }

      const data = await res.json();
      setRoutine(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "生成失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!routine) return;
    const text = JSON.stringify(routine, null, 2);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        setError("复制失败，请手动选择文本复制");
      });
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* 标题 & 说明 */}
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            AI The Ordinary 护肤搭配助手（Lite）
          </h1>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            输入你的肤质、诉求和预算，AI 将基于{" "}
            <span className="font-semibold">The Ordinary</span> 产品，
            为你生成一套「早晚护肤方案（早C晚A思路）」。
          </p>
          <div className="bg-yellow-50 border border-yellow-200 px-4 py-3 rounded-lg text-xs md:text-sm text-yellow-800">
            本工具仅供护肤搭配参考，不构成医疗建议。若有敏感肌、酒糟鼻、
            严重皮肤病史或正在使用处方药物，请优先咨询皮肤科医生，并对新产品做局部皮试。
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* 左侧：信息表单 */}
          <section className="p-4 md:p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-4">
            {/* 年龄 */}
            <div>
              <label className="block text-sm font-medium mb-1">年龄</label>
              <input
                type="number"
                placeholder="例如：28"
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/70 focus:border-black"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* 性别 */}
            <div>
              <label className="block text-sm font-medium mb-1">性别</label>
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/70 focus:border-black bg-white"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="男">男</option>
                <option value="女">女</option>
                <option value="其他">其他 / 不方便透露</option>
              </select>
            </div>

            {/* 肤质 */}
            <div>
              <label className="block text-sm font-medium mb-1">肤质</label>
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/70 focus:border-black bg-white"
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
              >
                <option>干性</option>
                <option>油性</option>
                <option>混合</option>
                <option>敏感肌</option>
              </select>
            </div>

            {/* 主要诉求 */}
            <div>
              <label className="block text-sm font-medium mb-1">
                主要诉求
                <span className="text-gray-500 text-xs ml-1">
                  （用顿号/逗号分隔，例如：美白、淡痘印、抗老）
                </span>
              </label>
              <textarea
                placeholder="例如：美白、淡痘印、抗老、维稳、控油"
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/70 focus:border-black min-h-[72px]"
                value={concerns}
                onChange={(e) => setConcerns(e.target.value)}
              />
            </div>

            {/* 预算 */}
            <div>
              <label className="block text-sm font-medium mb-1">
                预算（可选）
              </label>
              <input
                type="text"
                placeholder="例如：单次购入 300 元以内"
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/70 focus:border-black"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            {/* 生成按钮 & 错误 */}
            <div className="pt-2 space-y-2">
              <button
                className="w-full inline-flex items-center justify-center gap-2 bg-black text-white text-sm font-medium px-4 py-2.5 rounded-full disabled:opacity-60 disabled:cursor-not-allowed hover:bg-black/90 transition"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    生成中…
                  </span>
                ) : (
                  "生成护肤方案（由 AI 自动生成）"
                )}
              </button>

              {error && (
                <p className="text-xs text-red-600">
                  错误：{error}
                </p>
              )}
            </div>
          </section>

          {/* 右侧：结果展示 */}
          <section className="border border-gray-200 rounded-2xl p-4 md:p-5 bg-white min-h-[240px]">
            <h2 className="text-lg font-semibold mb-3">护肤方案预览</h2>

            {!routine && (
              <p className="text-sm text-gray-500 leading-relaxed">
                填写左侧信息并点击「生成护肤方案」，这里会显示基于 The
                Ordinary 的早晚护肤搭配建议。
              </p>
            )}

            {routine && (
              <div className="space-y-4">
                {/* 总结 */}
                {routine.summary && (
                  <p className="text-sm text-gray-800 leading-relaxed bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                    {routine.summary}
                  </p>
                )}

                {/* 早晚护理卡片 */}
                <RoutineCard
                  title="🌞 早晨护理（Morning Routine）"
                  steps={routine.morning}
                />
                <RoutineCard
                  title="🌙 晚间护理（Evening Routine）"
                  steps={routine.evening}
                />

                {/* 注意事项 & 免责声明 */}
                {routine.warnings && (
                  <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-xs font-semibold text-yellow-800">
                      ⚠ 注意事项
                    </p>
                    <p className="text-xs text-yellow-900 mt-1 leading-relaxed">
                      {routine.warnings}
                    </p>
                  </div>
                )}

                {routine.disclaimer && (
                  <p className="mt-2 p-3 bg-gray-50 text-[11px] text-gray-600 border rounded leading-relaxed">
                    {routine.disclaimer}
                  </p>
                )}

                {/* 复制按钮 */}
                <div className="pt-1 flex items-center gap-3">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full hover:bg-gray-800 transition"
                  >
                    <span>复制方案（JSON）</span>
                  </button>
                  {copied && (
                    <span className="text-xs text-green-600">
                      已复制到剪贴板
                    </span>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

/**
 * 护肤步骤卡片组件
 */
function RoutineCard({ title, steps }: { title: string; steps: RoutineStep[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-white shadow-sm rounded-xl p-4 border border-gray-100">
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <div className="space-y-3">
        {steps.map((item) => (
          <div
            key={item.step}
            className="p-3 rounded-lg bg-gray-50 border border-gray-100"
          >
            <p className="font-medium text-sm text-gray-900">
              步骤 {item.step}：{item.product}
            </p>
            <p className="text-xs text-gray-700 mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
