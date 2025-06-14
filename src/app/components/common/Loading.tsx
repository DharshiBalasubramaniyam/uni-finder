import { CSSProperties } from "react";
import { MoonLoader } from "react-spinners";

const override: CSSProperties = {
   display: "block",
   margin: "0 auto",
   borderColor: "red",
};

function Loading() {
   return (
      <div className="w-full h-screen grid place-items-center">
         <div className="flex flex-col items-center justify-center gap-4">
            <MoonLoader
               color={"#ffffff"}
               loading={true}
               cssOverride={override}
               size={50}
               speedMultiplier={0.5}

               aria-label="Loading Spinner"
               data-testid="loader"
            />
         </div>
      </div>
   )
}

export default Loading;