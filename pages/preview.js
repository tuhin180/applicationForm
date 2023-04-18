import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
const Preview = () => {
  const router = useRouter();
  const formData = router.query.data
    ? JSON.parse(decodeURIComponent(router.query.data))
    : null;
  const { viewPdf, name, email, phone, link, selectedSkills, pdffile } =
    formData || {};
  const formRef = useRef();
  const handleApplicationForm = (e) => {
    e.preventDefault();
    const applicantData = {
      name: name,
      email: email,
      phone: phone,
      link: link,
      selectedSkills: selectedSkills,
      pdffile: pdffile,
    };

    const emaildata = { from_name: name, from_email: email };
    const form = formRef.current;
    form["applicantData"].value = JSON.stringify(applicantData);
    form["from_name"].value = name;
    form["from_email"].value = email;

    fetch("http://localhost:5000/applicationData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicantData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged == true) {
          emailjs
            .sendForm(
              "service_cy9slnb",
              "template_wzrwjpg",
              form,
              "Z8uZpc8Yg1J_DE4AP"
            )
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            );
          router.push("/acknowledge");
          alert("Application Submitted Successfully");
        }
        if (data.status === "error") {
          alert("Something went wrong");
        }
      });

    // email send
  };
  return (
    <div className="container mx-auto my-8">
      <form ref={formRef} onSubmit={handleApplicationForm}>
        <input type="hidden" name="applicantData" />
        <input type="hidden" name="from_name" />
        <input type="hidden" name="from_email" />
        <Link
          href="/"
          className="text-red-600 flex justify-center underline text-xl mb-8"
        >
          View Details
        </Link>

        <div className="flex w-11/12 mx-auto justify-center gap-x-14 my-8">
          <div className="flex flex-col justify-center items-center border p-6">
            <div className="h-16 w-16 relative rounded-full">
              <Image
                src="https://images.unsplash.com/photo-1628563694622-5a76957fd09c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt="Profile image"
                layout="fill"
                objectFit="cover"
                unoptimized
              />
            </div>
            <h1 className="mt-4 font-bold">{name}</h1>
            <h2 className="font-semibold">Software Engineer</h2>
          </div>

          <div className="border p-2 w-80 overflow-y-auto">
            <h1 className="font-bold">Selected Skills</h1>
            <ol type="1" className="list-decimal px-3">
              {selectedSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ol>
          </div>
        </div>

        <Link
          href="/"
          className="text-red-600 flex justify-center underline text-xl mb-6"
        >
          Uploaded CV
        </Link>

        <div className="my-6 w-4/5 mx-auto">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
            {viewPdf ? <Viewer fileUrl={viewPdf} /> : <p>no pdf</p>}
          </Worker>
        </div>

        <button
          type="submit"
          className="text-white w-1/4 mx-auto flex justify-center bg-red-600 rounded-md p-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Preview;
