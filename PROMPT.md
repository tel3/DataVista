# DataVista - 数据可视化大屏项目开发指令

## 项目概述

你是一个数据大屏专家。请按照本指令逐步实施，最终构建一个漂亮的数据可视化大屏页面。

- **项目名称**：DataVista
- **仓库地址**：https://github.com/tel3/DataVista.git
- **核心目标**：从 0 到 1 构建数据可视化大屏，纯前端 + Mock 数据，后期兼容 API 切换

---

## 技术栈

| 层面     | 技术                                        |
| -------- | ------------------------------------------- |
| 框架     | React 18 + TypeScript + Vite 5              |
| 可视化   | ECharts 5 + echarts-for-react               |
| 状态管理 | Zustand                                     |
| HTTP 层  | Axios + 适配器模式                          |
| Mock     | MSW（Mock Service Worker）                  |
| 测试     | Vitest + React Testing Library              |
| 日志     | tslog                                      |
| 代码质量 | ESLint + Prettier + Husky + lint-staged     |
| 样式     | CSS Modules + CSS 变量（深色科技风）        |

---

## 第一步：项目初始化

1.1 使用 Vite 创建 React + TypeScript 项目：

```bash
npm create vite@latest DataVista -- --template react-ts
cd DataVista
npm install
```

1.2 安装全部依赖：

```bash
npm install echarts echarts-for-react zustand axios tslog
npm install -D msw vitest @testing-library/react @testing-library/jest-dom jsdom eslint prettier husky lint-staged @commitlint/cli @commitlint/config-conventional eslint-config-prettier eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

1.3 初始化 Husky：

```bash
npx husky init
```

1.4 修改项目根目录 `index.html`，标题改为 `DataVista - 数据可视化大屏`。

1.5 配置 `vite.config.ts`，设置 `server.port = 3000`，配置 `@` 别名指向 `src/`。

1.6 配置 `tsconfig.json`，添加 `"paths": { "@/*": ["./src/*"] }`。

---

## 第二步：目录结构

清空 `src/` 下无用文件（保留 `main.tsx`、`App.tsx`），按以下结构创建目录：

```
src/
├── api/            # HTTP 层
├── mocks/          # MSW Mock
├── components/     # 通用组件（Header / Footer / BorderBox / ChartCard 等）
├── features/       # 业务模块
│   ├── overview/   # 概览大屏
│   ├── sales/      # 销售模块
│   └── monitor/    # 监控模块
├── hooks/          # 自定义 Hooks
├── stores/         # Zustand 状态
├── utils/          # 工具函数
│   ├── logger.ts   # 日志系统
│   └── request.ts  # Axios 封装 + Mock/API 适配器
├── styles/         # 全局样式与 CSS 变量
├── types/          # TypeScript 类型
└── routes/         # 路由配置
```

---

## 第三步：Mock → API 适配器（最关键）

3.1 创建 `src/utils/request.ts`：

- 使用适配器模式封装 Axios
- 通过环境变量 `VITE_API_MODE` 控制数据源：`mock` 走 MSW，`api` 走真实请求
- 导出一个统一的 `request` 函数，业务代码无需感知数据来源

3.2 创建 `src/mocks/handlers.ts` 和 `src/mocks/browser.ts`：

- 使用 MSW 拦截请求，返回 Mock 数据
- Mock 数据全部定义在 `src/mocks/data/` 目录下，按模块拆分

3.3 创建 `src/utils/logger.ts`：

- 使用 tslog 封装日志系统，支持 debug / info / warn / error 四级
- 生产环境自动屏蔽 debug 日志

---

## 第四步：全局样式（深色科技风大屏）

4.1 在 `src/styles/` 下创建：

- `variables.css`：CSS 变量（品牌色 `#00f0ff`、强调色 `#ff6b6b`、深色背景 `#0a0e17`、面板背景 `rgba(16,22,50,0.8)` 等）
- `global.css`：全局重置样式、字体引入、滚动条美化
- 字体使用系统默认 + 等宽字体，不需要引入外部字体

4.2 大屏采用固定 1920×1080 设计稿，通过 CSS `transform: scale` 实现自适应：

- 在 `src/hooks/useScreenScale.ts` 创建自适应 Hook
- 根容器按 16:9 等比缩放，居中显示

---

## 第五步：通用组件

5.1 `DecorativeBorder`：装饰边框组件，带发光边框 + 四角装饰

5.2 `ChartCard`：图表卡片组件，包含标题栏、边框、统一内边距，接受 `title` 和 `children`

5.3 `NumberFlop`：数字翻牌器组件，数字变动时带滚动动画效果

5.4 `LoadingView`：加载中组件，含旋转动画

5.5 `ErrorView`：错误状态组件，含重试按钮

---

## 第六步：Zustand Store

6.1 创建 `src/stores/useDashboardStore.ts`：

- 用 Zustand 管理全局数据
- 包含 `data`、`loading`、`error` 状态
- 包含 `fetchData` action，调用统一请求层

---

## 第七步：业务模块 - 概览大屏

7.1 主页面 `src/features/overview/index.tsx`，采用 Grid 布局：

```
┌────────────────────────────────────────────────┐
│                   Header（标题 + 时间）          │
├──────────┬──────────────────┬──────────────────┤
│ 统计卡片1 │    折线图 + 柱状图  │       饼图       │
│ 统计卡片2 │     （趋势分析）    │    （销售占比）    │
│ 统计卡片3 │      占中右 1/3    │     占右 1/4     │
│ 统计卡片4 │                  │                  │
├──────────┴──────────────────┴──────────────────┤
│         地图（全国销售分布，可选）                  │
├──────────────────┬──────────────────────────────┤
│   柱状图（排行）    │    滚动表格（最新订单）         │
└──────────────────┴──────────────────────────────┘
```

7.2 左上：4 个统计卡片（总销售额、订单量、用户数、增长率），使用 `NumberFlop` 组件

7.3 中上：折线图 + 柱状图混合图表（近 30 天趋势），使用 ECharts

7.4 右上：南丁格尔玫瑰图（品类销售占比），使用 ECharts

7.5 地图（可选，用中国地图或世界地图展示分布），使用 ECharts + 地图 JSON

7.6 左下：横向柱状图 Top 10（区域销售排行），使用 ECharts

7.7 右下：自动滚动表格（最新订单列表），纯 CSS 实现滚动动画

---

## 第八步：ECharts 主题

8.1 所有图表统一使用深色主题配置，关键参数：

- `backgroundColor: 'transparent'`
- `textStyle.color: '#e0e6f0'`
- `axisLine.lineStyle.color: 'rgba(255,255,255,0.1)'`
- `splitLine.lineStyle.color: 'rgba(255,255,255,0.05)'`
- 图表配色使用品牌色 `#00f0ff`、`#00d4aa`、`#ff6b6b`、`#f9ca24`、`#a78bfa`

8.2 图表需要：
- 关闭默认动画或使用平滑动画
- tooltip 深色半透明背景
- legend 置于顶部居中

---

## 第九步：测试系统

9.1 配置 Vitest + jsdom：

- 在 `vite.config.ts` 中添加 `test` 配置
- `package.json` 添加脚本：`"test": "vitest"`、`"test:ui": "vitest --ui"`、`"test:coverage": "vitest --coverage"`

9.2 至少编写以下测试用例：

- `src/utils/request.test.ts`：测试适配器 Mock/API 切换
- `src/utils/logger.test.ts`：测试日志级别过滤
- `src/components/ChartCard.test.tsx`：测试卡片组件渲染
- `src/hooks/useScreenScale.test.ts`：测试自适应 Hook
- `src/features/overview/index.test.tsx`：测试大屏页面加载与数据渲染

---

## 第十步：代码质量系统

10.1 ESLint 配置（`eslint.config.js`）：

- 继承 `@typescript-eslint`、`plugin:react-hooks`、`prettier`
- 规则：禁止 `console.log`（改用 tslog）、强制 import 排序

10.2 Prettier 配置（`.prettierrc`）：

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

10.3 Husky + lint-staged：

- `pre-commit` hook：运行 `lint-staged`（ESLint + Prettier）
- `commit-msg` hook：运行 `commitlint` 校验提交信息格式

10.4 `package.json` 添加脚本：

```json
{
  "lint": "eslint src/ --ext .ts,.tsx",
  "format": "prettier --write src/",
  "prepare": "husky"
}
```

---

## 第十一步：路由

11.1 安装 `react-router-dom`：

```bash
npm install react-router-dom
```

11.2 创建 `src/routes/index.tsx`，配置两个路由：

- `/` → 概览大屏
- `/sales` → 销售看板（预留）
- `/monitor` → 监控看板（预留）

---

## 第十二步：入口文件

12.1 修改 `src/main.tsx`：

- 引入全局 CSS 变量和样式
- 条件启动 MSW（仅 `VITE_API_MODE=mock` 时）
- 渲染 `<App />`

12.2 修改 `src/App.tsx`：

- 使用 `useScreenScale` Hook 包裹整个大屏
- 渲染路由组件

---

## 第十三步：启动与验证

13.1 创建 `.env` 文件：

```
VITE_API_MODE=mock
```

13.2 启动开发服务器：

```bash
npm run dev
```

13.3 验证：

- 浏览器自动打开 `http://localhost:3000`
- 看到完整的深色科技风数据大屏
- 所有图表正常渲染，数据为 Mock 数据
- 控制台无报错
- 运行 `npm test` 所有测试通过
- 运行 `npm run lint` 零错误

---

## 执行要求

- 每一步骤必须完成后才能进入下一步骤
- 每完成一个步骤，输出阶段小结
- 遇到错误立即修复，不跳过
- **最终目标**：浏览器打开 `http://localhost:3000`，看到一个完整、漂亮、有数据的数据可视化大屏页面
- 所有代码遵循模块化原则，不允许单文件超 300 行
