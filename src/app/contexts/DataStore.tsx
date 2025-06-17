/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { createContext, useEffect, useState } from "react";
import { CourseDataType, OptionType } from "../types/Types";
import { PropsWithChildren } from "react";
import Papa from 'papaparse';

export const DataStoreContext = createContext<{
   streams: OptionType[];
   districts: OptionType[];
   universities: OptionType[];
   subjects: OptionType[];
   data: CourseDataType[];
}>({
   streams: [],
   districts: [],
   universities: [],
   subjects: [],
   data: []
})


export function DataStoreProvider({ children }: PropsWithChildren<{}>) {
   const [streams, setStreams] = useState<OptionType[]>([]);
   const [districts, setDistricts] = useState<OptionType[]>([]);
   const [universities, setUniversities] = useState<OptionType[]>([]);
   const [subjects, setSubjects] = useState<OptionType[]>([]);
   const [data, setData] = useState<CourseDataType[]>([]);

   const fetchCSVData = async (csvPath: string, onComplete: (data: any[]) => void) => {
      try {
         const response = await fetch(csvPath);
         const text = await response.text();
         console.log("CSV data fetched successfully:", text.slice(0, 100));
         const result = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
         });
         onComplete(result.data as any[]);
      } catch (error) {
         console.error("Error fetch CSV data:", csvPath, error);
      }
   };

   useEffect(() => {
      fetchCSVData("streams.csv", (data: any[]) => setStreams(data as OptionType[]))
      fetchCSVData("districts.csv", (data: any[]) => setDistricts(data as OptionType[]))
      fetchCSVData("subjects.csv", (data: any[]) => setSubjects(data as OptionType[]))
      fetchCSVData("universities.csv", (data: any[]) => setUniversities(data as OptionType[]))
      fetchCSVData("ugc_final_uni_formatted.csv", (data: any[]) => setData(data as CourseDataType[]))
   }, []);

   return (
      <DataStoreContext.Provider value={{streams, districts, universities, subjects, data}}>
         {children}
      </DataStoreContext.Provider>
   )
}