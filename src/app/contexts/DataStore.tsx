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


export function DataStoreProvider({ children }: PropsWithChildren<unknown>) {
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

   const fetchStreams = async () => {
      const cachedStreams = JSON.parse(localStorage.getItem("streams") || "null");
      if (cachedStreams && cachedStreams.expiredAt > Date.now()) {
         console.log("Using cached streams data: ", cachedStreams.data);
         setStreams(cachedStreams.data);
         return;
      }
      console.log("Fetching streams data from API");
      const response = await fetch("/api/streams");
      if (!response.ok) {
         console.error("Failed to fetch streams data:", response);
      }
      const data = await response.json();
      localStorage.setItem("streams", JSON.stringify({data: data.data, expiredAt: Date.now() + 7 * 24 * 60 * 60 * 1000}));
      setStreams(data.data as OptionType[]);
      console.log("Streams data fetched successfully from api:", data);
   }

   useEffect(() => {
      // fetchCSVData("streams.csv", (data: any[]) => setStreams(data as OptionType[]))
      fetchCSVData("districts.csv", (data: any[]) => setDistricts(data as OptionType[]))
      fetchCSVData("subjects.csv", (data: any[]) => setSubjects(data as OptionType[]))
      fetchCSVData("universities.csv", (data: any[]) => setUniversities(data as OptionType[]))
      fetchCSVData("merged.csv", (data: any[]) => setData(data as CourseDataType[]))
      fetchStreams();
   }, []);

   return (
      <DataStoreContext.Provider value={{streams, districts, universities, subjects, data}}>
         {children}
      </DataStoreContext.Provider>
   )
}