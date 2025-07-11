import { TableColumn, TableDataType } from "@/app/types/Types"
import { FaBook, FaEyeSlash } from "react-icons/fa"
import Button from "../common/Button"

type ResultsTablePropsType = {
   tableColumns: TableColumn[],
   tableData: TableDataType[],
   handleHide: (unicode: string, isHidden: boolean) => void,
   showEligibility: (course: TableDataType) => void
}

function ResultsTable({ tableColumns, tableData, handleHide, showEligibility }: ResultsTablePropsType) {

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
                        tableColumns.filter(c => c.show).map((c, index) => {
                           return <th key={c.columnName} className={`${index == 0 ? "sticky left-0 z-10 bg-gray-800" : ""} p-2 uppercase`}>{c.columnName}</th>
                        })
                     }
                  </tr>
               </thead>
               <tbody className="bg-gray-700 text-white text-sm *:text-center *:hover:bg-cyan-950 *:border-b *:border-b-gray-800">
                  {
                     tableData.map((course, index) => {
                        return course.isHidden ? (
                           <tr key={`${course.unicode}-${index}`}>
                              <td colSpan={tableColumns.filter(c => c.show).length} className="p-2 text-center text-white bg-gray-700 opacity-50 border-b border-b-gray-800">
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
                                       {c.columnName == "unicode" && c.show && <td className="p-2 sticky left-0 z-10 bg-gray-600 md:bg-transparent">{course.unicode}</td>}
                                       {c.columnName == "course name" && c.show && <td className="p-2 capitalize">{course.courseName}</td>}
                                       {c.columnName == "university" && c.show && <td className="p-2">{course.university}</td>}
                                       {c.columnName == "zscore" && c.show && <td className="p-2">{course.zscore}</td>}
                                       {c.columnName == "degree/duration" && c.show && (
                                          <td className="p-2">
                                             {
                                                course.degree_programs.map(d => {
                                                   return (
                                                      <li key={d.name} className="mb-1">{d.name} <br/><i>({d.duration} years)</i></li>
                                                   )
                                                })
                                             }
                                          </td>
                                       )}
                                       {c.columnName == "medium" && c.show && (
                                          <td className="p-2 capitalize">
                                                {course.medium.toString()}
                                          </td>
                                       )}
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