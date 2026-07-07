import { useMemo } from 'react';
import { useECharts } from '@/hooks/useECharts';
import { CHART_COLORS } from '@/utils/chartTheme';
import type { CategoryItem } from '@/types';
import styles from './CategoryChart.module.css';

export default function CategoryChart({ data }: { data: CategoryItem[] }) {
  const option = useMemo(() => ({
    tooltip: { trigger: 'item' as const },
    legend: {
      orient: 'vertical' as const,
      right: '5%',
      top: 'center',
      textStyle: { color: '#8899aa', fontSize: 11 },
    },
    series: [{
      type: 'pie',
      radius: ['45%', '78%'],
      center: ['35%', '50%'],
      roseType: 'area' as const,
      itemStyle: { borderRadius: 4 },
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 14, fontWeight: 'bold' },
      },
      data: data.map((d, i) => ({
        value: d.value,
        name: d.name,
        itemStyle: { color: CHART_COLORS[i % CHART_COLORS.length] },
      })),
    }],
  }), [data]);

  const ref = useECharts(option);
  return <div ref={ref} className={styles.chart} />;
}
