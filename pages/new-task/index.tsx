import { Button, Input, Textarea, User } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

type TaskType = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  status: boolean;
};

function NewTask() {
  const [taskData, setTaskData] = useState<TaskType>({
    date: "",
    description: "",
    endTime: "",
    startTime: "",
    title: "",
    status: false,
  });

  const addTaskHandler = function () {
    const newTask = JSON.stringify(taskData);
    fetch("http://localhost:5000/tasks", {
      body: newTask,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTaskData({
      date: "",
      description: "",
      endTime: "",
      startTime: "",
      title: "",
      status: false,
    });
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-900">
      <div className="max-w-[768px] mx-auto w-full h-full p-5 flex flex-col">
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
            <Link className="text-palette-200 font-semibold" href="/tasks">
              Home
            </Link>
            <span className="w-0.5 h-5 bg-palette-300"></span>
            <Link className="text-palette-200 font-semibold" href="/new-task">
              New Task
            </Link>
          </div>
        </div>
        <div className=" my-auto">
          <h1 className="text-center text-4xl font-medium text-white">
            Add New Task
          </h1>
          <div className="grid grid-cols-12 gap-4 mt-6">
            <div className="col-span-6">
              <Input
                type="text"
                label="Title"
                value={taskData.title}
                onChange={(e) =>
                  setTaskData((prevData) => ({
                    ...prevData,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-span-6">
              <Input
                type="date"
                classNames={{
                  base: "h-full",
                  inputWrapper: "h-full",
                }}
                value={taskData.date}
                onChange={(e) =>
                  setTaskData((prevData) => ({
                    ...prevData,
                    date: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-span-6">
              <Input
                type="text"
                label="Start Time"
                value={taskData.startTime}
                onChange={(e) =>
                  setTaskData((prevData) => ({
                    ...prevData,
                    startTime: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-span-6">
              <Input
                type="text"
                label="End Time"
                value={taskData.endTime}
                onChange={(e) =>
                  setTaskData((prevData) => ({
                    ...prevData,
                    endTime: e.target.value,
                  }))
                }
              />
            </div>
            <div className="col-span-12">
              <Textarea
                label="Description"
                placeholder="Enter your description"
                value={taskData.description}
                onChange={(e) =>
                  setTaskData((prevData) => ({
                    ...prevData,
                    description: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="mt-4" color="danger" onClick={addTaskHandler}>
              Create Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTask;
