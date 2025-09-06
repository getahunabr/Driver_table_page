export type FilterType = "dropdown" | "text" | "dateRange";

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;
  options?: string[]; 
}

export const filterConfigs: FilterConfig[] = [
  {
    key: "status",
    label: " Driver Status",
    type: "dropdown",
    options: ["Active", "Inactive"],
  },
  {
    key: "location",
    label: " Driver Location",
    type: "text",
  },
  {
    key: "lastActive",
    label: "Last Active Date",
    type: "dateRange",
  },
];
