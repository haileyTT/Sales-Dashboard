import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { DataTableContentProps } from '@/types/data';

const DataTableContent: React.FC<DataTableContentProps> = ({ title, columns, rows }) => {
  // CSV export function
  const exportToCSV = () => {
    // Convert the filtered data to CSV format
    const csvContent = [
      // Header row
      columns.join(','),
      // Data rows
      ...rows.map(row => 
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
    <>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j}>
            {typeof cell === 'string' && ['completed', 'processing', 'shipped'].includes(cell.toLowerCase()) ? (
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

      {/* Export CSV Button */}
      <div className="flex justify-between items-center mt-4">
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
    </>
  );
};

export default DataTableContent; 