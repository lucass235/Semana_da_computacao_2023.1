import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { User } from "@/types/User";
import CardMaterial from "@/components/material/CardMaterial";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import LinearLoader from "@/components/material/LinearLoader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loanding, setLoanding] = useState<boolean>(true);
  const [dataUsers, setDataUsers] = useState<User[]>([
    {
      id: "1",
      userName: "teste",
      email: "teste",
      age: "1",
    },
  ]);

  // pegar valores de uma api
  useEffect(() => {
    setLoanding(true);
    fetch("https://tolvk25ntd.execute-api.us-east-1.amazonaws.com/dev", {
      method: "GET",
      mode: "no-cors",
    })
      .then((data: any) => {
        console.log("data: ", data);
        if (data.body) {
          setDataUsers(data);
        }
        setLoanding(false);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  if (loanding) return <LinearLoader />;
  return (
    <>
      <Head>
        <title>Usuários</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              marginBottom: "50px",
              marginTop: "10px",
            }}
          >
            Clientes
          </h1>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {dataUsers.map((user) => (
              <CardMaterial key={user.id} {...user} />
            ))}
          </Grid>
        </div>
      </main>
    </>
  );
}
