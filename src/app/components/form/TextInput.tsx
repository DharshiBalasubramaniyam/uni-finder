interface InputProps {
  type?: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  className?: string
}

function TextInput({ type = 'text', id, value, onChange, placeholder, required, ref, className }: InputProps) {
  return (
    <input
      type={type}
      id={id}
      ref={ref}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border-2 border-gray-300 rounded outline-none hover:border-cyan-400 transition-all focus:border-cyan-500 focus:bg-cyan-950 ${className}`}
      placeholder={placeholder}
      required={required}
    />
  );

}

export default TextInput;