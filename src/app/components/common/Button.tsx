type ButtonProps = {
   type?: "button" | "submit" | "reset";  
   text?: string;
   onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
   className?: string;
   icon?: React.ReactNode;
};

function Button({ type = "button", text, onclick, className, icon }: ButtonProps) {
   return (
      <button
         type={type}
         className= {`flex gap-2 items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className} cursor-pointer`}
         onClick={onclick}
      >
         {icon || ""}
         <span className={`${icon ? "hidden md:inline" : ""}`}>{text}</span>
      </button>
   )
}

export default Button;