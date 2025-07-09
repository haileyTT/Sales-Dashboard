import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { DataTableContentProps } from '@/types/data';

function DataTableContent({ title, columns, rows }: DataTableContentProps) {
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
                  {columns[j].toLowerCase() === 'status' ? (
                    <Badge variant={typeof cell === 'string' && cell.toLowerCase() === 'completed' ? 'default' : 'secondary'}>
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
          Export CSV
        </Button>
      </div>
    </>
  );
};

export default DataTableContent; 