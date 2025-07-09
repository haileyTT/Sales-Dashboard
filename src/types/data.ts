// Data structure types for the dashboard
export interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

export interface TopProduct {
  name: string;
  sales: number;
  units: number;
}

export interface SalesData {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  growthRate: number;
  conversionRate: number;
  customerSatisfaction: number;
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
  monthlySales: MonthlySalesData[];
  salesByCategory: CategorySalesData[];
}

// Chart data types
export interface MonthlySalesData {
  month: string;
  revenue: number;
  orders: number;
}

export interface CategorySalesData {
  category: string;
  revenue: number;
  percentage: number;
}

// Table row types
export type RecentOrderRow = [string, string, string, string, string]; // [id, customer, amount, status, date]
export type TopProductRow = [string, string, number]; // [name, sales, units]

// Generic table row type
export type TableRow = RecentOrderRow | TopProductRow;

// Component Props Interfaces

export interface MetricCardProps {
  title: string;
  value: string;
}

export interface LineChartProps {
  data: MonthlySalesData[];
}

export interface PieChartProps {
  data: CategorySalesData[];
}

export interface DataTableProps {
  title: string;
  columns: string[];
  rows: TableRow[];
  showStatusFilter?: boolean;
  showDateFilter?: boolean;
}

export interface DataTableFiltersProps {
  columns: string[];
  rows: TableRow[];
  showStatusFilter?: boolean;
  showDateFilter?: boolean;
  onFiltersChange: (filteredRows: TableRow[]) => void;
}

export interface DataTableContentProps {
  title: string;
  columns: string[];
  rows: TableRow[];
}

// Tooltip types for charts
export interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
} 