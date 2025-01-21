"use client";

import { useState } from "react";
import Preview from "@/components/Preview";
import { FormDataProps } from "@/types";
import Form from "@/components/Form";

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormDataProps>({
    firstName: "",
    lastName: "",
    phoneLabel: "",
    phoneValue: "",
    position: "",
    bookACallLinkName: "",
    bookACallLinkValue: "",
    photo: "",
    useUrl: true,
  });

  return (
    <>
      <main className="flex flex-col gap-10 ">
        <h1 className="text-4xl font-bold my-4 text-center">
          UKAD Email Signature Generator
        </h1>
        <div className="grid lg:grid-cols-[1fr_minmax(650px,_1fr)] gap-4 h-full">
          <Form formData={formData} setFormData={setFormData} />
          <Preview formData={formData} />
        </div>
      </main>
      <footer className="text-center text-sm mt-5">UKAD 2025</footer>
    </>
  );
};

export default App;
