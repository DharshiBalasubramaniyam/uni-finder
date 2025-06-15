function Header() {
   return (
      <header className="flex flex-col items-center justify-center p-3 fixed top-0 left-0 h-32 md:h-28 w-full bg-cyan-900 z-40">
         <h1 className="text-xl md:text-3xl font-bold text-center text-cyan-300 uppercase">Uni&nbsp;Finder - SRI LANKA</h1>
         <p className="text-sm md:text-xl text-center mt-2 font-semibold">Simplifying university admissions - Discover courses, View details, Download your list</p>
         <p className="text-xs mt-1 text-center">(Disclaimer: The information used in this site is extracted from <strong>University Admission Handbook - 24/25</strong>)</p>
      </header>
   )
}

export default Header;