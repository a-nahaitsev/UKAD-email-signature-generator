import React from "react";
import FormGroup from "./FormGroup";
import { FormDataProps } from "@/types";

interface Form {
  formData: FormDataProps;
  setFormData: React.Dispatch<React.SetStateAction<FormDataProps>>;
}

const Form: React.FC<Form> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: FormDataProps) => ({
      ...prev,
      [name]: value,
    }));
  };

  // USING UPLOAD.TS

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();

  //   const file = e.target.files?.[0];

  //   if (!file) return;

  //   const formData1 = new FormData();
  //   formData1.append("file", file);

  //   try {
  //     const res = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData1,
  //     });
  //     const data = await res.json();

  //     if (data.error) {
  //       console.error(data.error);
  //     } else {
  //       setFormData((prev: FormDataProps) => ({
  //         ...prev,
  //         photo: data.filePath,
  //       }));
  //       console.log("File uploaded successfully", data);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result as string,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="flex flex-col gap-3 p-2 border border-gray-100 rounded-lg shadow-lg">
      <span className="text-2xl border-b p-1 font-medium tracking-wider">
        Fill in your data
      </span>
      <form className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <FormGroup
            label="First Name"
            id="firstName"
            type="text"
            placeholder="Example: John"
            value={formData.firstName}
            onChange={handleChange}
          />
          <FormGroup
            label="Last Name"
            id="lastName"
            type="text"
            placeholder="Example: Doe"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <FormGroup
          label="Position"
          id="position"
          type="text"
          placeholder="Example: Developer at UKAD"
          value={formData.position}
          onChange={handleChange}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <FormGroup
            label="Phone Number Label"
            id="phoneLabel"
            type="text"
            placeholder="Example: Phone Number"
            value={formData.phoneLabel}
            onChange={handleChange}
          />
          <FormGroup
            label="Phone Number Value"
            id="phoneValue"
            type="tel"
            placeholder="Example: +38 (099) 99 99 999"
            value={formData.phoneValue}
            onChange={handleChange}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <FormGroup
            label="Book A Call Link Name"
            id="bookACallLinkName"
            type="text"
            placeholder="Example: Calendly"
            value={formData.bookACallLinkName}
            onChange={handleChange}
          />
          <FormGroup
            label="Book A Call Link Value"
            id="bookACallLinkValue"
            type="text"
            placeholder="Example: https://calendly.com/john-doe/ukad"
            value={formData.bookACallLinkValue}
            onChange={handleChange}
          />
        </div>

        <FormGroup
          label="Photo (recommended: square image 64x64 px)"
          id="photo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </form>
    </section>
  );
};

export default Form;
