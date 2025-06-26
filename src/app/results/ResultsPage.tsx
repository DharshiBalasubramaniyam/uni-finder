/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useContext, useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Loading from "../components/common/Loading";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { FilterType, OptionType, TableColumn, TableDataType } from "../types/Types";
import Footer from "../components/common/Footer";
import UseFilter from "../hooks/UseFilter";
import { DataStoreContext } from "../contexts/DataStore";
import OptionsMenu from "../components/results/OptionsMenu";
import FilterValuesDisplay from "../components/results/FilterValuesDisplay";
import ResultsTable from "../components/results/ResultsTable";
import FilterBar from "../components/results/FilterBar";
import EligibilityViewer from "../components/results/EligibitlityViewer";

export default function ResultsPage() {

   const router = useRouter();

   const searchParams = useSearchParams();
   const zscoreFromURL = searchParams.get("zscore")
   const selectZFromURL = searchParams.get("selectz")
   const districtFromURL = searchParams.get("district")
   const streamFromURL = searchParams.get("stream")
   const subjectsFromURL = searchParams.get("subjects")
   const universityFromURL = searchParams.get("university")
   const keywordFromURL = searchParams.get("keyword")

   const { streams, districts, universities, subjects, data, fetchCourses, setData } = useContext(DataStoreContext)
   const { stream, district, selectedSubjects, zscore, university, selectZscore, keyword, zscoreRef, keywordRef, districtRef, streamRef, subjectsRef, universityRef, onInputChange } = UseFilter()

   const [sideBarDisplay, setSideBarDisplay] = useState<string>("right-[-100%]")
   const [detailsDisplay, setDetailsDisplay] = useState<string>("hidden")
   const [detailView, setDetailView] = useState<TableDataType | null>(null);

   const [tableColumns, setTableColumns] = useState<TableColumn[]>([
      { columnName: "unicode", show: true },
      { columnName: "course name", show: true },
      { columnName: "university", show: true },
      { columnName: "zscore", show: true },
      { columnName: "degree/duration", show: false },
      { columnName: "medium", show: false },
      { columnName: "actions", show: true }
   ]);

   function loadFilterParams() {
      const st = streams.find(st => st.value == streamFromURL) || { label: "", value: "" }
      const dist = districts.find(dis => dis.value == districtFromURL) || { label: "", value: "" }
      const subs: OptionType[] = [];
      const z = zscoreFromURL || ""
      const selz = selectZFromURL == "true"
      const uni = universities.find(univ => univ.value == universityFromURL) || { label: "", value: "" }
      const keywd = keywordFromURL || ""

      if (streams.length > 0 && streamFromURL) {
         onInputChange(FilterType.STREAM, st);
      }
      if (districts.length > 0 && districtFromURL) {
         onInputChange(FilterType.DISTRICT, dist);
      }
      if (subjects.length > 0 && subjectsFromURL) {
         const subjectValues = subjectsFromURL.split(",");
         subjectValues.forEach(value => {
            const subject = subjects.find(sub => sub.value == value);
            if (subject) subs.push(subject);
         });
         onInputChange(FilterType.SUBJECTS, subs);
      }
      if (universities.length > 0 && universityFromURL) {
         onInputChange(FilterType.UNIVERSITY, uni);
      }
      onInputChange(FilterType.ZSCORE, z);
      onInputChange(FilterType.KEYWORD, keywd)
      onInputChange(FilterType.SELECTZ, selz);
      console.log(">>>>> fetching courses with params from URL")
   }

   useEffect(() => {
      fetchCourses(
         zscoreFromURL || "",
         streamFromURL || "",
         districtFromURL || "",
         universityFromURL || "",
         subjectsFromURL || "",
         selectZFromURL || "false",
         keywordFromURL || ""
      );
   }, [streamFromURL, districtFromURL, subjectsFromURL, zscoreFromURL, selectZFromURL, universityFromURL, keywordFromURL, streams, districts, subjects, universities]);

   useEffect(() => {
      if (streams.length > 0 && districts.length > 0 && subjects.length > 0 && universities.length > 0) {
         loadFilterParams();
      }
   }, [streams, districts, subjects, universities]);

   const onApplyFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log("Form submitted with:", {
         zscore,
         district,
         stream,
         subjects: selectedSubjects,
         university,
         selectZscore,
         keyword
      });
      if (!validate(zscore, district, stream, selectedSubjects)) {
         return;
      }
      setData([]);
      setSideBarDisplay("right-[-100%]")
      router.push(`/results?zscore=${zscore}&selectz=${selectZscore}&district=${district?.value}&stream=${stream?.value}&subjects=${selectedSubjects.map(s => s.value)}&university=${university?.value || ""}&keyword=${keyword}`);
   }

   function handleHide(code: string, isHidden: boolean) {
      console.log(code, isHidden)
      const newData = data.map(c => {
         if (c.unicode == code)
            return { ...c, isHidden: isHidden }
         return c
      })
      setData(newData)
   }

   function downLoadPDF(unhiddenOnly: boolean) {
      const doc = new jsPDF()

      doc.setFontSize(18)
      doc.text('University course selection list', 14, 20)

      const columns = ["Unicode", "Course", "University", "Zscore"]
      const rows = data.filter(c => {
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

   function showDetail(course: TableDataType) {
      setDetailsDisplay("grid")
      setDetailView(course);
   }

   console.log("tableData: ", data.length)

   return (
      <main className="flex min-h-screen flex-col">
         <Header />

         {
            (data.length != 0 && streams.length != 0 && universities.length != 0 && districts.length != 0 && subjects.length != 0) && (
               <div className="min-h-screen">
                  <OptionsMenu
                     downLoadPDF={downLoadPDF}
                     setSideBarDisplay={setSideBarDisplay}
                     setTableColumns={setTableColumns}
                     tableColumns={tableColumns}
                  />
                  <FilterValuesDisplay
                     dataLength={data.length}
                     districtRef={districtRef}
                     keywordRef={keywordRef}
                     setSideBarDisplay={setSideBarDisplay}
                     streamRef={streamRef}
                     subjectsRef={subjectsRef}
                     universities={universities}
                     universityRef={universityRef}
                     zscoreRef={zscoreRef}
                  />
                  <ResultsTable
                     handleHide={handleHide}
                     showEligibility={showDetail}
                     tableColumns={tableColumns}
                     tableData={data}
                  />
               </div>
            )
         }

         {
            data.length === 0 && (
               <Loading />
            )
         }

         <FilterBar
            district={district}
            districtRef={districtRef}
            keyword={keyword}
            keywordRef={keywordRef}
            districts={districts}
            loadFilterParams={loadFilterParams}
            onApplyFilters={onApplyFilters}
            onInputChange={onInputChange}
            selectZscore={selectZscore}
            selectedSubjects={selectedSubjects}
            setSideBarDisplay={setSideBarDisplay}
            sideBarDisplay={sideBarDisplay}
            stream={stream}
            streamRef={streamRef}
            streams={streams}
            subjects={subjects}
            subjectsRef={subjectsRef}
            universities={universities}
            university={university}
            universityRef={universityRef}
            zscore={zscore}
            zscoreRef={zscoreRef}
         />

         <EligibilityViewer
            detailView={detailView}
            detailsDisplay={detailsDisplay}
            setDetailsDisplay={setDetailsDisplay}
         />
         <Footer />
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
