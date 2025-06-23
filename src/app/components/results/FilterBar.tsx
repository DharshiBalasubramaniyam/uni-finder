/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterType, OptionType } from "@/app/types/Types";
import { FaTimes } from "react-icons/fa";
import Button from "../common/Button";
import Label from "../form/Label";
import TextInput from "../form/TextInput";
import CheckBox from "../form/CheckBox";
import SelectInput from "../form/SelectInput";

type FilterBarProps = {
   sideBarDisplay: string;
   setSideBarDisplay: (value: string) => void;
   onApplyFilters: (e: React.MouseEvent<HTMLButtonElement>) => void;
   loadFilterParams: () => void;
   onInputChange: (type: FilterType, value: any) => void;

   zscore: string;
   zscoreRef: React.RefObject<any>;
   selectZscore: boolean;

   districts: OptionType[];
   district: OptionType | null;
   districtRef: React.RefObject<any>;

   streams: OptionType[];
   stream: OptionType | null;
   streamRef: React.RefObject<any>;

   subjects: OptionType[];
   selectedSubjects: OptionType[];
   subjectsRef: React.RefObject<any>;

   universities: OptionType[];
   university: OptionType | null;
   universityRef: React.RefObject<any>;

   keyword: string;
   keywordRef: React.RefObject<any>;
};

function FilterBar({
   sideBarDisplay,
   setSideBarDisplay,
   onApplyFilters,
   // loadFilterParams,

   zscore,
   zscoreRef,
   onInputChange,
   selectZscore,

   districts,
   district,
   districtRef,

   streams,
   stream,
   streamRef,

   subjects,
   selectedSubjects,
   subjectsRef,

   universities,
   university,
   universityRef,

   keyword,
   keywordRef,
}: FilterBarProps) {

   return (
      <div className={`h-screen fixed top-0 transition-all duration-500 ${sideBarDisplay} z-50 m w-full max-w-96 bg-gray-800 shadow-md shadow-white p-3`}>
         <div className="flex items-center justify-between mb-3 text-sm">
            <h2 className="text-xl">Filter</h2>
            <div className="flex gap-2">
               <Button
                  text="Apply"
                  onclick={onApplyFilters}
               />
               <Button
                  icon={<FaTimes />}
                  className="border border-red-500 bg-transparent hover:bg-red-600"
                  onclick={() => {
                     // loadFilterParams();
                     setSideBarDisplay("right-[-100%]")
                  }}
               />
            </div>
         </div>
         <form>
            <div>
               <Label htmlFor="zscore" text="Z-score" />
               <TextInput
                  id="zscore"
                  value={zscore}
                  onChange={(e) => onInputChange(FilterType.ZSCORE, e.target.value)}
                  placeholder="Enter your Z-score"
                  required={true}
                  ref={zscoreRef}
               />
               <div className="flex mt-2 items-center gap-2 justify-items-start">
                  <CheckBox
                     id="select-zscore"
                     value={selectZscore}
                     onChange={(e) => onInputChange(FilterType.SELECTZ, e.target.checked)}
                  />
                  <label htmlFor="select-zscore">Show all courses (*optional)</label>
               </div>
            </div>
            <div className="mt-4">
               <Label htmlFor="district" text="District" />
               <SelectInput
                  isMultiple={false}
                  id="district"
                  options={districts}
                  ref={districtRef}
                  value={district}
                  onChange={(selectedOption) => onInputChange(FilterType.DISTRICT, selectedOption as OptionType | null)}
                  placeholder="Select district"
                  required={true}
               />
            </div>
            <div className="mt-4">
               <Label htmlFor="stream" text="Stream" />
               <SelectInput
                  isMultiple={false}
                  id="stream"
                  options={streams}
                  ref={streamRef}
                  value={stream}
                  onChange={(selectedOption) => onInputChange(FilterType.STREAM, selectedOption as OptionType | null)}
                  placeholder="Select stream"
                  required={true}
               />
            </div>
            <div className="mt-4">
               <Label htmlFor="subjects" text="Subjects" />
               <SelectInput
                  isMultiple={true}
                  id="subjects"
                  options={subjects}
                  value={selectedSubjects}
                  ref={subjectsRef}
                  onChange={(selectedOptions) => onInputChange(FilterType.SUBJECTS, selectedOptions as OptionType[])}
                  placeholder="Select subjects"
                  required={true}
                  isOptionDisabled={() => selectedSubjects.length >= 3}
               />
            </div>
            <div className="mt-4">
               <Label htmlFor="university" text="University (*optional)" />
               <SelectInput
                  isMultiple={false}
                  id="university"
                  options={universities}
                  value={university}
                  ref={universityRef}
                  onChange={(selectedOption) => onInputChange(FilterType.UNIVERSITY, selectedOption as OptionType | null)}
                  placeholder="Select university"
                  required={false}
               />
            </div>
            <div className="mt-4">
               <Label htmlFor="keyword" text="Keyword" />
               <TextInput
                  id="keyword"
                  value={keyword}
                  onChange={(e) => onInputChange(FilterType.KEYWORD, e.target.value.toLowerCase())}
                  placeholder="Enter keyword"
                  required={false}
                  ref={keywordRef}
               />
            </div>
         </form>
      </div>
   )

}

export default FilterBar;