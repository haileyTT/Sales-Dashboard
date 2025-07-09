import Header from '@/components/Header'
import MetricCard from '@/components/MetricCard'
import DataTable from '@/components/DataTable'
import LineChart from '@/components/Linechart'
import PieChart  from '@/components/Piechart'
import { useFetch } from './hooks/useFetch'
import type { RecentOrderRow, TopProductRow } from '@/types/data'
import './App.css'

function App() {
  // fetch data from api
  const { data, loading, error } = useFetch("https://api.jsonbin.io/v3/b/685aec708a456b7966b4f480");
  const salesData = data?.record?.record?.salesData;

  // loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        Loading data...
      </div>
    );
  }
  // error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600 text-lg font-medium">
        Error: {error}
      </div>
    );
  }
  // no data state
  if (!salesData) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400 text-lg italic">
        No sales data found.
      </div>
    );
  }

  // data for recent orders table
  const recentOrdersRows: RecentOrderRow[] = salesData.recentOrders.map((o: any) => [
    o.id,
    o.customer,
    `$${o.amount.toLocaleString()}`, // format amount to currency
    o.status.charAt(0).toUpperCase() + o.status.slice(1), // capitalize first letter of status
    o.date
  ]);

  // data for top products table
  const topProductsRows: TopProductRow[] = salesData.topProducts?.map((p: any) => [
    p.name,
    `$${p.sales.toLocaleString()}`, // format sales to currency
    p.units 
  ]) || [];

  return (
    <div className="min-h-screen bg-background font-sans bg-gray-100">
      
      <main className="container mx-auto px-4 py-8">
        <Header />

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <MetricCard title="Total Orders" value={salesData.totalOrders ?? 0} /> 
          <MetricCard title="Total Revenue" value={`$${salesData.totalRevenue?.toLocaleString() ?? 0}`} /> 
          <MetricCard title="Average Order Value" value={`$${salesData.averageOrderValue?.toLocaleString() ?? 0}`} />
          <MetricCard title="Growth Rate" value={`${salesData.growthRate ?? 0}%`} />
          <MetricCard title="Conversion Rate" value={`${salesData.conversionRate ?? 0}%`} />
          <MetricCard title="Customer Satisfaction" value={`${salesData.customerSatisfaction ?? 0} / 5`} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <div className="chart-left bg-white p-4 rounded-lg shadow-md min-h-[360px]">
            <LineChart data={salesData.monthlySales ?? []} />
          </div>
          <div className="chart-right bg-white p-4 rounded-lg shadow-md min-h-[360px]">
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
            showDateFilter={true}
        />
          <DataTable
            title="Top Products"
            columns={["Product", "Sales", "Units"]}
            rows={topProductsRows}
          />
        </div>
      </main>
    </div>
  )
}

export default App
