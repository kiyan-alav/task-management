import { Tab, Tabs, User } from "@nextui-org/react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface DashboardType {
  tasks: {
    id: number;
    title: string;
    description: string;
    date: string;
    endTime: string;
    startTime: string;
    status: boolean;
  }[];
}

const Dashboard: NextPage<DashboardType> = ({ tasks }) => {
  const route = useRouter();

  const [selected, setSelected] = useState<string | number>("my-tasks");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userTasks") as string);
    if (user) {
      route.replace("/tasks");
    } else {
      route.replace("/");
    }
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-palette-200">
      <div className=" max-w-[768px] mx-auto w-full rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div className="">
            <User
              name="Jane Doe"
              description="Product Designer"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
          </div>
          <div className="flex items-center gap-8">
            <Link className="text-palette-300 font-semibold" href="/tasks">
              Home
            </Link>
            <span className="w-0.5 h-5 bg-palette-300"></span>
            <Link className="text-palette-300 font-semibold" href="/new-task">
              New Task
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-8">
          <h1 className="font-semibold text-4xl text-palette-300">
            Hello Kiyan
          </h1>
          <p className="font-semibold text-xl text-palette-300/50">
            Have a nice day.
          </p>
        </div>
        <div className="mt-8">
          <Tabs
            color="secondary"
            aria-label="Tabs colors"
            radius="full"
            selectedKey={selected}
            onSelectionChange={setSelected}
            classNames={{
              base: "",
              tabList: "bg-transparent",
              tab: "py-6 px-6",
              panel: "bg-red-500",
            }}
          >
            <Tab key="my-tasks" title="My Tasks" />
            <Tab key="in-progress" title="In Progress" />
            <Tab key="completed" title="Completed" />
          </Tabs>
          <div className="grid grid-cols-12 gap-4 mt-4">
            {selected === "my-tasks" &&
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="bgGradient col-span-4 row-span-12 rounded-xl px-3 py-5 flex flex-col justify-between"
                >
                  <h3 className="text-white font-medium">{task.title}</h3>
                  <p className="text-white font-medium text-xl">
                    {task.description}
                  </p>
                  <span className="text-white font-normal text-base">
                    {task.date} / {task.startTime} - {task.endTime}
                  </span>
                </div>
              ))}
            {selected === "in-progress" &&
              tasks
                .filter((task) => !task.status)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bgGradient col-span-4 row-span-12 rounded-xl px-3 py-5 flex flex-col justify-between"
                  >
                    <h3 className="text-white font-medium">{task.title}</h3>
                    <p className="text-white font-medium text-xl">
                      {task.description}
                    </p>
                    <span className="text-white font-normal text-base">
                      {task.date} / {task.startTime} - {task.endTime}
                    </span>
                  </div>
                ))}
            {selected === "completed" &&
              tasks
                .filter((task) => task.status)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bgGradient col-span-4 row-span-12 rounded-xl px-3 py-5 flex flex-col justify-between"
                  >
                    <h3 className="text-white font-medium">{task.title}</h3>
                    <p className="text-white font-medium text-xl">
                      {task.description}
                    </p>
                    <span className="text-white font-normal text-base">
                      {task.date} / {task.startTime} - {task.endTime}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

export async function getStaticProps() {
  try {
    const response = await fetch("http://localhost:5000/tasks");
    const data = await response.json();

    return {
      props: {
        tasks: data,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    return {
      props: {
        tasks: [],
      },
    };
  }
}
