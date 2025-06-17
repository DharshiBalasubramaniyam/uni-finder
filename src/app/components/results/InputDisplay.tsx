import { FaEdit, FaTimes } from "react-icons/fa";
import Button from "../common/Button";

type InputDisplayProps = {
   key: string,
   value: string,
   isOptional?: boolean,
   onCancel?: () => void,
   onEdit: () => void
}

function InputDisplay({ value, key, onEdit, isOptional = false, onCancel }: InputDisplayProps) {
   return (
      <div key={key} className="flex items-center pl-2 border-2 border-cyan-500 rounded-sm w-fit text-sm">
         <span className="mr-2 capitalize">{value}</span>
         <span className="w-px h-5 bg-cyan-700"></span>
         <Button
            text=""
            icon={<FaEdit />}
            onclick={onEdit}
            className="bg-transparent rounded-l-none rounded-r-sm px-0 py-0 hover:bg-gray-800"
         ></Button>
         {
            isOptional && (
               <>
                  <span className="w-px h-5 bg-cyan-700"></span>
                  <Button
                     text=""
                     icon={<FaTimes />}
                     onclick={onCancel}
                     className="bg-transparent rounded-l-none rounded-r-sm px-0 py-0 hover:bg-gray-800"
                  ></Button>
               </>
            )
         }
      </div>
   )
}

export default InputDisplay;