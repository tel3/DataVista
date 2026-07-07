import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { logger } from '@/utils/logger';

export function useECharts(options: Record<string, unknown> | null) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!containerRef.current || !options) return;

    let chart = chartRef.current;
    if (!chart) {
      chart = echarts.init(containerRef.current);
      chartRef.current = chart;
      logger.debug('ECharts initialized');
    }

    chart.setOption(options, true);

    const observer = new ResizeObserver(() => {
      chart?.resize();
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  useEffect(() => {
    return () => {
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, []);

  return containerRef;
}
