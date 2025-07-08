import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/Header'
import { MetricCard } from '@/components/MetricCard'
import { DataTable } from './components/dataTable'
import { LineChart } from '@/components/Linechart'
import { PieChart } from '@/components/Piechart'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        <Header />


        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Metric 1" value="1,234" />
          <MetricCard title="Metric 2" value="5,678" />
          <MetricCard title="Metric 3" value="9,012" />
          <MetricCard title="Metric 4" value="3,456" />
          <MetricCard title="Metric 5" value="3,456" />
          <MetricCard title="Metric 6" value="3,456" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LineChart title="Line Chart" />
          <PieChart title="Pie Chart" />
        </div>

        {/* Data Table */}
        <div className="mb-8">
          <DataTable title="Data Table" />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button>Primary Action</Button>
          <Button variant="outline">Secondary Action</Button>
          <Button variant="outline">Tertiary Action</Button>
        </div>
      </main>
    </div>
  )
}

export default App
