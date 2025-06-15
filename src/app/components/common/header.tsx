function Header() {
   return (
      <header className="flex flex-col items-center justify-center p-3 fixed top-0 left-0 h-32 md:h-28 w-full bg-blue-900">
         <h1 className="text-xl md:text-4xl font-bold text-center">Welcome to Uni Finder</h1>
         <p className="text-sm md:text-xl text-center mt-1">Simplifying university admissions - Discover courses, View details, Download your list</p>
         <p className="text-xs mt-1 text-center">(Disclaimer: The below information are extracted from <strong>University Admission Handbook - 24/25</strong>)</p>
      </header>
   )
}

export default Header;