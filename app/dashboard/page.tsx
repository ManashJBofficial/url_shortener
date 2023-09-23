"use client";
import NavBar from "../components/navBar";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import UrlCard from "../components/UrlCard";
import ModalForm from "../components/ModalForm";
import DataTable from "../components/DataTable";
import { Toaster } from "@/components/ui/toaster";

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
      <div className="flex items-center justify-evenly ">
        <NavBar signIn={signIn} signOut={signOut} session={session} />
      </div>
      <div className="flex items-center justify-between h-36 w-full bg-green-100">
        <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
          <div className="flex items-center justify-between">
            <div className="text-2xl text-gray-600">My Links</div>
            <div className="">
              <ModalForm />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
      <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 py-12">
        <div className="flex  items-start justify-between">
          <div className="div">cards 1</div>
          <div className="div">
            <UrlCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
