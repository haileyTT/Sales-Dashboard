import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  data: { month: string; revenue: number; orders: number }[];
};

const LineChartMonthlyRevenue: React.FC<Props> = ({ data }) => (
  <div style={{ width: "100%", height: 300 }}>
    <p className="chart-title text-lg font-bold text-gray-600 text-center">Monthly Sales</p>
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /> {/* light grid */}
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis
          tickFormatter={(v) => `$${v.toLocaleString()}`}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number) => `$${value.toLocaleString()}`}
          labelFormatter={(label) => `Month: ${label}`}
          contentStyle={{ fontSize: "12px", padding: "6px 10px", borderRadius: "4px" }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#6366f1" // Tailwind indigo-500
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 1, fill: "#6366f1" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default LineChartMonthlyRevenue;
