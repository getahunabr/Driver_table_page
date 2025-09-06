import {
  exportToCsv,
  exportToExcel,
  exportToPdf,
  exportToQuickBooksJson,
  exportToFmcsaPdf,
} from "../utils/exportUtils";

export const exportConfig = [
  { key: "csv", handler: exportToCsv, labelKey: "export.csv" },
  { key: "excel", handler: exportToExcel, labelKey: "export.excel" },
  { key: "pdf", handler: exportToPdf, labelKey: "export.pdf" },
  {
    key: "quickbooks",
    handler: exportToQuickBooksJson,
    labelKey: "export.quickbooks",
  },
  { key: "fmcsa", handler: exportToFmcsaPdf, labelKey: "export.fmcsa" },
];
