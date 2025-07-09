import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { MetricCardProps } from '@/types/data'

function MetricCard({ title, value }: MetricCardProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold font-large text-gray-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {value}
        </div>
        <div className="h-1 w-full bg-gray-400 rounded-full mt-2"></div>
      </CardContent>
    </Card>
  )
}

export default MetricCard;