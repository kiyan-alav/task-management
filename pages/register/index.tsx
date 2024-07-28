import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Register() {
  const route = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");

  const submitRegisterHandler = async function () {
    if (password === rePassword) {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        route.push("/");
      }
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
      <article className="bg-white rounded-lg shadow-md w-[400px] sm:w-[500px] px-4 py-8">
        <h1 className="text-3xl capitalize text-center my-4">
          welcome to task manager app
        </h1>
        <p className="my-4 text-center capitalize text-base font-normal">
          please enter your information. If you have account please login from{" "}
          <Link href="/" className="underline font-semibold uppercase">
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
          <div className="">
            <Input
              variant="bordered"
              type="password"
              label="Re-enter Password"
              onChange={(e) => setRePassword(e.target.value)}
              value={rePassword}
            />
          </div>
          <Button
            className="bgGradient text-white text-base font-medium w-1/3 self-center"
            onClick={submitRegisterHandler}
          >
            Register
          </Button>
        </div>
      </article>
    </div>
  );
}

export default Register;
