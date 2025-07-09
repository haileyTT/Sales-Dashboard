import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/Header'
import { MetricCard } from '@/components/MetricCard'
import DataTable from './components/DataTable'
import LineChart from '@/components/Linechart'
import PieChart  from '@/components/Piechart'
import { useFetch } from './hooks/useFetch'
import './App.css'

function App() {
  const { data, loading, error } = useFetch("https://api.jsonbin.io/v3/b/685aec708a456b7966b4f480");
  const salesData = data?.record?.record?.salesData;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!salesData) return <div>No sales data found.</div>;

  // data for tables 
  const recentOrdersRows = salesData.recentOrders.map((o: any) => [
    o.id,
    o.customer,
    `$${o.amount.toLocaleString()}`,
    o.status.charAt(0).toUpperCase() + o.status.slice(1),
    o.date
  ]);

  const topProductsRows = salesData.topProducts?.map((p: any) => [
    p.name,
    `$${p.sales.toLocaleString()}`,
    p.units
  ]) || [];

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        <Header />

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard title="Total Orders" value={salesData.totalOrders ?? 0} />
          <MetricCard title="Total Revenue" value={`$${salesData.totalRevenue?.toLocaleString() ?? 0}`} />
          <MetricCard title="Average Order Value" value={`$${salesData.averageOrderValue?.toLocaleString() ?? 0}`} />
          <MetricCard title="Growth Rate" value={`${salesData.growthRate?.toFixed(1) ?? 0}%`} />
          <MetricCard title="Conversion Rate" value={`${salesData.conversionRate?.toFixed(1) ?? 0}%`} />
          <MetricCard title="Customer Satisfaction" value={`${salesData.customerSatisfaction?.toFixed(1) ?? 0} / 5`} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <div className="chart-left">
            <LineChart data={salesData.monthlySales ?? []} />
          </div>
          <div className="chart-right">
            <PieChart data={salesData.salesByCategory ?? []} />
          </div>
        </div>

        {/* Data Tables */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <DataTable
            title="Recent Orders"
            columns={["Order ID", "Customer", "Amount", "Status", "Date"]}
            rows={recentOrdersRows}
            showStatusFilter={true}
        />
          <DataTable
            title="Top Products"
            columns={["Product", "Sales", "Units"]}
            rows={topProductsRows}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button>Primary Action</Button>
        </div>
      </main>
    </div>
  )
}

export default App
