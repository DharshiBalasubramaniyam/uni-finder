"use client"
import { useRouter } from "next/navigation";
import Button from "./components/common/Button";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";

function NotFound() {
   const router = useRouter()
   return (
      <main>
         <Header />
         <div className="h-screen w-full flex items-center justify-center gap-2 flex-col">
            <h1 className="text-4xl md:text-9xl font-bold">404</h1>
            <p className="text-xl md:text-3xl mb-3">Oops, Page not found!</p>
            <Button
               text="Go Home"
               type="button"
               onclick={() => router.push("/")}
            />
         </div>
         <Footer />
      </main>
   )
}

export default NotFound;