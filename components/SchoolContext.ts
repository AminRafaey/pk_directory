import { createContext } from "react";
import { SchoolTableData } from "../models/SchoolModel";

export const SchoolContext = createContext<SchoolTableData>({});
