import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LineChartProps {
  title?: string
}

export function LineChart({ title = "Line Chart" }: LineChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-muted-foreground">Line Chart Component</p>
        </div>
      </CardContent>
    </Card>
  )
}
