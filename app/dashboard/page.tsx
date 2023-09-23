"use client";
import NavBar from "../components/navBar";
import React, { useCallback, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import UrlCard from "../components/UrlCard";
import ModalForm from "../components/ModalForm";
import DataTable from "../components/DataTable";
import { Toaster } from "@/components/ui/toaster";
import { listSites } from "../serverAction/listSites";

interface Site {
  id: string;
  long_url: string;
  short_code: string;
  userIdNo: string;
  created_at: Date;
}

const Dashboard = () => {
  const { data: session } = useSession();
  const [siteList, setSiteList] = useState<Site[]>([]);

  const listdata = useCallback(async () => {
    const data = await listSites("3cc1ba3c-c24a-4260-a9d0-604139d438c0");
    setSiteList(data);
    return data;
  }, []);
  useEffect(() => {
    if (!session) {
      redirect("/login");
    }
    listdata();

    return () => {};
  }, [session, listdata]);
  console.log("siteList in state", siteList);
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
            {/* <UrlCard /> */}
            {siteList?.map((e) => {
              return <span key={e.id}>{e.long_url}</span>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
