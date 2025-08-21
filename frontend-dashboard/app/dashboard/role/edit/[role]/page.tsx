import React from "react";
import EditForm from "./EditForm";

const page = async ({ params }: { params: Promise<{ role: string }> }) => {
  const { role } = await params;
  console.log("Role to edit:", role);
  return <EditForm role={role} />;
};

export default page;
