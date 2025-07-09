import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

type DataTableProps = {
  title: string;
  columns: string[];
  rows: React.ReactNode[][];
};

const DataTable: React.FC<DataTableProps> = ({ title, columns, rows }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
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
          {rows.map((row, i) => (
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

export default DataTable; 