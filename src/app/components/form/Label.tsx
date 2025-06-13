interface LabelProps {
   htmlFor: string;
   text: string
}

function Label({ htmlFor, text }: LabelProps) {
   return (
      <label htmlFor={htmlFor} className="block text-sm font-medium mb-2">
         {text}
      </label>
   )
}

export default Label;