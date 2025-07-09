import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type DataTableProps = {
  title: string;
  columns: string[];
  rows: React.ReactNode[][];
  showStatusFilter?: boolean;
};

const DataTable: React.FC<DataTableProps> = ({ title, columns, rows, showStatusFilter = false }) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Get unique status values from the data
  const statusOptions = useMemo(() => {
    if (!showStatusFilter) return [];
    const statusColumnIndex = columns.findIndex(col => col.toLowerCase().includes('status'));
    if (statusColumnIndex === -1) return [];
    
    const statuses = new Set<string>();
    rows.forEach(row => {
      const status = row[statusColumnIndex];
      if (typeof status === 'string') {
        statuses.add(status);
      }
    });
    return Array.from(statuses);
  }, [columns, rows, showStatusFilter]);

  // Filter rows based on status
  const filteredRows = useMemo(() => {
    if (!showStatusFilter || statusFilter === 'all') return rows;
    
    const statusColumnIndex = columns.findIndex(col => col.toLowerCase().includes('status'));
    if (statusColumnIndex === -1) return rows;
    
    return rows.filter(row => {
      const status = row[statusColumnIndex];
      return typeof status === 'string' && status.toLowerCase() === statusFilter.toLowerCase();
    });
  }, [rows, statusFilter, columns, showStatusFilter]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          {showStatusFilter && statusOptions.length > 0 && (
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Filter by status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-input bg-background px-3 py-1 text-sm rounded-md"
              >
                <option value="all">All Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRows.map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, j) => (
                  <TableCell key={j}>
                    {typeof cell === 'string' && cell.toLowerCase().includes('status') ? (
                      <Badge variant={cell.toLowerCase() === 'completed' ? 'default' : 'secondary'}>
                        {cell}
                      </Badge>
                    ) : (
                      cell
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable; 