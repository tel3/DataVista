import { create } from 'zustand';
import { mockDashboardData } from '@/data/dashboard';
import type { DashboardData } from '@/types';
import { logger } from '@/utils/logger';

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });
    logger.info('Fetching dashboard data...');

    try {
      await new Promise((r) => setTimeout(r, 300));
      set({ data: mockDashboardData, loading: false });
      logger.info('Dashboard data loaded successfully');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      logger.error('Failed to fetch data:', msg);
      set({ error: msg, loading: false });
    }
  },
}));
