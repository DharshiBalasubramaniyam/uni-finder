'use client';
import { useRouter } from "next/navigation";
import Button from "../components/common/Button";

function Error() {
   const router = useRouter();
   return (
      <div className="w-full h-screen grid place-items-center">
         <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-lg text-gray-200">An unexpected error occurred. Please try again later.</p>
            <Button text="Try again" onclick={() => router.push("/")}/>
         </div>
      </div>
   )
}

export default Error;