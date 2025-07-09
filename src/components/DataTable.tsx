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
  showDateFilter?: boolean;
};

const DataTable: React.FC<DataTableProps> = ({ 
  title, 
  columns, 
  rows, 
  showStatusFilter = false,
  showDateFilter = false 
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

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

  // Find date column index
  const dateColumnIndex = useMemo(() => {
    if (!showDateFilter) return -1;
    return columns.findIndex(col => col.toLowerCase().includes('date'));
  }, [columns, showDateFilter]);

  // Filter rows based on status and date range
  const filteredRows = useMemo(() => {
    let filtered = rows;

    // Apply status filter
    if (showStatusFilter && statusFilter !== 'all') {
      const statusColumnIndex = columns.findIndex(col => col.toLowerCase().includes('status'));
      if (statusColumnIndex !== -1) {
        filtered = filtered.filter(row => {
          const status = row[statusColumnIndex];
          return typeof status === 'string' && status.toLowerCase() === statusFilter.toLowerCase();
        });
      }
    }

    // Apply date range filter
    if (showDateFilter && dateColumnIndex !== -1 && (startDate || endDate)) {
      filtered = filtered.filter(row => {
        const dateValue = row[dateColumnIndex];
        if (!dateValue) return false;
        
        const rowDate = new Date(String(dateValue));
        if (isNaN(rowDate.getTime())) return false;

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && end) {
          return rowDate >= start && rowDate <= end;
        } else if (start) {
          return rowDate >= start;
        } else if (end) {
          return rowDate <= end;
        }
        
        return true;
      });
    }

    return filtered;
  }, [rows, statusFilter, startDate, endDate, columns, showStatusFilter, showDateFilter, dateColumnIndex]);

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter('all');
    setStartDate('');
    setEndDate('');
  };

  // CSV export function
  const exportToCSV = () => {
    // Convert the filtered data to CSV format
    const csvContent = [
      // Header row
      columns.join(','),
      // Data rows
      ...filteredRows.map(row => 
        row.map(cell => {
          // Handle different cell types and escape commas
          const cellValue = typeof cell === 'string' ? cell : String(cell);
          return cellValue.includes(',') ? `"${cellValue}"` : cellValue;
        }).join(',')
      )
    ].join('\n');

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
          <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col space-y-4">
            {/* Filters Row */}
            {(showStatusFilter || showDateFilter) && (
              <div className="flex justify-end">
                <div className="flex flex-col items-end space-y-2">
                  {/* Status Filter */}
                  {showStatusFilter && statusOptions.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium">Status:</label>
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

                  {/* Date Range Filter */}
                  {showDateFilter && dateColumnIndex !== -1 && (
                    <div className="flex items-center space-x-2 text-sm">
                      <label className="text-xs font-medium">Date Range:</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-[120px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-background px-2 py-1 rounded text-xs"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-[120px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-background px-2 py-1 rounded text-xs"
                      />
                    </div>
                  )}

                  {/* Clear Filters Button */}
                  {(showStatusFilter || showDateFilter) && (
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Title Row */}
            <CardTitle className="text-xl font-bold text-gray-600">{title}</CardTitle>
          </div>
        </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader className="bg-gray-100">
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
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Showing {filteredRows.length} of {rows.length} records
          </div>
          <Button 
            onClick={exportToCSV}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14,2 14,8 20,8"/>
              <path d="M8 13h8"/>
              <path d="M8 17h8"/>
              <path d="M8 9h6"/>
            </svg>
            Export CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable; 