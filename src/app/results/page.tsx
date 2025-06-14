"use client"
import { useEffect, useState } from "react";
import Header from "../components/common/header";
import Label from "../components/form/Label";
import TextInput from "../components/form/TextInput";
import Papa from 'papaparse';
import SelectInput from "../components/form/SelectInput";
import CheckBox from "../components/form/CheckBox";
import { useSearchParams } from "next/navigation";

// TODO:
// Put loading
// Add universities - done
// Add pagination
// Fix repeating classnamees of sidebar and details

type OptionType = { value: string; label: string };

export default function ResultsPage() {
   const searchParams = useSearchParams();
   const zscoreFromURL = searchParams.get("zscore")
   const districtFromURL = searchParams.get("district")
   const streamFromURL = searchParams.get("stream")
   const subjectsFromURL = searchParams.get("subjects")
   const universityFromURL = searchParams.get("university")

   const [streams, setStreams] = useState<OptionType[]>([]);
   const [stream, setStream] = useState<OptionType | null>(null);
   const [districts, setDistricts] = useState<OptionType[]>([]);
   const [district, setDistrict] = useState<OptionType | null>(null);
   const [universities, setUniversities] = useState<OptionType[]>([]);
   const [university, setUniversity] = useState<OptionType | null>(null);
   const [subjects, setSubjects] = useState<OptionType[]>([]);
   const [selectedSubjects, setSelectedSubjects] = useState<OptionType[]>([]);
   const [zscore, setZscore] = useState("");
   const [selectZscore, setSelectZscore] = useState(false);

   const fetchCSVData = async (csvPath: string, onComplete: (data: OptionType[]) => void) => {
      try {
         const response = await fetch(csvPath);
         const text = await response.text();
         console.log("CSV data fetched successfully:", text.slice(0, 100)); // Log first 100 characters for debugging
         const result = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
         });
         onComplete(result.data as OptionType[]);
      } catch (error) {
         console.error("Error fetch CSV data:", csvPath, error);
      }
   };

   useEffect(() => {
      fetchCSVData("streams.csv", (data: OptionType[]) => setStreams(data))
      fetchCSVData("districts.csv", (data: OptionType[]) => setDistricts(data))
      fetchCSVData("subjects.csv", (data: OptionType[]) => setSubjects(data))
      fetchCSVData("universities.csv", (data: OptionType[]) => setUniversities(data))
   }, []);

   useEffect(() => {
      if (streams.length > 0 && !stream && streamFromURL) {
         setStream(streams.find(st => st.value == streamFromURL) || { label: "", value: "" });
      }
      if (districts.length > 0 && !district && districtFromURL) {
         setDistrict(districts.find(dis => dis.value == districtFromURL) || { label: "", value: "" });
      }
      const subs: OptionType[] = [];
      if (subjects.length > 0 && !selectedSubjects.length && subjectsFromURL) {
         const subjectValues = subjectsFromURL.split(",");
         subjectValues.forEach(value => {
            const subject = subjects.find(sub => sub.value == value);
            if (subject) subs.push(subject);
         });
         setSelectedSubjects(subs);
      }
      if (universities.length > 0 && !university && universityFromURL) {
         setUniversity(universities.find(univ => univ.value == universityFromURL) || { label: "", value: "" });
      }
      if (zscoreFromURL) {
         setZscore(zscoreFromURL);
      }
   }, [streams, districts, subjects, universities, streamFromURL, districtFromURL, subjectsFromURL, zscoreFromURL, universities]);

   return (
      <main className="flex min-h-screen flex-col">
         <Header />
         <div className="px-4 py-1 w-full mt-5">
            <div className="w-full flex items-center justify-end">
               <div className="flex gap-2 ">
                  <button className="px-7 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                     Export
                  </button>
                  <button
                     onClick={() => document.getElementById("filter-sidebar")?.setAttribute("class", "h-screen fixed top-0 transition-all duration-500 right-0 z-50 w-96 bg-black shadow-md shadow-white p-3")}
                     className="px-7 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                     Filter
                  </button>
               </div>
            </div>
         </div>

         <div className="p-4 w-full">
            <div className="w-full overflow-x-auto">
               <table className="min-w-xl w-full border-collapse">
                  <thead>
                     <tr className="bg-gray-800">
                        <th className="p-2">Unicode</th>
                        <th className="p-2">Course Name</th>
                        <th className="p-2">University</th>
                        <th className="p-2">Z-score</th>
                        <th className="p-2">Action</th>
                     </tr>
                  </thead>
                  <tbody className="bg-gray-700 text-white *:text-center *:hover:bg-gray-600 *:border-b *:border-b-gray-800">
                     {/* Example row, replace with dynamic data */}
                     <tr className="justify-center">
                        <td className="p-2">123456</td>
                        <td className="p-2">Bachelor of Science</td>
                        <td className="p-2">University of Example</td>
                        <td className="p-2">0.85</td>
                        <td className="p-2 flex gap-2 last:justify-center">
                           <button
                              onClick={() => document.getElementById("details")?.setAttribute("class", "h-screen grid place-items-center w-full p-4 fixed top-0 left-0")}
                              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                           >
                              View Details
                           </button>
                           <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                              Hide
                           </button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>

         <div id="filter-sidebar" className="h-screen fixed top-0 transition-all duration-500 right-[-100%] z-50 m w-96 bg-black shadow-md shadow-white p-3">
            <div className="flex items-center justify-between mb-3">
               <h2 className="text-xl">Filter</h2>
               <div className="flex gap-2">
                  <button
                     className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >Apply</button>
                  <button
                     onClick={() => document.getElementById("filter-sidebar")?.setAttribute("class", "h-screen fixed top-0 transition-all duration-500 right-[-100%] z-50 w-96 bg-black shadow-md shadow-white p-3")}
                     className="p-2 border border-gray-700 hover:bg-gray-700 rounded"
                  >close</button>
               </div>
            </div>
            <form>
               <div>
                  <Label htmlFor="zscore" text="Z-score" />
                  <TextInput
                     id="zscore"
                     value={zscore}
                     onChange={(e) => setZscore(e.target.value)}
                     placeholder="Enter your Z-score"
                     required={true}
                  />
                  <div className="flex mt-1 items-center gap-2 justify-items-start">
                     <CheckBox
                        id="select-zscore"
                        value={selectZscore}
                        onChange={(e) => setSelectZscore(e.target.checked)}
                     />
                     <label htmlFor="select-zscore">Show all courses</label>
                  </div>
               </div>
               <div className="mt-4">
                  <Label htmlFor="district" text="District" />
                  <SelectInput
                     isMultiple={false}
                     id="district"
                     options={districts}
                     value={district}
                     onChange={(selectedOption) => setDistrict(selectedOption as OptionType | null)}
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
                     value={stream}
                     onChange={(selectedOption) => setStream(selectedOption as OptionType | null)}
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
                     onChange={(selectedOptions) => setSelectedSubjects(selectedOptions as OptionType[])}
                     placeholder="Select subjects"
                     required={true}
                     isOptionDisabled={() => selectedSubjects.length >= 3}
                  />
               </div>
               <div className="mt-4">
                  <Label htmlFor="university" text="University" />
                  <SelectInput
                     isMultiple={false}
                     id="university"
                     options={universities}
                     value={university}
                     onChange={(selectedOption) => setUniversity(selectedOption as OptionType | null)}
                     placeholder="Select university"
                     required={true}
                  />
               </div>
            </form>
         </div>

         <div id="details" className="h-screen hidden place-items-center w-full p-4 fixed top-0 left-0">
            <div className="w-full max-w-md min-h-60 max-h-96 overflow-y-scroll bg-white rounded p-4 text-black">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente itaque nam consequuntur vel maxime fuga distinctio sunt inventore cupiditate, quidem, facilis soluta consequatur error? Sit itaque minima optio? Quas, dolores. Dicta explicabo dignissimos id suscipit est rem minus voluptatum a! Provident quidem in nam esse necessitatibus aspernatur dolorem ab voluptatibus?
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime illum perferendis placeat tempore soluta cupiditate, corporis iusto vero est voluptatum corrupti enim voluptatem? Nam labore minus quidem repellat dolorum laborum. Quia odio autem doloremque voluptate ratione? Dolore aut itaque ex nostrum, commodi magnam? Atque harum rerum eius vel error suscipit numquam accusantium dignissimos consequuntur sit? Accusamus impedit consequuntur, ipsa autem molestiae velit aperiam adipisci quis ducimus possimus ipsam. Ad facere quam, eligendi officiis explicabo totam ipsam optio. Id obcaecati illo iusto quidem, eveniet libero dolorum accusantium error exercitationem assumenda magnam possimus nam eaque ratione dolorem? Optio fugit dolorem velit ex.
            </div>
            <button
               onClick={() => document.getElementById("details")?.setAttribute("class", "h-screen hidden place-items-center w-full p-4 fixed top-0 left-0")}
               className="bg-white text-black hover:bg-gray-300 px-2 py-1 absolute top-0 right-0"
            >close</button>
         </div>
      </main>
   );
}