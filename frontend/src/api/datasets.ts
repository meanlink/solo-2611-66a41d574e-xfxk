import { api } from "./client";
import type { Dataset, ListResponse } from "../types";
export const listDatasets = () => api<ListResponse<Dataset>>("/datasets");
export const createDataset = (payload:{name:string;description:string;rows:Record<string,unknown>[]}) => api<Dataset>("/datasets",{method:"POST",body:JSON.stringify(payload)});
