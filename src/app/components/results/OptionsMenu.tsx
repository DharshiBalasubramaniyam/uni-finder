import { FaCheckCircle, FaCircle, FaDownload, FaFilter, FaTable } from "react-icons/fa";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { TableColumn } from "@/app/types/Types";
import Button from "../common/Button";

type OptionsMenuPropsType = {
   tableColumns: TableColumn[],
   setTableColumns: (columns: TableColumn[]) => void,
   downLoadPDF: (unhiddenOnly: boolean) => void,
   setSideBarDisplay: (style: string) => void
}

function OptionsMenu({tableColumns, setTableColumns, downLoadPDF, setSideBarDisplay}: OptionsMenuPropsType) {

   return (
      <div className="px-4 py-1 w-full mt-36 md:mt-30">
         <div className="w-full flex items-center justify-end">
            <div className="flex gap-2 ">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <button className="IconButton text-sm flex gap-2 items-center justify-center px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 cursor-pointer" aria-label="Customise options">
                        <FaTable />
                        <span className={"hidden md:inline"}>Manage columns</span>
                     </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuPortal>
                     <DropdownMenuContent className="DropdownMenuContent bg-gray-700 rounded shadow-md" sideOffset={10}>
                        {
                           tableColumns.map(c => {
                              return (
                                 <DropdownMenuCheckboxItem
                                    checked={c.show}
                                    disabled={c.columnName === "unicode"}
                                    key={c.columnName}
                                    className={`px-4 py-2 outline-none cursor-pointer hover:bg-gray-500 capitalize border border-gray-600 flex items-center gap-3 text-sm ${c.columnName === "unicode" ? "opacity-50" : ""}`}
                                    onCheckedChange={() => {
                                       setTableColumns(
                                          tableColumns.map((col: TableColumn) =>
                                             col.columnName === c.columnName
                                                ? { ...col, show: !col.show }
                                                : col
                                          )
                                       )
                                    }}
                                 >
                                    {c.show ? <FaCheckCircle /> : <FaCircle />}
                                    {c.columnName}
                                 </DropdownMenuCheckboxItem>
                              )
                           })
                        }
                     </DropdownMenuContent>
                  </DropdownMenuPortal>
               </DropdownMenu>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <button className="IconButton flex gap-2 items-center justify-center px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 cursor-pointer" aria-label="Customise options">
                        <FaDownload />
                        <span className={"hidden md:inline  text-sm "}>Download</span>
                     </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuPortal>
                     <DropdownMenuContent className="DropdownMenuContent bg-gray-700 rounded shadow-md" sideOffset={10}>
                        <DropdownMenuItem
                           className="DropdownMenuItem p-2 outline-none text-sm border-b border-gray-600 cursor-pointer hover:bg-gray-500 "
                           onClick={() => downLoadPDF(false)}
                        >
                           Download all courses
                        </DropdownMenuItem>
                        <DropdownMenuItem
                           className="DropdownMenuItem p-2 outline-none text-sm cursor-pointer hover:bg-gray-500 "
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
                  className="text-sm"
                  onclick={() => setSideBarDisplay("right-0")}
               />
            </div>
         </div>
      </div>
   )

}

export default OptionsMenu;