type ButtonProps = {
   type?: "button" | "submit" | "reset";  
   text: string;
   onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
   className?: string;
};

function Button({ type = "button", text, onclick, className }: { type?: "button" | "submit" | "reset", text: string, onclick: (e: React.MouseEvent<HTMLButtonElement>) => void, className?: string }) {
   return (
      <button
         type={type}
         className= {`px-7 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
         onClick={onclick}
      >
         {text}
      </button>
   )
}

export default Button;