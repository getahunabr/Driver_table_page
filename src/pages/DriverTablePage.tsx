import { useEffect, useMemo, useState } from "react";
import { fetchDrivers } from "../utils/fetchData";
import { MaterialReactTable } from "material-react-table";
import { type MRT_ColumnDef } from "material-react-table";
import { type Driver } from "../utils/fetchData";
import Filter from "../components/Filter";
import {
  exportToCsv,
  exportToExcel,
  exportToFmcsaPdf,
  exportToPdf,
  exportToQuickBooksJson,
} from "../utils/exportUtils";
import BackButton from "../components/BackButton";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
const DriverTablePage = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filterDrivers, setFilterDrivers] = useState<Driver[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    const getData = async () => {
      const data = await fetchDrivers();
      setDrivers(data);
      setFilterDrivers(data);
    };
    getData();
  }, []);

  // filter handler
  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = [...drivers];

    if (filters.status) {
      filtered = filtered.filter(
        (driver) => driver.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    if (filters.location) {
      filtered = filtered.filter((driver) =>
        driver.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.lastActive) {
      const filterDate = new Date(filters.lastActive);

      filtered = filtered.filter((driver) => {
        const driverDate = new Date(driver.lastActive.replace(" ", "T"));
        return driverDate >= filterDate;
      });
    }
    setFilterDrivers(filtered);
  };

  //   Define table columns
  const columns = useMemo<MRT_ColumnDef<Driver>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      { accessorKey: "name", header: t("table.headerName") },
      { accessorKey: "status", header: t("table.headerStatus") },
      { accessorKey: "location", header: t("table.headerLocation") },
      { accessorKey: "lastActive", header: t("table.headerLastActive") },
    ],
    [t]
  );
  return (
    <div
      style={{
        background: "linear-gradient(to right, #f3f4f6, #e5e7eb)", // full-page gradient
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>{t("pageTitle")}</h1>
        <LanguageSwitcher />

        {/* Export Button */}
        <div
          style={{
            margin: "10px 0",
            flexWrap: "wrap",
            display: "flex",
            gap: "10px",
          }}
        >
          <button onClick={() => exportToCsv(filterDrivers)}>
            {t("export.csv")}
          </button>
          <button onClick={() => exportToExcel(filterDrivers)}>
            {t("export.excel")}
          </button>
          <button onClick={() => exportToPdf(filterDrivers)}>
            {t("export.pdf")}
          </button>
          <button onClick={() => exportToQuickBooksJson(filterDrivers)}>
            {t("export.quickbooks")}
          </button>
          <button onClick={() => exportToFmcsaPdf(filterDrivers)}>
            {t("export.fmcsa")}
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          {/* Detached filter */}
          <Filter onFilterChange={handleFilterChange} t={t} />
          <MaterialReactTable
            columns={columns}
            data={filterDrivers}
            enableSorting
            initialState={{ density: "comfortable" }}
            enableColumnResizing
            muiTablePaperProps={{ sx: { width: "100%" } }}
          />
        </div>
        <BackButton label={t("back")} style={{ marginTop: "20px" }} />
      </div>
    </div>
  );
};

export default DriverTablePage;
