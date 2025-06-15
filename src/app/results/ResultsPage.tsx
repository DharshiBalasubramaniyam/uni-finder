/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useRef, useState } from "react";
import Header from "../components/common/header";
import Label from "../components/form/Label";
import TextInput from "../components/form/TextInput";
import Papa from 'papaparse';
import SelectInput from "../components/form/SelectInput";
import CheckBox from "../components/form/CheckBox";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Loading from "../components/common/Loading";
import Button from "../components/common/Button";
import CourseDetailView from "../components/common/CourseDetailsView";
import { FaBook, FaDownload, FaEyeSlash, FaFilter, FaTimes } from "react-icons/fa";
import InputDisplay from "./InputDisplay";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuPortal
} from "@radix-ui/react-dropdown-menu";
// TODO:
// Put loading - done
// Add universities - done
// Add pagination
// Fix repeating classnamees of sidebar and details - done
// Extract repeated csv files read across 2 pages into a common function
// Extract table into a common component
// If not proper values found for required fields from the URL, redirect to home page
// Check unicode coulun of csv file for duplicates
// hide - done
// view details - done
// export
// hide, export filter close loading icons  
// button reuse - done
// sort values in select input
// any subjects courses are not selcted

type OptionType = { value: string; label: string };
type CourseDataType = {
   code: string;
   course: string;
   university: string;
   stream: string;
   gampaha: string;
   colombo: string;
   kaluthara: string;
   galle: string;
   matara: string;
   hambantota: string;
   jaffna: string;
   kilinochchi: string;
   mallaitivu: string;
   vavuniya: string;
   mannar: string;
   anuradhapura: string;
   polonnaruwa: string;
   badulla: string;
   monaragala: string;
   nuwara_eliya: string;
   kandy: string;
   matale: string;
   kurunegala: string;
   puttalam: string;
   ratnapura: string;
   trincomalee: string;
   batticaloa: string;
   ampara: string;
   kegalle: string;
   course_code: string;
   uni_code: string;
   subjects: string;
   [key: string]: string; // Add index signature
}
type TableDataType = {
   unicode: string;
   courseCode: string;
   courseName: string;
   university: string;
   zscore: string;
   isHidden: boolean
}

export default function ResultsPage() {

   const router = useRouter();

   const searchParams = useSearchParams();
   const zscoreFromURL = searchParams.get("zscore")
   const selectZFromURL = searchParams.get("selectz")
   const districtFromURL = searchParams.get("district")
   const streamFromURL = searchParams.get("stream")
   const subjectsFromURL = searchParams.get("subjects")
   const universityFromURL = searchParams.get("university")

   const [sideBarDisplay, setSideBarDisplay] = useState<string>("right-[-100%]")
   const [detailsDisplay, setDetailsDisplay] = useState<string>("hidden")

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
   const [detailView, setDetailView] = useState<TableDataType | null>(null);

   const [data, setData] = useState<CourseDataType[]>([]);
   const [tableData, setTableData] = useState<TableDataType[]>([])

   const zscoreRef = useRef<HTMLInputElement>(null)
   const districtRef = useRef<any>(null)
   const streamRef = useRef<any>(null)
   const subjectsRef = useRef<any>(null)
   const universityRef = useRef<any>(null)

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

   const fetchCourseData = async (csvPath: string, onComplete: (data: CourseDataType[]) => void) => {
      try {
         const response = await fetch(csvPath);
         const text = await response.text();
         console.log("CSV data fetched successfully:", text.slice(0, 100)); // Log first 100 characters for debugging
         const result = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
         });
         onComplete(result.data as CourseDataType[]);
      } catch (error) {
         console.error("Error fetch CSV data:", csvPath, error);
      }
   };

   useEffect(() => {
      fetchCSVData("streams.csv", (data: OptionType[]) => setStreams(data))
      fetchCSVData("districts.csv", (data: OptionType[]) => setDistricts(data))
      fetchCSVData("subjects.csv", (data: OptionType[]) => setSubjects(data))
      fetchCSVData("universities.csv", (data: OptionType[]) => setUniversities(data))
      fetchCourseData("ugc_final_uni_formatted.csv", (data: CourseDataType[]) => setData(data))
   }, []);

   useEffect(() => {
      console.log("hi")
      const st = streams.find(st => st.value == streamFromURL) || { label: "", value: "" }
      const dist = districts.find(dis => dis.value == districtFromURL) || { label: "", value: "" }
      const subs: OptionType[] = [];
      const z = zscoreFromURL || ""
      const selz = selectZFromURL == "true"
      const uni = universities.find(univ => univ.value == universityFromURL) || { label: "", value: "" }
      if (streams.length > 0 && !stream && streamFromURL) {
         setStream(st);
      }
      if (districts.length > 0 && !district && districtFromURL) {
         setDistrict(dist);
      }
      if (subjects.length > 0 && !selectedSubjects.length && subjectsFromURL) {
         const subjectValues = subjectsFromURL.split(",");
         subjectValues.forEach(value => {
            const subject = subjects.find(sub => sub.value == value);
            if (subject) subs.push(subject);
         });
         setSelectedSubjects(subs);
      }
      if (universities.length > 0 && !university && universityFromURL) {
         setUniversity(uni);
      }
      setZscore(z);
      setSelectZscore(selz);
      console.log("subs: ", subs)
      const subValues = subs.length > 0 ? subs.map(s => s.value) : selectedSubjects.map(s => s.value);
      fetchCourses(z, selz, st.value, dist.value, subValues, uni.value)
   }, [streams, districts, subjects, universities, streamFromURL, districtFromURL, subjectsFromURL, zscoreFromURL, selectZFromURL, universityFromURL, universities, data]);

   const onApplyFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setTableData([]);
      console.log("Form submitted with:", {
         zscore,
         district,
         stream,
         subjects: selectedSubjects,
         university,
         selectZscore
      });
      if (!validate(zscore, district, stream, selectedSubjects)) {
         return;
      }
      setSideBarDisplay("right-[-100%]")
      router.push(`/results?zscore=${zscore}&selectz=${selectZscore}&district=${district?.value}&stream=${stream?.value}&subjects=${selectedSubjects.map(s => s.value)}&university=${university?.value || ""}`);
   }

   const fetchCourses = (zscore: string, selectZscore: boolean, stream: string, district: string, subjects: string[], university: string) => {
      // zscore selectZscore stream district subjects university
      console.log({ zscore, selectZscore, stream, district, subjects, university })
      let filtered: CourseDataType[] = data
      const validDist: keyof CourseDataType | undefined = district

      if (!validDist || !stream || subjects.length == 0) {
         // router.push("/")
         return;
      };

      filtered = filtered.filter(course => course[validDist] != 'NQC')

      if (!selectZscore) {
         filtered = filtered.filter(course => parseFloat(course[validDist]) <= parseFloat(zscore))
      }

      filtered = filtered.filter(c => (c.stream == stream && subjects.every(sub => c.subjects.includes(sub))) || (c.stream != stream && subjects.every(sub => c.subjects.includes(sub))))

      if (university != "") {
         filtered = filtered.filter(c => c.university == university)
      }
      console.log(typeof (filtered))
      console.log("filetred: ", filtered.length, data.length)

      let finalData: TableDataType[] = filtered.map(c => {
         return {
            unicode: c.code,
            courseCode: c.course_code,
            courseName: c.course,
            university: universities.find(u => u.value == c.university)?.label || "N/A",
            zscore: Number.parseFloat(c[validDist]).toFixed(4),
            isHidden: false
         }
      })

      finalData = finalData.sort((c1, c2) => parseFloat(c2.zscore) - parseFloat(c1.zscore))

      setTableData(finalData)

   }

   function handleHide(code: string, isHidden: boolean) {
      console.log(code, isHidden)
      const newData = tableData.map(c => {
         if (c.unicode == code)
            return { ...c, isHidden: isHidden }
         return c
      })
      setTableData(newData)
   }

   function downLoadPDF(unhiddenOnly: boolean) {
      const doc = new jsPDF()

      doc.setFontSize(18)
      doc.text('University course selection list', 14, 20)

      const columns = ["Unicode", "Course", "University", "Zscore"]
      const rows = tableData.filter(c => {
         if (unhiddenOnly) 
            return !c.isHidden
         return true
      }).map(c => {
         return [c.unicode, c.courseName, c.university, c.zscore]
      })

      autoTable(doc, {
         startY: 30, head: [columns], body: rows
      })

      doc.save(unhiddenOnly ? "university_course_list_unhidden.pdf" : "university_course_list_all.pdf")

   }

   return (
      <main className="flex min-h-screen flex-col">
         <Header />

         {
            tableData.length === 0 && (
               <Loading />
            )
         }

         {
            tableData.length != 0 && (
               <div>
                  <div className="px-4 py-1 w-full mt-36 md:mt-30">
                     <div className="w-full flex items-center justify-end">
                        <div className="flex gap-2 ">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <button className="IconButton flex gap-2 items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" aria-label="Customise options">
                                    <FaDownload/>
                                    <span className={"hidden md:inline"}>Download</span>
                                 </button>
                              </DropdownMenuTrigger>

                              <DropdownMenuPortal>
                                 <DropdownMenuContent className="DropdownMenuContent bg-gray-700 rounded shadow-md" sideOffset={10}>
                                    <DropdownMenuItem 
                                       className="DropdownMenuItem p-2 outline-none cursor-pointer hover:bg-gray-500 "
                                       onClick={() => downLoadPDF(false)}
                                    >
                                       Download all courses
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                       className="DropdownMenuItem p-2 outline-none cursor-pointer hover:bg-gray-500 "
                                       onClick={() => downLoadPDF(true)}
                                    >
                                       Download unhidden courses
                                    </DropdownMenuItem>
                                 </DropdownMenuContent>
                              </DropdownMenuPortal>
                           </DropdownMenu>
                           <Button
                              text="Filter"
                              icon={<FaFilter />} 
                              onclick={() => setSideBarDisplay("right-0")}
                           />
                        </div>
                     </div>
                  </div>
                  <p className="text-center text-md mt-2">{tableData.length} results found for search:</p>
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
                              value={districtFromURL}
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
                        university?.label && (
                           <InputDisplay
                              value={university.label}
                              key="University"
                              onEdit={() => {
                                 universityRef.current?.focus();
                                 setSideBarDisplay("right-0");
                              }}
                           />
                        )
                     }
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
                              {
                                 tableData.map((course, index) => {
                                    return course.isHidden ? (
                                       <tr key={`${course.unicode}-${index}`}>
                                          <td colSpan={5} className="p-2 text-center text-white bg-gray-700 opacity-50 border-b border-b-gray-800">
                                             <span className="font-bold">{course.courseName}, {course.university}</span> is hidden.
                                             <span
                                                onClick={() => handleHide(course.unicode, false)}
                                                className="text-blue-400 cursor-pointer underline hover:text-blue-500 ml-2"
                                             >Show</span>
                                          </td>
                                       </tr>
                                    ) : (
                                       <tr
                                          key={`${course.unicode}-${index}`}
                                          className="justify-center"
                                       >
                                          <td className="p-2">{course.unicode}</td>
                                          <td className="p-2">{course.courseName}</td>
                                          <td className="p-2">{course.university}</td>
                                          <td className="p-2">{course.zscore}</td>
                                          <td className="p-2 flex gap-2 last:justify-center">
                                             <Button
                                                icon={<FaBook />}
                                                onclick={() => {
                                                   setDetailsDisplay("grid")
                                                   setDetailView(course);
                                                }}
                                             />
                                             <Button
                                                icon={<FaEyeSlash />}
                                                onclick={() => handleHide(course.unicode, true)}
                                             />
                                          </td>
                                       </tr>
                                    )
                                 })
                              }
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            )
         }

         <div className={`h-screen fixed top-0 transition-all duration-500 ${sideBarDisplay} z-50 m w-full max-w-96 bg-black shadow-md shadow-white p-3`}>
            <div className="flex items-center justify-between mb-3">
               <h2 className="text-xl">Filter</h2>
               <div className="flex gap-2">
                  <Button
                     text="Apply"
                     onclick={onApplyFilters}
                  />
                  <Button
                     icon={<FaTimes />}
                     className="border border-red-500 bg-transparent hover:bg-red-600"
                     onclick={() => setSideBarDisplay("right-[-100%]")}
                  />
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
                     ref={zscoreRef}
                  />
                  <div className="flex mt-2 items-center gap-2 justify-items-start">
                     <CheckBox
                        id="select-zscore"
                        value={selectZscore}
                        onChange={(e) => setSelectZscore(e.target.checked)}
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
                     ref={streamRef}
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
                     ref={subjectsRef}
                     onChange={(selectedOptions) => setSelectedSubjects(selectedOptions as OptionType[])}
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
                     onChange={(selectedOption) => setUniversity(selectedOption as OptionType | null)}
                     placeholder="Select university"
                     required={true}
                  />
               </div>
            </form>
         </div>

         <div className={`details h-screen ${detailsDisplay} place-items-center w-full p-4 fixed top-0 left-0 bg-[rgba(0, 0, 0, 0.5)]`}>
            <div className="w-full max-w-md min-h-60 max-h-10/12 overflow-y-scroll bg-white rounded p-4 text-black">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-blod underline">{detailView?.courseName}</h3>
                  <Button
                     icon={<FaTimes />}
                     className="bg-red-500 hover:bg-red-600"
                     onclick={() => setDetailsDisplay("hidden")}
                  />
               </div>
               <p className="mb-3"><strong>Course Code:</strong> {String(detailView?.unicode).padStart(3, '0')}</p>
               <p className="mb-3"><strong>University:</strong> {detailView?.university}</p>
               <p className="mb-3"><strong>Z-Score:</strong> {detailView?.zscore}</p>
               <p className="mb-1"><strong>Eligibility:</strong></p>
               {detailView && <CourseDetailView filePath={`course_descriptions/${String(detailView.courseCode).padStart(3, '0')}.md`} />}
            </div>

         </div>
      </main>
   );
}

function validate(zscore: string, district: OptionType | null, stream: OptionType | null, subjects: OptionType[]) {

   if (!zscore) {
      alert("Z-score is required.");
      return false
   } else if (!/^\d+(\.\d{4})?$/.test(zscore)) {
      alert("Z-score must have four decimal places.");
      return false
   } else if (parseFloat(zscore) < 0 || parseFloat(zscore) > 4.0000) {
      alert("Z-score must be between 0.0000 and 4.0000.");
      return false
   }

   if (!district) {
      alert("District is required.");
      return false
   }

   if (!stream) {
      alert("Stream is required.");
      return false
   }

   if (subjects.length != 3) {
      alert("You must select 3 subjects.");
      return false
   }

   return true;

}
