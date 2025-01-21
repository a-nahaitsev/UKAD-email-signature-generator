import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FormDataProps } from "@/types";

interface FormGroupProps {
  label: string;
  id: string;
  type: string;
  value?: string;
  placeholder?: string;
  accept?: string;
  setFormData: React.Dispatch<React.SetStateAction<FormDataProps>>;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  id,
  type,
  value,
  placeholder,
  accept,
  setFormData,
}) => {
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          if (img.width > 80 || img.height > 80) {
            setError("Image dimensions must be 80x80 pixels or smaller.");
            return;
          }

          setFormData((prev) => ({
            ...prev,
            photo: reader.result as string,
          }));
        };
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        name={id}
        value={value}
        placeholder={placeholder}
        accept={accept}
        onChange={type === "file" ? handleFileChange : handleChange}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormGroup;
