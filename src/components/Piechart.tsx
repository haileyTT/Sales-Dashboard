import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { PieChartProps, CustomTooltipProps } from '@/types/data';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c"];

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const { revenue, percentage } = payload[0].payload;

    return (
      <div className="bg-white border rounded px-3 py-2 shadow text-sm text-gray-600">
      <p>Revenue: ${revenue.toLocaleString()}</p>
      <p>Percentage: {percentage.toFixed(1)}%</p>
    </div>
    );
  }
  return null;
};


function PieChartSalesByCategory({ data }: PieChartProps) {
  return (
    <div className="w-full h-[300px]">
      <p className="chart-title text-lg font-bold text-gray-600 text-center mb-2">
        Sales by Category
      </p>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="revenue"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ category }) => category}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartSalesByCategory; 