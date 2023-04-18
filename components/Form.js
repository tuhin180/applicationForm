import { useRouter } from "next/router";

import React, { useState } from "react";
const skills = ["PHP", "Python", "SQL", "CSS", "HTML5", "JavaScript", "React"];
const Form = () => {
  const router = useRouter();
  //  checkbox  State
  const [selectedSkills, setSelectedSkills] = useState([]);
  const handleCheckboxChange = (e) => {
    const selectSkills = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedSkills([...selectedSkills, selectSkills]);
    } else {
      setSelectedSkills(
        selectedSkills.filter((skill) => skill !== selectSkills)
      );
    }
  };

  // file State
  const [pdffile, setPdfFile] = useState();
  const [viewPdf, setViewPdf] = useState(null);
  const fileType = "application/pdf";
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
      alert("Selected file is too large. Maximum allowed size is 2MB.");
      return;
    }

    setPdfFile(file);
    if (file) {
      if (file && fileType.includes(file.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          setViewPdf(e.target.result);
        };
      }
    } else {
      alert("select proper file");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const link = form.link.value;

    const formdatas = {
      name: name,
      email: email,
      phone: phone,
      link: link,
      selectedSkills: selectedSkills,
      pdffile: pdffile,
      viewPdf: viewPdf,
    };

    const formDataString = encodeURIComponent(JSON.stringify(formdatas));
    router.push(`/preview?data=${formDataString}`);
  };

  return (
    <div className="my-16">
      <div className="w-1/2 mx-auto border-[1px] border-neutral-700 rounded-3xl ">
        <div className="p-8">
          <h1 className="text-red-500 font-medium text-xl">
            Apply for position
          </h1>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-6">
              <div className="flex gap-7">
                <p className="flex ">
                  Name <span className="text-red-400">*</span>
                </p>
                <input
                  type="text"
                  name="name"
                  placeholder="Type Your Full Name"
                  className=" focus:outline-none border px-2 border-neutral-700 rounded-md p-1 w-full"
                  required
                />
              </div>
              <div className="flex gap-8 ">
                <p className="flex ">
                  Email <span className="text-red-400">*</span>
                </p>
                <input
                  type="email"
                  name="email"
                  placeholder="Type a valid Email"
                  className=" focus:outline-none border px-2 border-neutral-700 rounded-md p-1 w-full"
                  required
                />
              </div>
              <div className="flex gap-7 ">
                <p className="flex ">
                  Phone <span className="text-red-400">*</span>
                </p>
                <input
                  type="number"
                  name="phone"
                  placeholder="Type a valid Number e.g.0181234587"
                  className=" focus:outline-none border px-2 border-neutral-700 rounded-md p-1 w-full"
                  required
                />
              </div>
              <div className="flex gap-5 ">
                <p className="flex ">
                  Linkdin <span className="text-red-400">*</span>
                </p>
                <input
                  type="text"
                  name="link"
                  placeholder="Paste Your Linkdin profile"
                  className=" focus:outline-none border px-2 border-neutral-700 rounded-md p-1 w-full"
                  required
                />
              </div>
              <div className="flex gap-8">
                <p className="flex ">
                  Select you skills <span className="text-red-400">*</span>
                  <b className=" text-sm font-normal">
                    (You have to select a minimum of one skills to submit)
                  </b>
                </p>
              </div>
              {skills.map((skill, index) => (
                <div className="flex gap-3" key={index}>
                  <input
                    type="checkbox"
                    value={skill}
                    onChange={handleCheckboxChange}
                    id="skilname"
                  />
                  <label htmlFor="skilname">{skill} </label>
                </div>
              ))}
              <div className="flex gap-8">
                <p className="flex">
                  Cv(pdf format) <span className="text-red-400">*</span>
                </p>
                <input
                  type="file"
                  title="pdf"
                  accept=".pdf"
                  onChange={handleFile}
                />
              </div>
              <p>
                (file size limit is <span className="text-red-600">2MB</span> )
              </p>
              <input
                className="mt-4 p-2 bg-red-600  w-1/2 mx-auto text-center text-white rounded-sm"
                type="submit"
                value="Preview"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
