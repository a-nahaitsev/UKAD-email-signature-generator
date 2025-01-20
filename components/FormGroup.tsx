import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormGroupProps {
  label: string;
  id: string;
  type: string;
  value?: string;
  placeholder?: string;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  id,
  type,
  value,
  placeholder,
  accept,
  onChange,
}) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      name={id}
      value={value}
      placeholder={placeholder}
      accept={accept}
      onChange={onChange}
    />
  </div>
);

export default FormGroup;
