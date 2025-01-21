import React, { useState } from "react";
import FormGroup from "./FormGroup";
import { FormDataProps } from "@/types";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface Form {
  formData: FormDataProps;
  setFormData: React.Dispatch<React.SetStateAction<FormDataProps>>;
}

const Form: React.FC<Form> = ({ formData, setFormData }) => {
  const [useUrl, setUseUrl] = useState(true);

  const handleToggle = (checked: boolean) => {
    setUseUrl(checked);
    setFormData((prev) => ({ ...prev, photo: "" }));
  };

  return (
    <section className="flex flex-col gap-3 p-2 border border-gray-100 rounded-lg shadow-lg">
      <span className="text-2xl border-b p-1 font-medium tracking-wider">
        Fill in Your Information
      </span>
      <form className="space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <FormGroup
            label="First Name"
            id="firstName"
            type="text"
            placeholder="Enter your first name (e.g., John)"
            value={formData.firstName}
            setFormData={setFormData}
          />
          <FormGroup
            label="Last Name"
            id="lastName"
            type="text"
            placeholder="Enter your last name (e.g., Doe)"
            value={formData.lastName}
            setFormData={setFormData}
          />
        </div>

        <FormGroup
          label="Job Title/Position"
          id="position"
          type="text"
          placeholder="Describe your role (e.g., Software Developer at UKAD)"
          value={formData.position}
          setFormData={setFormData}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <FormGroup
            label="Phone Label"
            id="phoneLabel"
            type="text"
            placeholder="Label for your phone (e.g., Phone Number)"
            value={formData.phoneLabel}
            setFormData={setFormData}
          />
          <FormGroup
            label="Phone Number"
            id="phoneValue"
            type="tel"
            placeholder="Your phone number (e.g., +38 (099) 99 99 999)"
            value={formData.phoneValue}
            setFormData={setFormData}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <FormGroup
            label="Call Scheduling Link Name"
            id="bookACallLinkName"
            type="text"
            placeholder="Name for your link (e.g., Calendly)"
            value={formData.bookACallLinkName}
            setFormData={setFormData}
          />
          <FormGroup
            label="Call Scheduling Link"
            id="bookACallLinkValue"
            type="text"
            placeholder="URL (e.g., https://calendly.com/john-doe)"
            value={formData.bookACallLinkValue}
            setFormData={setFormData}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Switch
              id="imageToggle"
              checked={useUrl}
              onCheckedChange={handleToggle}
            />
            <Label htmlFor="imageToggle" className="text-sm font-medium">
              {useUrl
                ? "Use an Image URL (recommended for email clients like Gmail)"
                : "Upload an Image File (for email clients that support embedded HTML)"}
              :
            </Label>
          </div>

          {useUrl ? (
            <FormGroup
              label="Profile Photo URL (recommended: square image 64x64 px)"
              id="photo"
              type="text"
              placeholder="Example: https://i.ibb.co/H2FjZW5/avatar-64.png"
              value={formData.photo}
              setFormData={setFormData}
            />
          ) : (
            <FormGroup
              label="Upload Profile Photo (recommended: square image 64x64 px)"
              id="photo"
              type="file"
              accept="image/*"
              setFormData={setFormData}
            />
          )}
        </div>
      </form>
    </section>
  );
};

export default Form;
