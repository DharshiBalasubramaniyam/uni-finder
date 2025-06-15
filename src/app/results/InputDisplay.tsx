import { FaEdit } from "react-icons/fa";
import Button from "../components/common/Button";

type InputDisplayProps = {
   key: string,
   value: string,
   onEdit: () => void
}

function InputDisplay({value, key, onEdit}: InputDisplayProps) {
   return (
      <div key={key} className="flex items-center pl-2 border-2 border-blue-500 rounded-sm w-fit text-sm">
         <span className="mr-2 capitalize">{value}</span>
         <span className="w-px h-5 bg-blue-700"></span>
         <Button
            text=""
            icon={<FaEdit />}
            onclick={onEdit}
            className="bg-transparent rounded-l-none rounded-r-sm px-0 py-0 hover:bg-gray-800"
         ></Button>
      </div>
   )
}

export default InputDisplay;