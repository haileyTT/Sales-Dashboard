import * as React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c"];

type Props = {
  data: { category: string; revenue: number; percentage: number }[];
};

const PieChartSalesByCategory: React.FC<Props> = ({ data }) => (
  <div style={{ width: "100%", height: 300 }}>
    <p className="chart-title">Sales by Category</p>
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
        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default PieChartSalesByCategory; 