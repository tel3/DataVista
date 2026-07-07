export interface StatCard {
  title: string;
  value: number;
  unit: string;
  trend: number;
  icon: string;
}

export interface TrendItem {
  date: string;
  sales: number;
  orders: number;
}

export interface CategoryItem {
  name: string;
  value: number;
}

export interface RankingItem {
  rank: number;
  name: string;
  value: number;
}

export interface OrderItem {
  id: string;
  product: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  time: string;
}

export interface DashboardData {
  stats: StatCard[];
  trend: TrendItem[];
  categories: CategoryItem[];
  rankings: RankingItem[];
  orders: OrderItem[];
}
