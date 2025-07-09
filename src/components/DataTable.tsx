import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DataTableFilters from './DataTableFilters'
import DataTableContent from './DataTableContent'
import type { DataTableProps, TableRow } from '@/types/data'

function DataTable({
  title,
  columns,
  rows,
  showStatusFilter = false,
  showDateFilter = false
}: DataTableProps) {
  const [filteredRows, setFilteredRows] = useState<TableRow[]>(rows);

  // Update filtered rows when original rows change
  React.useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  return (
    <Card className="mb-6 w-full">
      <CardHeader>
        <div className="flex flex-col space-y-4">
          {/* Title Row */}
          <CardTitle className="text-xl font-bold text-gray-600">{title}</CardTitle>

          {/* Filters Row */}
          <DataTableFilters
            columns={columns}
            rows={rows}
            showStatusFilter={showStatusFilter}
            showDateFilter={showDateFilter}
            onFiltersChange={setFilteredRows}
          />
        </div>
      </CardHeader>
      <CardContent>
        <DataTableContent
          title={title}
          columns={columns}
          rows={filteredRows}
        />
      </CardContent>
    </Card>
  );
};

export default DataTable; 