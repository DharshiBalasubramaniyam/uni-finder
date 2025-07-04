/* eslint-disable @typescript-eslint/no-explicit-any */
import { OptionType } from "@/app/types/Types";
import { useSearchParams } from "next/navigation";
import { RefObject } from "react";
import InputDisplay from "./InputDisplay";

type FilterValuesDisplayPropsType = {
   dataLength: number,
   zscoreRef: RefObject<any>,
   districtRef: RefObject<any>,
   streamRef: RefObject<any>,
   subjectsRef: RefObject<any>,
   universityRef: RefObject<any>,
   keywordRef: RefObject<any>,
   universities: OptionType[]
   setSideBarDisplay: (style: string) => void
}

function FilterValuesDisplay({ dataLength, zscoreRef, districtRef, streamRef, subjectsRef, universityRef, keywordRef, universities, setSideBarDisplay }: FilterValuesDisplayPropsType) {

   const searchParams = useSearchParams();
   const zscoreFromURL = searchParams.get("zscore")
   const selectZFromURL = searchParams.get("selectz")
   const districtFromURL = searchParams.get("district")
   const streamFromURL = searchParams.get("stream")
   const subjectsFromURL = searchParams.get("subjects")
   const universityFromURL = searchParams.get("university")
   const keywordFromURL = searchParams.get("keyword")

   return (
      <div>
         <p className="text-center text-xs mt-2">{dataLength} results found for search:</p>
         <div className="flex-1 mx-4 p-1 mt-3 flex gap-2 flex-wrap rounded items-center justify-center">
            {
               selectZFromURL != "true" && zscoreFromURL && (
                  <InputDisplay
                     value={zscoreFromURL}
                     key="Zscore"
                     onEdit={() => {
                        zscoreRef.current?.focus();
                        setSideBarDisplay("right-0");
                     }}
                  />
               )
            }
            {
               districtFromURL && (
                  <InputDisplay
                     value={districtFromURL.replace("_", " ")}
                     key="District"
                     onEdit={() => {
                        districtRef.current?.focus();
                        setSideBarDisplay("right-0");
                     }}
                  />
               )
            }
            {
               streamFromURL && (
                  <InputDisplay
                     value={streamFromURL}
                     key="Stream"
                     onEdit={() => {
                        streamRef.current?.focus();
                        setSideBarDisplay("right-0");
                     }}
                  />
               )
            }
            {
               subjectsFromURL && (
                  <InputDisplay
                     value={subjectsFromURL.split(",").map(s => s.split("_").join(" ")).join(", ")}
                     key="subjects"
                     onEdit={() => {
                        subjectsRef.current?.focus();
                        setSideBarDisplay("right-0");
                     }}
                  />
               )
            }
            {
               universityFromURL && (
                  <InputDisplay
                     value={universities.find(u => u.value === universityFromURL)?.label || ""}
                     key="University"
                     onEdit={() => {
                        universityRef.current?.focus();
                        setSideBarDisplay("right-0");
                     }}
                  />
               )
            }
            {
               keywordFromURL && (
                  <InputDisplay
                     value={keywordFromURL}
                     key="Keyword"
                     onEdit={() => {
                        keywordRef.current?.focus();
                        setSideBarDisplay("right-0");
                     }}
                  />
               )
            }
         </div>
      </div>
   )

}

export default FilterValuesDisplay;
