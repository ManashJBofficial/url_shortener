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
import Cookies from "js-cookie";
import { getAuthUser } from "../serverAction/getAuthUser";

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
  const [userId, setUserId] = useState("");

  const storeUserId = useCallback(async () => {
    const email = session?.user?.email as string;
    const image_url = session?.user?.image as string;
    const regex = /^(https?:\/\/[^/]+\.com)/;
    const image_url_prefix = image_url?.match(regex)![0];
    const currentUser = await getAuthUser(email, image_url_prefix);
    const currentUserId = currentUser!.id;
    console.log("currentUserId in dashboard", currentUserId);
    setUserId(currentUserId);
    return currentUserId;
  }, [session]);

  Cookies.set("user_id", userId, { expires: 7 });

  const listdata = useCallback(async () => {
    const data = await listSites(userId);
    setSiteList(data);
    return data;
  }, [userId]);

  useEffect(() => {
    if (!session) {
      redirect("/login");
    }
    storeUserId();
    listdata();
    return () => {};
  }, [session, listdata, storeUserId]);

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
