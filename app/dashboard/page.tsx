"use client";
import NavBar from "../components/navBar";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      redirect("/login");
    }
    return () => {};
  }, [session]);

  return (
    <>
      <div>
        <NavBar signIn={signIn} signOut={signOut} session={session} />
      </div>
    </>
  );
};

export default Dashboard;
