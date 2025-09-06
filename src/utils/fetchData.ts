import axios from "axios";
import { dataSourceConfig } from "../config/datasourceConfig";
import mockData from "../data/drivers.json";

export interface Driver {
  id: number;
  name: string;
  status: string;
  location: string;
  lastActive: string;
}

export const fetchDrivers = async (): Promise<Driver[]> => {
  if (dataSourceConfig === "mock") {
    return mockData;
  } else {
    try {
      const response = await axios.get<Driver[]>(
        "https://api.example.com/drivers"
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching data from API", error);
      return [];
    }
  }
};
