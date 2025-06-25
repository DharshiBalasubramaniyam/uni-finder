/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { createContext, useEffect, useState } from "react";
import { OptionType, TableDataType } from "../types/Types";
import { PropsWithChildren } from "react";
import Papa from 'papaparse';
import Loading from "../components/common/Loading";

export const DataStoreContext = createContext<{
   streams: OptionType[];
   districts: OptionType[];
   universities: OptionType[];
   subjects: OptionType[];
   data: TableDataType[];
   fetchCourses: (
      zscore: string,
      stream: string,
      district: string,
      university: string | undefined,
      subjects: string,
      selectz: string,
      keyword: string | undefined
   ) => Promise<void>;
   setData: (data: TableDataType[]) => void;
}>({
   streams: [],
   districts: [],
   universities: [],
   subjects: [],
   data: [],
   fetchCourses: async () => {},
   setData: () => {},
})


export function DataStoreProvider({ children }: PropsWithChildren<unknown>) {
   const [streams, setStreams] = useState<OptionType[]>([]);
   const [districts, setDistricts] = useState<OptionType[]>([]);
   const [universities, setUniversities] = useState<OptionType[]>([]);
   const [subjects, setSubjects] = useState<OptionType[]>([]);
   const [data, setData] = useState<TableDataType[]>([]);

   const fetchData = async (name: string, expiry_days: number, onComplete: (data: any[]) => void) => {
      const cached = JSON.parse(localStorage.getItem(name) || "null");
      if (name != "degree_programs" && cached && cached.expiredAt > Date.now()) {
         onComplete(cached.data as any[]);
         return;
      }
      const response = await fetch(`/api/${name}`);
      if (!response.ok) {
         console.error(`Failed to fetch ${name} data:`, response);
      }
      const data = await response.json();
      if (name!="degree_programs") {
         localStorage.setItem(name, JSON.stringify({data: data.data, expiredAt: Date.now() + expiry_days * 24 * 60 * 60 * 1000}));
      }
      onComplete(data.data as any[]);
   }

   const fetchCourses = async (
      zscore: string,
      stream: string,
      district: string,
      university: string | undefined,
      subjects: string,
      selectz: string,
      keyword: string | undefined
   ) => {
      console.log(`Fetching degree programs data from API`);
      const response = await fetch(`/api/degree_programs?zscore=${zscore}&stream=${stream}&district=${district}&university=${university}&subject=${subjects}&selectz=${selectz}&keyword=${keyword}`);
      if (!response.ok) {
         console.error(`Failed to fetch degree programs data:`, response);
      }
      const result = await response.json();
      setData(result.data as TableDataType[]);
      console.log(`degree programs data fetched successfully from api:`, result);
   }

   useEffect(() => {
      fetchData("streams", 30, (data: any[]) => setStreams(data as OptionType[]))
      fetchData("districts", 30, (data: any[]) => setDistricts(data as OptionType[]))
      fetchData("subjects", 30, (data: any[]) => setSubjects(data as OptionType[]))
      fetchData("universities", 30, (data: any[]) => setUniversities(data as OptionType[]))
   }, []);

   return (
      <DataStoreContext.Provider value={{streams, districts, universities, subjects, data, fetchCourses, setData}}>
         {
            (subjects.length > 0 && streams.length > 0 && districts.length > 0 && universities.length > 0) ? children : <Loading/>
         }
      </DataStoreContext.Provider>
   )
}