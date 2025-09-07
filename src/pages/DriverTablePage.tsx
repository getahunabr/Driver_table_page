// @ts-ignore

import { useEffect, useState } from "react";
import { fetchDrivers } from "../utils/fetchData";
import { MaterialReactTable } from "material-react-table";
import { type Driver } from "../utils/fetchData";
import Filter from "../components/Filter";
import BackButton from "../components/BackButton";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { columnsConfig } from "../config/columnsConfig";
import { exportConfig } from "../config/exportConfig";
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
      filterDate.setHours(0, 0, 0, 0);

      filtered = filtered.filter((driver) => {
        const driverDate = new Date(driver.lastActive.replace(" ", "T"));
        driverDate.setHours(0, 0, 0, 0);

        return driverDate.getTime() === filterDate.getTime();
      });
    }

    setFilterDrivers(filtered);
  };

  const columns = columnsConfig.map((col) => ({
    accessorKey: col.accessorKey,
    header: t(col.headerKey).toString(),
    id: col.accessorKey,
  }));

  return (
    <div
      style={{
        background: "linear-gradient(to right, #f3f4f6, #e5e7eb)",
        minHeight: "100dvh",
        width: "100%",
        color: "#1f2937",
      }}
    >
      <div
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ marginBottom: "20px", color: "#111827" }}>
          {t("pageTitle")}
        </h1>
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
          {exportConfig.map((exp) => (
            <button key={exp.key} onClick={() => exp.handler(filterDrivers)}>
              {t(exp.labelKey)}
            </button>
          ))}
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
        {/* @ts-ignore */}
        <BackButton label={t("back")} style={{ marginTop: "20px" }} />
      </div>
    </div>
  );
};

export default DriverTablePage;
