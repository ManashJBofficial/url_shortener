"use client";
import NavBar from "../components/navBar";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import UrlCard from "../components/UrlCard";
import ModalForm from "../components/ModalForm";

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
      <NavBar signIn={signIn} signOut={signOut} session={session} />

      <div className="flex flex-row justify-around items-center h-36 bg-green-100">
        <div className="text-2xl text-gray-600">My Links</div>

        <div className="">
          <ModalForm />
        </div>
      </div>
      <div className="bg-teal-200 h-screen">
        <div className="">
          <UrlCard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
