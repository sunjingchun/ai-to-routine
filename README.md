# AI The Ordinary 护肤搭配助手（Lite）

一个基于大语言模型（LLM）的护肤搭配小工具，  
根据用户的年龄、性别、肤质、主要诉求和预算，生成一套基于 The Ordinary 产品线的早晚护肤方案。

> ⚠ 声明：本项目仅用于个人练习与日常护肤信息参考，不构成医疗建议。敏感肌和有皮肤问题的用户请优先咨询皮肤科医生。

---

## ✨ 功能（Features）

- 表单输入用户信息：
  - 年龄（Age）
  - 性别（Gender）
  - 肤质（Skin Type）
  - 主要诉求（Skin Concerns）
  - 预算（Budget，可选）
- 自动生成：
  - 早晨护理（Morning Routine）
  - 晚间护理（Evening Routine）
  - 注意事项（Warnings）
  - 免责声明（Disclaimer）
- 支持：
  - 折叠查看早晚步骤（Accordion UI）
  - 一键复制完整方案到剪贴板
  - 最近 3 次方案历史记录（保存在浏览器 localStorage）

---

## 🧱 技术栈（Tech Stack）

- 前端 / 全栈框架：Next.js（App Router）
- 样式：Tailwind CSS
- 部署（Deployment）：Vercel
- 语言：TypeScript + React（函数式组件）

---

## 🚀 本地开发（Local Development）

```bash
git clone <this-repo-url>
cd ai-to-routine

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问
https://ai-to-routine.vercel.app/
