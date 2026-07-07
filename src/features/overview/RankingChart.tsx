import { useMemo } from "react";
import { useECharts } from "@/hooks/useECharts";
import { chartTextStyle } from "@/utils/chartTheme";
import type { RankingItem } from "@/types";
import styles from "./RankingChart.module.css";

export default function RankingChart({ data }: { data: RankingItem[] }) {
  const sorted = useMemo(() => [...data].sort((a, b) => b.value - a.value), [data]);

  const option = useMemo(() => ({
    tooltip: {
      trigger: "axis" as const,
      axisPointer: { type: "shadow" as const },
      formatter: (params: unknown) => {
        const p = (params as { name: string; value: number }[])[0];
        return `${p.name}<br/>销售额：<b>${p.value}万</b>`;
      },
    },
    grid: { top: 5, right: 30, bottom: 5, left: 75 },
    xAxis: {
      type: "value" as const,
      show: false,
    },
    yAxis: {
      type: "category" as const,
      data: sorted.map((d) => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { ...chartTextStyle, fontSize: 12, interval: 0 },
      inverse: true,
    },
    series: [{
      type: "bar",
      data: sorted.map((d) => ({
        value: d.value,
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: {
            type: "linear", x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: "rgba(0,240,255,0.6)" },
              { offset: 1, color: "#00f0ff" },
            ],
          },
        },
      })),
      barWidth: "55%",
      barCategoryGap: "20%",
      label: {
        show: true,
        position: "right",
        color: "#e0e6f0",
        fontSize: 11,
        fontFamily: "Cascadia Code, Fira Code, Consolas, monospace",
        formatter: (p: { value: number }) => `${(p.value).toFixed(1)}万`,
      },
    }],
  }), [sorted]);

  const ref = useECharts(option);
  return <div ref={ref} className={styles.chart} />;
}
