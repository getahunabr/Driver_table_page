import React, { useState } from "react";
import { filterConfigs, type FilterConfig } from "../config/filterConfig";
import type { TFunction } from "i18next";

interface Props {
  onFilterChange: (filters: Record<string, any>) => void;
  t: TFunction;
}
const Filter: React.FC<Props> = ({ onFilterChange, t }) => {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleChange = (key: string, value: any) => {
    const updatedFilter = { ...filters, [key]: value };
    setFilters(updatedFilter);
    onFilterChange(updatedFilter);
  };
  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {filterConfigs.map((filter: FilterConfig) => {
        if (filter.type === "dropdown") {
          return (
            <select
              key={filter.key}
              onChange={(e) => handleChange(filter.key, e.target.value)}
            >
              <option value="">{t(`filters.${filter.key}`)}</option>
              {filter.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        }
        if (filter.type === "text") {
          return (
            <input
              key={filter.key}
              type="text"
              placeholder={t(`filters.${filter.key}`)}
              onChange={(e) => handleChange(filter.key, e.target.value)}
            />
          );
        }
        if (filter.type === "dateRange") {
          return (
            <input
              key={filter.key}
              type="date"
              placeholder={t("filters.dateRange")}
              onChange={(e) => handleChange(filter.key, e.target.value)}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default Filter;
