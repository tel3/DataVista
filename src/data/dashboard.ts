import type { DashboardData } from "@/types";

const generateTrend = () => {
  const now = new Date();
  const data: { date: string; sales: number; orders: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    data.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      sales: +(Math.random() * 4 + 3).toFixed(1),
      orders: Math.floor(Math.random() * 300 + 200),
    });
  }
  return data;
};

export const mockDashboardData: DashboardData = {
  stats: [
    { title: "总销售额", value: 126.5, unit: "万元", trend: +12.5, icon: "💰" },
    { title: "订单数", value: 8547, unit: "单", trend: +8.3, icon: "📦" },
    { title: "用户数", value: 36420, unit: "人", trend: +15.8, icon: "👥" },
    { title: "转化率", value: 3.26, unit: "%", trend: -2.1, icon: "📈" },
  ],

  trend: generateTrend(),

  categories: [
    { name: "电子", value: 38 },
    { name: "服装", value: 26 },
    { name: "家居", value: 18 },
    { name: "食品", value: 14 },
    { name: "美妆", value: 12 },
    { name: "运动", value: 9.5 },
    { name: "图书", value: 6.5 },
  ],

  rankings: [
    { rank: 1, name: "广东", value: 28.5 },
    { rank: 2, name: "浙江", value: 24.2 },
    { rank: 3, name: "江苏", value: 22.8 },
    { rank: 4, name: "上海", value: 20.1 },
    { rank: 5, name: "北京", value: 18.6 },
    { rank: 6, name: "山东", value: 16.3 },
    { rank: 7, name: "四川", value: 14.7 },
    { rank: 8, name: "湖北", value: 12.5 },
    { rank: 9, name: "福建", value: 10.2 },
    { rank: 10, name: "湖南", value: 8.9 },
  ],

  orders: [
    { id: "DD20260701001", product: "MacBook Pro 16", customer: "张先生", amount: 19999, status: "completed", time: "07-06 14:30" },
    { id: "DD20260701002", product: "AirPods Pro", customer: "李女士", amount: 1899, status: "pending", time: "07-06 15:12" },
    { id: "DD20260701003", product: "戴森吸尘器 V15", customer: "王先生", amount: 4990, status: "completed", time: "07-06 16:05" },
    { id: "DD20260701004", product: "iPad Air M2", customer: "赵女士", amount: 5599, status: "completed", time: "07-06 16:48" },
    { id: "DD20260701005", product: "Apple Watch Ultra", customer: "刘先生", amount: 6499, status: "pending", time: "07-06 17:20" },
    { id: "DD20260701006", product: "Sony WH-1000XM5", customer: "陈女士", amount: 2499, status: "cancelled", time: "07-06 18:01" },
    { id: "DD20260701007", product: "华为 MateBook X Pro", customer: "周先生", amount: 11999, status: "completed", time: "07-06 18:45" },
    { id: "DD20260701008", product: "Switch OLED", customer: "吴女士", amount: 2599, status: "pending", time: "07-06 19:30" },
    { id: "DD20260701009", product: "大疆 Mini 4 Pro", customer: "孙先生", amount: 5988, status: "completed", time: "07-06 20:15" },
    { id: "DD20260701010", product: "Kindle Scribe", customer: "黄女士", amount: 3199, status: "pending", time: "07-06 20:58" },
    { id: "DD20260701011", product: "LG 27 5K显示器", customer: "马先生", amount: 8999, status: "completed", time: "07-06 21:40" },
    { id: "DD20260701012", product: "罗技 MX Master 3S", customer: "朱女士", amount: 799, status: "completed", time: "07-06 22:15" },
  ],
};
