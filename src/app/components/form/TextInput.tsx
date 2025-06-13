interface InputProps {
  type?: string;
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

function TextInput({ type = 'text', id, value, onChange, placeholder, required }: InputProps) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded"
      placeholder={placeholder}
      required={required}
    />
  );

}

export default TextInput;