import { utils, writeFile } from "xlsx";
import type { Driver } from "./fetchData";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import autoTable from "jspdf-autotable";
// Export csv
export const exportToCsv = (data: Driver[]) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Drivers");
  writeFile(workbook, "drivers.csv");
};

//Export Excel
export const exportToExcel = (data: Driver[]) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Drivers");
  writeFile(workbook, "drivers.xlsx");
};

//Export PDF(basic with styling)

export const exportToPdf = (data: Driver[]) => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [["ID", "Name", "Status", "Location", "Last Active"]],
    body: data.map((driver) => [
      driver.id,
      driver.name,
      driver.status,
      driver.location,
      driver.lastActive,
    ]),
    styles: { fontSize: 10, cellPadding: 2 },
    headStyles: { fillColor: [22, 160, 133] },
  });
  doc.save("drivers.pdf");
};

// QuickBooks  JSON export

export const exportToQuickBooksJson = (data: Driver[]) => {
  const qbData = data.map((driver) => ({
    Id: driver.id,
    Name: driver.name,
    Status: driver.status,
    Location: driver.location,
    LastActive: driver.lastActive,
  }));
  const blob = new Blob([JSON.stringify(qbData, null, 2)], {
    type: "application/json",
  });
  saveAs(blob, "drivers_quickbooks.json");
};

// FMCSA PDF EXPORT(CUSTOM FORMAT)

export const exportToFmcsaPdf = (data: Driver[]) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("FMCSA Driver Report", 14, 20);
  autoTable(doc, {
    head: [["ID", "Name", "Status", "Location", "Last Active"]],
    body: data.map((driver) => [
      driver.id,
      driver.name,
      driver.status,
      driver.location,
      driver.lastActive,
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [52, 73, 94] },
  });
  doc.save("drivers_fmcsa.pdf");
};
