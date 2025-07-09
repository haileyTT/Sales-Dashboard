import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import type { DataTableFiltersProps } from '@/types/data';

function DataTableFilters({
  columns,
  rows,
  showStatusFilter,
  showDateFilter,
  onFiltersChange
}: DataTableFiltersProps) {
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

  // Notify parent component of filtered rows
  React.useEffect(() => {
    onFiltersChange(filteredRows);
  }, [filteredRows, onFiltersChange]);

  if (!showStatusFilter && !showDateFilter) {
    return null;
  }

  return (
    <div className="flex justify-end">
      <div className="flex flex-col items-end space-y-2">
        {/* Status Filter */}
        {showStatusFilter && statusOptions.length > 0 && (
          <div className="flex items-center space-x-1 text-xs">
            <label className="text-sm font-medium">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-input bg-background px-2 py-1 text-sm rounded-md"
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
  );
}

export default DataTableFilters; 