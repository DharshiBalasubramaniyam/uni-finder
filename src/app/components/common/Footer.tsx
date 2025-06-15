function Footer() {
   return (
      <footer className="w-full bg-cyan-950 p-2 text-sm">

         <p 
            className="text-center"
         >
            Copyright &copy; {new Date().getFullYear()} All Rights Reserved By 
            <br/> 
            <a    
               className="text-cyan-400 underline hover:text-cyan-600" 
               href="http://dharshi.vercel.app" 
               target="_blank"
            >
               DharshiB
            </a>
         </p>

      </footer>
   )
}

export default Footer;