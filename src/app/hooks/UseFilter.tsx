/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { OptionType, FilterType } from "../types/Types";

function UseFilter() {

   const [stream, setStream] = useState<OptionType | null>(null);
   const [district, setDistrict] = useState<OptionType | null>(null);
   const [university, setUniversity] = useState<OptionType | null>(null);
   const [selectedSubjects, setSelectedSubjects] = useState<OptionType[]>([]);
   const [zscore, setZscore] = useState("");
   const [keyword, setkeyword] = useState("");
   const [selectZscore, setSelectZscore] = useState(false);

   const zscoreRef = useRef<HTMLInputElement>(null)
   const keywordRef = useRef<HTMLInputElement>(null)
   const districtRef = useRef<any>(null)
   const streamRef = useRef<any>(null)
   const subjectsRef = useRef<any>(null)
   const universityRef = useRef<any>(null)

   const onInputChange = (name: FilterType, value: any) => {
      switch (name) {
         case FilterType.STREAM:
            setStream(value);
            break;
         case FilterType.DISTRICT:
            setDistrict(value);
            break;
         case FilterType.UNIVERSITY:
            setUniversity(value);
            break;
         case FilterType.SUBJECTS:
            setSelectedSubjects(value);
            break;
         case FilterType.ZSCORE:
            setZscore(value);
            break;
         case FilterType.KEYWORD:
            setkeyword(value);
            break;
         case FilterType.SELECTZ:
            setSelectZscore(value);
            break;
         default:
            break;
      }
   }

   return { stream, 
      district, 
      selectedSubjects, 
      zscore, 
      university, 
      selectZscore, 
      keyword, zscoreRef, keywordRef, districtRef, streamRef, subjectsRef, universityRef,
      onInputChange 
   }

}

export default UseFilter;