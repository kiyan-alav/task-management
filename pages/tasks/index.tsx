import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Dashboard() {
  const route = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userTasks") as string);
    if (user) {
      route.replace("/tasks");
    } else {
      route.replace("/");
    }
  }, []);

  return <div>Dashboard</div>;
}

export default Dashboard;
