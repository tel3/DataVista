import { useMemo } from "react";
import { useECharts } from "@/hooks/useECharts";
import { chartTextStyle, chartSplitLine } from "@/utils/chartTheme";
import type { TrendItem } from "@/types";
import styles from "./TrendChart.module.css";

export default function TrendChart({ data }: { data: TrendItem[] }) {
  const option = useMemo(() => ({
    tooltip: { trigger: "axis" as const },
    legend: {
      data: ["销售额(万)", "订单量"],
      top: 0,
      right: 10,
      textStyle: { color: "#8899aa", fontSize: 11 },
    },
    grid: { top: 30, right: 20, bottom: 35, left: 45 },
    xAxis: {
      type: "category" as const,
      data: data.map((d) => d.date),
      axisLine: { lineStyle: { color: "rgba(0,240,255,0.15)" } },
      axisLabel: { ...chartTextStyle, interval: 4 },
    },
    yAxis: [
      {
        type: "value" as const,
        name: "万",
        nameTextStyle: { color: "#8899aa", fontSize: 11 },
        splitLine: chartSplitLine,
        axisLabel: chartTextStyle,
      },
      {
        type: "value" as const,
        name: "单",
        nameTextStyle: { color: "#8899aa", fontSize: 11 },
        splitLine: { show: false },
        axisLabel: chartTextStyle,
      },
    ],
    series: [
      {
        name: "销售额(万)",
        type: "bar",
        data: data.map((d) => d.sales),
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: "linear", x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "#00f0ff" },
              { offset: 1, color: "rgba(0,240,255,0.1)" },
            ],
          },
        },
      },
      {
        name: "订单量",
        type: "line",
        yAxisIndex: 1,
        data: data.map((d) => d.orders),
        smooth: true,
        symbol: "none",
        lineStyle: { color: "#00d4aa", width: 2 },
        itemStyle: { color: "#00d4aa" },
        areaStyle: {
          color: {
            type: "linear", x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(0,212,170,0.25)" },
              { offset: 1, color: "rgba(0,212,170,0)" },
            ],
          },
        },
      },
    ],
  }), [data]);

  const ref = useECharts(option);
  return <div ref={ref} className={styles.chart} />;
}
