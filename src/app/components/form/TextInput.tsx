interface InputProps {
  type?: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

function TextInput({ type = 'text', id, value, onChange, placeholder, required, ref }: InputProps) {
  return (
    <input
      type={type}
      id={id}
      ref={ref}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded outline-none hover:border-gray-500 transition-all"
      placeholder={placeholder}
      required={required}
    />
  );

}

export default TextInput;