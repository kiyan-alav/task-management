import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface LoginComp {
  usersData: {
    id: number;
    username: string;
    password: string;
  }[];
}

const Login: NextPage<LoginComp> = ({ usersData }) => {
  const route = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  console.log(usersData);

  const submitLoginHandler = function () {
    const acceptedUser = usersData.find(
      (user) => user.password === password && user.username === username
    );
    if (acceptedUser) {
      localStorage.setItem("userTasks", JSON.stringify(acceptedUser));
      route.replace("/tasks");
    } else {
      route.replace("/");
    }
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userTasks") as string);
    if (user) {
      route.replace("/tasks");
    } else {
      route.replace("/");
    }
  }, []);

  return (
    <section className="h-screen w-screen overflow-hidden flex items-center justify-center">
      <article className="bg-white rounded-lg shadow-md w-[400px] sm:w-[500px] px-4 py-8">
        <h1 className="text-3xl capitalize text-center my-4">
          welcome to task manager app
        </h1>
        <p className="my-4 text-center capitalize text-base font-normal">
          please login if you have username & password or create account from{" "}
          <Link href="/register" className="underline font-semibold uppercase">
            here
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <div>
            <Input
              variant="bordered"
              type="text"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="">
            <Input
              variant="bordered"
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Button
            className="bgGradient text-white text-base font-medium w-1/3 self-center"
            onClick={submitLoginHandler}
          >
            Login
          </Button>
        </div>
      </article>
    </section>
  );
};

export default Login;

export async function getServerSideProps() {
  try {
    // const response = await axios.get("http://localhost:5000/users");
    // console.log("11111111111111111111111111111111111");
    // console.log(response.data);

    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();

    return {
      props: {
        usersData: data,
      },
    };
  } catch (error) {
    return {
      props: {
        usersData: [],
      },
    };
  }
}
