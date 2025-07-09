import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { MetricCardProps } from '@/types/data'

function MetricCard({ title, value }: MetricCardProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2">
        <CardTitle className="text-xs font-bold text-gray-600">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 py-1">
        <div className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {value}
        </div>
        <div className="h-1 w-full bg-indigo-400 rounded-full mt-1"></div>
      </CardContent>
    </Card>
  )
}

export default MetricCard;