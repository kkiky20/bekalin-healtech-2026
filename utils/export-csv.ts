export const exportToCSV = (rows: any[], columns: { header: string; accessorKey: string }[], filename: string) => {
  if (!rows || !rows.length) return;

  const headerRow = columns.map(col => `"${col.header.replace(/"/g, '""')}"`).join(',');

  const dataRows = rows.map(row => {
    return columns.map(col => {
      let cellValue = row[col.accessorKey];
      if (cellValue === null || cellValue === undefined) cellValue = '';
      
      // Escape quotes
      const stringValue = String(cellValue).replace(/"/g, '""');
      // Wrap in quotes
      return `"${stringValue}"`;
    }).join(',');
  });

  const csvContent = [headerRow, ...dataRows].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
