import { TableDataType } from "@/app/types/Types";
import { FaTimes } from "react-icons/fa";
import Button from "../common/Button";
import MarkDownViewer from "../common/MarkDownViewer";

type EligibilityViewerProps = {
   detailView: TableDataType | null;
   detailsDisplay: string;
   setDetailsDisplay: (display: string) => void;
};

function EligibilityViewer({ detailView, detailsDisplay, setDetailsDisplay }: EligibilityViewerProps) {
   return (
      <div className={`details h-screen ${detailsDisplay} place-items-center w-full p-4 fixed top-0 left-0 bg-[rgba(0, 0, 0, 0.5)] z-60`}>
         <div className="w-full max-w-md min-h-60 max-h-10/12 overflow-y-scroll bg-white rounded p-4 text-black">
            <div className="flex items-center justify-between mb-4">
               <h3 className="font-blod underline uppercase">{detailView?.courseName}</h3>
               <Button
                  icon={<FaTimes />}
                  className="bg-red-500 hover:bg-red-600"
                  onclick={() => setDetailsDisplay("hidden")}
               />
            </div>
            <p className="mb-3 text-sm"><strong>Course Code:</strong> {String(detailView?.unicode).padStart(3, '0')}</p>
            <p className="mb-3 text-sm"><strong>University:</strong> {detailView?.university}</p>
            <p className="mb-3 text-sm"><strong>Z-Score:</strong> {detailView?.zscore}</p>
            <p className="mb-1 text-sm"><strong>Eligibility:</strong></p>
            {detailView && <MarkDownViewer course_code={detailView.courseCode} />}
         </div>
      </div>
   );
}

export default EligibilityViewer;