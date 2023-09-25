"use client";
import NavBar from "../components/NavBar";
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
import FilterCard from "../components/FilterCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setItems } from "@/redux/itemSlice";

// interface Site {
//   id: string;
//   long_url: string;
//   short_code: string;
//   userIdNo: string;
//   created_at: Date;
// }

const Dashboard = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items.list);
  console.log("card list", items);
  const { data: session } = useSession();

  // const [siteList, setSiteList] = useState<Site[]>([]);
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

  Cookies.set("user_id", userId, { expires: 30 });

  const listdata = useCallback(async () => {
    const data = await listSites(userId);
    const newData = data.map((item) => {
      // Create a copy of the item without the created_at field
      const { created_at, ...newItem } = item;
      return newItem;
    });
    dispatch(setItems(newData));
    // setSiteList(data);
    return data;
  }, [userId, dispatch]);

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
          <div className="div">
            <FilterCard />
          </div>
          <div className="">
            {items &&
              items.map((e, index) => {
                return (
                  <span key={`${e.id}-${index}`}>
                    <UrlCard data={e} />
                  </span>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
