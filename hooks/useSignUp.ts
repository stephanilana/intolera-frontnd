import axios from "axios";

type SignUpShape = {
  name: string;
  email: string;
  certificate: string;
  password: string;
};

export default async function handleSignUp(props: SignUpShape) {
  const url =
    "http://localhost:3001/" +
    // process.env.NEXT_PUBLIC_API_URL_HML
    "users/";
  const response = {
    status: 200,
    data: {
      name: "Filipe Oliveira",
      email: "lipeoliver@pepepe.com",
      certificate: "certificado uau",
      password: "$2b$10$pU2cb41F1VsO9q1F8h27yuZjLdzxTb.BJ9xMr8e4eTM81L.hN2nHW",
      created_at:
        "Fri Jun 21 2024 22:25:29 GMT+0000 (Coordinated Universal Time)",
      updated_at:
        "Fri Jun 21 2024 22:25:29 GMT+0000 (Coordinated Universal Time)",
      deleted_at: "",
      _id: "6675fdd98c12597c26c23e84",
      __v: 0,
    },
  };

  //  const response await axios.post(url, props, {
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  // });

  return response.status;
}
