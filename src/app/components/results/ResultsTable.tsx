import { TableColumn, TableDataType } from "@/app/types/Types"
import { FaBook, FaEyeSlash } from "react-icons/fa"
import Button from "../common/Button"

type ResultsTablePropsType = {
   tableColumns: TableColumn[],
   tableData: TableDataType[],
   handleHide: (unicode: string, isHidden: boolean) => void,
   showEligibility: (course: TableDataType) => void
}

function ResultsTable({tableColumns, tableData, handleHide, showEligibility}: ResultsTablePropsType) {

   if (tableData.length == 0) {
      return <></>
   }
   
   return (
      <div className="p-4 w-full">
         <div className="w-full overflow-x-auto">
            <table className="min-w-xl w-full border-collapse">
               <thead>
                  <tr className="bg-gray-800">
                     {
                        tableColumns.filter(c => c.show).map(c => {
                           return <th className="p-2 uppercase text-sm">{c.columnName}</th>

                        })
                     }
                  </tr>
               </thead>
               <tbody className="bg-gray-700 text-white text-sm *:text-center *:hover:bg-gray-600 *:border-b *:border-b-gray-800">
                  {
                     tableData.map((course, index) => {
                        return course.isHidden ? (
                           <tr key={`${course.unicode}-${index}`}>
                              <td colSpan={5} className="p-2 text-center text-white bg-gray-700 opacity-50 border-b border-b-gray-800">
                                 <span className="font-bold">{course.courseName}, {course.university}</span> is hidden.
                                 <span
                                    onClick={() => handleHide(course.unicode, false)}
                                    className="text-cyan-400 cursor-pointer underline hover:text-cyan-500 ml-2"
                                 >Show</span>
                              </td>
                           </tr>
                        ) : (
                           <tr
                              key={`${course.unicode}-${index}`}
                              className="justify-center"
                           >
                              {tableColumns.map(c => {
                                 return (
                                    <>
                                       {c.columnName == "unicode" && c.show && <td className="p-2">{course.unicode}</td>}
                                       {c.columnName == "course name" && c.show && <td className="p-2 capitalize">{course.courseName}</td>}
                                       {c.columnName == "university" && c.show && <td className="p-2">{course.university}</td>}
                                       {c.columnName == "zscore" && c.show && <td className="p-2">{course.zscore}</td>}
                                       {c.columnName == "degree/duration" && c.show && <td className="p-2">bsc hons in software engineering</td>}
                                       {c.columnName == "medium" && c.show && <td className="p-2">English</td>}
                                       {c.columnName == "actions" && c.show && (
                                          <td className="p-2 flex gap-2 last:justify-center">
                                             <Button
                                                icon={<FaBook />}
                                                onclick={() => showEligibility(course)}
                                             />
                                             <Button
                                                icon={<FaEyeSlash />}
                                                onclick={() => handleHide(course.unicode, true)}
                                             />
                                          </td>
                                       )}
                                    </>
                                 )
                              })}
                           </tr>
                        )
                     })
                  }
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default ResultsTable;