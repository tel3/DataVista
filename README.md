# DataVista

> 从 0 到 1，手把手教你制作数据可视化大屏

## 📖 项目简介

DataVista 是一个面向**学习者和开发者**的开源数据大屏项目，旨在帮助大家从零开始，系统地掌握数据可视化大屏的设计与开发。

无论你是前端新手还是经验丰富的开发者，都能通过本项目逐步构建出一个完整、美观、实用的数据可视化大屏。

## ✨ 特性

- 🎯 **从 0 到 1** — 从项目搭建到最终部署，全流程讲解
- 📊 **丰富图表** — 基于 ECharts 5，涵盖柱状图、折线图、饼图、表格等
- 🖥️ **大屏适配** — 基于 1920×1080 设计稿，transform:scale 等比缩放
- 🎨 **深色科技风** — 渐变发光边框、数字翻牌动画、实时时钟
- 📦 **Mock 内联** — 数据直接在 Store 中，无需后端即可运行
- 🧩 **模块化架构** — 组件/数据/Hooks/Store 清晰分层

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript 5.6 |
| 构建 | Vite 6 |
| 可视化 | ECharts 5（原生 init） |
| 状态管理 | Zustand 5 |
| 样式 | CSS Modules + CSS 变量 |
| 质量 | ESLint + Prettier |

## 🚀 快速开始

```bash
# 克隆项目
git clone git@github.com:tel3/DataVista.git

# 进入目录
cd DataVista

# 安装依赖（Node.js >= 18）
npm install

# 启动开发服务器
npm run dev
```

浏览器自动打开 `http://localhost:3000`，即可看到完整大屏。

## 📂 项目结构

```
DataVista/
├── src/
│   ├── components/          # 通用组件（边框、卡片、数字动画、状态）
│   ├── data/                # Mock 数据
│   ├── features/overview/   # 概览大屏（6 个业务图表组件）
│   ├── hooks/               # useECharts / useScreenScale
│   ├── stores/              # Zustand 状态管理
│   ├── styles/              # 全局样式 + CSS 变量
│   ├── types/               # TypeScript 类型定义
│   ├── utils/               # logger / chart 主题
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── LICENSE
└── README.md
```

## 📊 页面布局

```
┌─────────────┬───────────────────┬─────────────┐
│  4 统计卡片   │   30 天销售趋势     │  品类玫瑰图   │
├─────────────┴───────────────────┴─────────────┤
│  区域销售 TOP10 横向柱状  │   最新订单滚动表     │
└──────────────────────────┴───────────────────┘
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

⭐ 如果本项目对你有帮助，请给个 Star 支持一下！
