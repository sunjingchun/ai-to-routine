export default function Home() {
  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">

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
            注意：本工具仅供参考，不构成医疗建议。敏感肌请谨慎使用新产品。
          </p>
        </div>

        {/* 护肤信息表单（静态版） */}
        <div className="mt-10 p-4 border rounded bg-gray-50 space-y-4">

          {/* 年龄 */}
          <div>
            <label className="block text-sm font-medium mb-1">年龄</label>
            <input
              type="number"
              placeholder="例如：28"
              className="w-full border rounded p-2"
            />
          </div>

          {/* 性别 */}
          <div>
            <label className="block text-sm font-medium mb-1">性别</label>
            <select className="w-full border rounded p-2">
              <option>男</option>
              <option>女</option>
            </select>
          </div>

          {/* 肤质 */}
          <div>
            <label className="block text-sm font-medium mb-1">肤质</label>
            <select className="w-full border rounded p-2">
              <option>干性</option>
              <option>油性</option>
              <option>混合</option>
              <option>敏感肌</option>
            </select>
          </div>

          {/* 主要诉求 */}
          <div>
            <label className="block text-sm font-medium mb-1">主要诉求（可多选）</label>
            <textarea
              placeholder="例如：美白、淡痘印、抗老"
              className="w-full border rounded p-2"
              rows={3}
            />
          </div>

          {/* 预算 */}
          <div>
            <label className="block text-sm font-medium mb-1">预算（可选）</label>
            <input
              type="text"
              placeholder="例如：300元以内"
              className="w-full border rounded p-2"
            />
          </div>

          {/* 生成按钮（下一步才加逻辑） */}
          <button
            className="w-full bg-black text-white p-3 rounded mt-4"
            disabled
          >
            生成护肤方案（下一步实现）
          </button>

        </div>

      </div>
    </main>
  );
}
