import axios from "axios";
import Link from "next/link";
import React from "react";

const ApplyWithLinkdinButton = () => {
  const handleclick = () => {
    const clientid = "86avu4hi0glvz6";
    const clientsecret = "E3og2omMjbjGn4Es";
    const redirectUrl = "http://localhost:3001/auth/linkedin/callback";
    fetch(
      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientid}&redirect_uri=${redirectUrl}&state=foobar&scope=r_liteprofile%20r_emailaddress%20w_member_social`
    ).then((response) => {
      console.log(response);
    });
    // Exchange authorization code for access token
  };
  return (
    <div className="container mx-auto">
      <div className="mt-44 flex justify-center items-center">
        <button
          onClick={handleclick}
          className=" text-white px-4 py-2 rounded-lg bg-red-600 hover:opacity-90 focus:outline-none focus:ring focus:ring-orange-500"
        >
          Apply With Linkdin
        </button>
      </div>
    </div>
  );
};

export default ApplyWithLinkdinButton;

// const params = {
//   grant_type: "authorization_code",
//   code: AUTHORIZATION_CODE,
//   redirect_uri: "https://jobapplication-beta.vercel.app/",
//   client_id: "86avu4hi0glvz6",
//   client_secret: "E3og2omMjbjGn4Es",
// };

// axios
//   .post(
//     "https://www.linkedin.com/oauth/v2/accessToken",
//     JSON.stringify(params)
//   )
//   .then((response) => {
//     const access_token = response.data.access_token;

//     // Retrieve user's profile data
//     axios
//       .get("https://api.linkedin.com/v2/me", {
//         headers: { Authorization: `Bearer ${access_token}` },
//         params: {
//           projection:
//             "(id,firstName,lastName,profilePicture(displayImage~:playableStreams))",
//         },
//       })
//       .then((response) => {
//         const data = response.data;

//         // Parse the user's profile data
//         const profile = {
//           id: data.id,
//           firstName: data.firstName.localized.en_US,
//           lastName: data.lastName.localized.en_US,
//           email: data.emailAddress,
//           phone: data.phoneNumbers.values[0].phoneNumber,
//           picture:
//             data.profilePicture["displayImage~"].elements[0].identifiers[0]
//               .identifier,
//         };

//         // Use the user's profile data
//         console.log(profile);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   })
//   .catch((error) => {
//     console.error(error);
//   });
