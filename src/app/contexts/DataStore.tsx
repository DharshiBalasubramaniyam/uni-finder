/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { createContext, useEffect, useState } from "react";
import { OptionType, TableDataType } from "../types/Types";
import { PropsWithChildren } from "react";
import Loading from "../components/common/Loading";
import { useRouter } from "next/navigation";

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
   fetchCourses: async () => { },
   setData: () => { },
})

export function DataStoreProvider({ children }: PropsWithChildren<unknown>) {
   const [streams, setStreams] = useState<OptionType[]>([]);
   const [districts, setDistricts] = useState<OptionType[]>([]);
   const [universities, setUniversities] = useState<OptionType[]>([]);
   const [subjects, setSubjects] = useState<OptionType[]>([]);
   const [data, setData] = useState<TableDataType[]>([]);
   const router = useRouter();

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
         if (response.status === 400) {
            const result = await response.json();
            alert(result.message);
            router.push("/");
         } else if (response.status === 404) {
            alert("No degree programs found for the selected criteria.");
            router.push("/");
         } else {
            router.push("/error");
         }
         console.error(`Failed to fetch degree programs data:`, response);
         return;
      }
      const result = await response.json();
      setData(result.data as TableDataType[]);
      console.log(`degree programs data fetched successfully from api:`, result);
   }

   useEffect(() => {
      const loadAll = async () => {
         const names = ["streams", "districts", "subjects", "universities"] as const;

         await Promise.all(names.map(async (name) => {
            try {
               let data: any[] | null = null;
               if (typeof window !== "undefined") {
                  console.log(`Accessing localStorage access for ${name} on server side`);
                  const cached = localStorage.getItem(name);

                  if (cached) {
                     const parsed = JSON.parse(cached);
                     if (parsed.expiredAt > Date.now()) {
                        data = parsed.data;
                     }
                  }

               }
               if (data) {
                  console.log(`Using cached data for ${name}`);
               } else {
                  console.log(`No cached data for ${name}, fetching from API`);
               }
               if (!data) {
                  const response = await fetch(`/api/${name}`);
                  if (!response.ok) throw new Error(`${name} fetch failed`);
                  const result = await response.json();
                  data = result.data;
                  localStorage.setItem(name, JSON.stringify({
                     data,
                     expiredAt: Date.now() + 30 * 24 * 60 * 60 * 1000
                  }));
               }

               switch (name) {
                  case "streams":
                     setStreams(data as OptionType[]);
                     break;
                  case "districts":
                     setDistricts(data as OptionType[]);
                     break;
                  case "subjects":
                     setSubjects(data as OptionType[]);
                     break;
                  case "universities":
                     setUniversities(data as OptionType[]);
                     break;
               }
            } catch (err) {
               console.error(`Error loading ${name}:`, err);
               router.push("/error");
            }
         }));
      };

      loadAll();
   }, []);


   return (
      <DataStoreContext.Provider value={{ streams, districts, universities, subjects, data, fetchCourses, setData }}>
         {
            (subjects?.length > 0 && streams?.length > 0 && districts?.length > 0 && universities?.length > 0) ? children : <Loading />
         }
      </DataStoreContext.Provider>
   )
}