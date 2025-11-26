"use client";

import { useState } from "react";
import Accordion from "./components/Accordion";
import RoutineCard from "./components/RoutineCard";

type RoutineStep = {
  step: number;
  product: string;
  description: string;
};

type RoutineData = {
  summary: string;
  morning: RoutineStep[];
  evening: RoutineStep[];
  warnings: string;
  disclaimer: string;
};

type RoutineResult = RoutineData | null;

export default function Home() {
  // 表单状态（Form State）
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("男");
  const [skinType, setSkinType] = useState("干性");
  const [concerns, setConcerns] = useState("");
  const [budget, setBudget] = useState("");

  // 结果 & 请求状态
  const [routine, setRoutine] = useState<RoutineResult>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Toast 提示
  const [toast, setToast] = useState<string | null>(null);

  // 构建用于复制的文本
  const buildRoutineText = (r: RoutineData) => {
    const lines: string[] = [];

    lines.push("【整体概览】");
    lines.push(r.summary);
    lines.push("");

    lines.push("【早晨护理】");
    r.morning.forEach((item) => {
      lines.push(`步骤 ${item.step}：${item.product}`);
      lines.push(`说明：${item.description}`);
      lines.push("");
    });

    lines.push("【晚间护理】");
    r.evening.forEach((item) => {
      lines.push(`步骤 ${item.step}：${item.product}`);
      lines.push(`说明：${item.description}`);
      lines.push("");
    });

    if (r.warnings) {
      lines.push("【注意事项】");
      lines.push(r.warnings);
      lines.push("");
    }

    lines.push("【免责声明】");
    lines.push(r.disclaimer);

    return lines.join("\n");
  };

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
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "服务器返回错误");
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
      <div className="max-w-5xl mx-auto space-y-6">
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
            注意：本工具仅供日常护肤参考，不构成医疗建议。敏感肌请谨慎使用新产品，如有严重皮肤问题请优先咨询皮肤科医生。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* 左侧：表单 */}
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
                <option>其他/不方便透露</option>
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
                placeholder="例如：300 元以内"
                className="w-full border rounded p-2"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            {/* 生成按钮（带 Loading 动画） */}
            <button
              className="w-full bg-black text-white p-3 rounded mt-4 disabled:opacity-60 flex items-center justify-center"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>生成中…</span>
                </span>
              ) : (
                "生成护肤方案"
              )}
            </button>

            {/* 错误提示 */}
            {error && (
              <p className="text-sm text-red-600 mt-2">错误：{error}</p>
            )}
          </div>

          {/* 右侧：方案展示 */}
          <div className="p-4 border rounded bg-white space-y-4 min-h-[260px]">
            <h2 className="text-xl font-semibold mb-2">护肤方案预览</h2>

            {!routine && (
              <p className="text-gray-500 text-sm">
                填写左侧信息并点击「生成护肤方案」，这里会显示早晚搭配结果。
              </p>
            )}

            {routine && (
              <div className="space-y-4">
                {/* 总结 */}
                <p className="text-gray-700 text-sm">{routine.summary}</p>

                {/* 早上 */}
                <Accordion title="🌞 早晨护理（Morning Routine）">
                  <RoutineCard steps={routine.morning} />
                </Accordion>

                {/* 晚上 */}
                <Accordion title="🌙 晚间护理（Evening Routine）">
                  <RoutineCard steps={routine.evening} />
                </Accordion>

                {/* 注意事项 */}
                {routine.warnings && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <strong>⚠ 注意事项：</strong>
                    <p className="mt-1">{routine.warnings}</p>
                  </div>
                )}

                {/* 免责声明（来自接口兜底） */}
                <p className="text-xs text-gray-500 bg-gray-50 border rounded p-3">
                  {routine.disclaimer}
                </p>

                {/* 复制方案按钮 */}
                <button
                  type="button"
                  onClick={async () => {
                    if (!routine) return;
                    try {
                      const text = buildRoutineText(routine);
                      await navigator.clipboard.writeText(text);
                      setToast("已复制完整护肤方案到剪贴板");
                      setTimeout(() => setToast(null), 2000);
                    } catch (e) {
                      console.error(e);
                      setToast("复制失败，请稍后再试");
                      setTimeout(() => setToast(null), 2000);
                    }
                  }}
                  className="mt-1 inline-flex items-center justify-center px-4 py-2 text-sm rounded-full bg-gray-900 text-white hover:bg-gray-800"
                >
                  复制方案到剪贴板
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast 提示 */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white text-sm px-4 py-2 rounded-full shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}
