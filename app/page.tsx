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
  disclaimer: string;
} | null;

export default function Home() {
  // 表单状态（State）
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("男");
  const [skinType, setSkinType] = useState("干性");
  const [concerns, setConcerns] = useState("");
  const [budget, setBudget] = useState("");

  // 接口返回的护肤方案
  const [routine, setRoutine] = useState<RoutineResult>(null);

  // 请求过程中的状态
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 点击按钮时调用的函数
  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

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
        throw new Error("服务器返回错误");
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

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* 标题 */}
        <h1 className="text-3xl font-bold">
          AI The Ordinary 护肤搭配助手（Lite）
        </h1>

        {/* 简短说明 */}
        <p className="text-gray-700">
          输入你的肤质、诉求和预算，AI 将基于 The Ordinary 产品为你生成一套早晚护肤方案。
        </p>

        {/* 免责声明 */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
          <p className="text-sm text-yellow-700">
            注意：本工具仅供参考，不构成医疗建议。敏感肌请谨慎使用新产品，如有严重皮肤问题请优先咨询皮肤科医生。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* 护肤信息表单 */}
          <div className="p-4 border rounded bg-gray-50 space-y-4">

            {/* 年龄 */}
            <div>
              <label className="block text-sm font-medium mb-1">年龄</label>
              <input
                type="number"
                placeholder="例如：28"
                className="w-full border rounded p-2"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* 性别 */}
            <div>
              <label className="block text-sm font-medium mb-1">性别</label>
              <select
                className="w-full border rounded p-2"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>男</option>
                <option>女</option>
              </select>
            </div>

            {/* 肤质 */}
            <div>
              <label className="block text-sm font-medium mb-1">肤质</label>
              <select
                className="w-full border rounded p-2"
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
                主要诉求（用逗号分隔，例如：美白、淡痘印、抗老）
              </label>
              <textarea
                placeholder="例如：美白、淡痘印、抗老"
                className="w-full border rounded p-2"
                rows={3}
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
                placeholder="例如：300元以内"
                className="w-full border rounded p-2"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            {/* 生成按钮 */}
            <button
              className="w-full bg-black text-white p-3 rounded mt-4 disabled:opacity-60"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "生成中…" : "生成护肤方案（当前为示例数据）"}
            </button>

            {/* 错误提示 */}
            {error && (
              <p className="text-sm text-red-600 mt-2">
                错误：{error}
              </p>
            )}
          </div>

          {/* 结果展示区域 */}
          <div className="p-4 border rounded bg-white space-y-4 min-h-[200px]">
            <h2 className="text-xl font-semibold mb-2">护肤方案预览</h2>

            {!routine && (
              <p className="text-gray-500 text-sm">
                填写左侧信息并点击「生成护肤方案」，这里会显示早晚搭配结果。
              </p>
            )}

            {routine && (
              <div className="space-y-4">
                <p className="text-gray-700 text-sm">{routine.summary}</p>

                <div>
                  <h3 className="font-medium mb-1">【早上护理】</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {routine.morning.map((item) => (
                      <li key={item.step}>
                        <span className="font-semibold">
                          步骤 {item.step}：{item.product}
                        </span>{" "}
                        — {item.description}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-1">【晚上护理】</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {routine.evening.map((item) => (
                      <li key={item.step}>
                        <span className="font-semibold">
                          步骤 {item.step}：{item.product}
                        </span>{" "}
                        — {item.description}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  {routine.disclaimer}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
