import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { LineChartProps, CustomTooltipProps } from '@/types/data';

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const { revenue, orders } = payload[0].payload;
    return (
      <div className="bg-white border rounded px-3 py-2 shadow text-sm text-gray-600">
        <p>Revenue: ${revenue.toLocaleString()}</p>
        <p>Orders: {orders.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

function LineChartMonthlyRevenue({ data }: LineChartProps) {
  return (
    <div className="w-full h-[300px]">
      <p className="text-lg font-bold text-gray-600 text-center mb-2">Monthly Sales</p>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month"
            interval={0} 
            tick={{ fontSize: 12 }} />
          <YAxis
            tickFormatter={(v) => `$${v.toLocaleString()}`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 1, fill: "#6366f1" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartMonthlyRevenue;
