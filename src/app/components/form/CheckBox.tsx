interface CheckBoxProps {
  id: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function CheckBox({ id, value, onChange, required }: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={value}
      onChange={onChange}
      className=""
      required={required}
    />
  );

}

export default CheckBox;