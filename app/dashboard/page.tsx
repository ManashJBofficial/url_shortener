"use client";
import NavBarComponent from "../components/NavBarComponent";
import React, { useCallback, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import UrlCard from "../components/UrlCard";
import ModalForm from "../components/ModalForm";
import { Toaster } from "@/components/ui/toaster";
import { listSites } from "../serverAction/listSites";
import Cookies from "js-cookie";
import { getAuthUser } from "../serverAction/getAuthUser";
import FilterCard from "../components/FilterCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setLinks } from "@/redux/linkSlice";
import PaginationComponent from "../components/PaginationComponent";

const Dashboard = () => {
  const dispatch = useDispatch();
  const links = useSelector((state: RootState) => state.items.link);
  console.log("card list", links);
  const { data: session } = useSession();

  // const [siteList, setSiteList] = useState<Site[]>([]);
  const [userId, setUserId] = useState("");
  const [filterValue, setFilterValue] = useState("");

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

  const [page, setPage] = useState(1);
  const pageSize = 4; // Adjust this according to your needs
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / pageSize);

  const listdata = useCallback(async () => {
    const data = await listSites(userId, page, pageSize);
    setTotal(data.total);
    const newData = data.data.map((item) => {
      // Create a copy of the item without the created_at field
      const { created_at, ...newItem } = item;
      return newItem;
    });

    dispatch(setLinks(newData));
    return newData;
  }, [userId, dispatch, page, pageSize]);

  useEffect(() => {
    if (!session) {
      redirect("/login");
    }
    storeUserId();
    listdata();
    return () => {};
  }, [session, listdata, storeUserId]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <span
          key={i}
          className={page === i ? "pagination__selected" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }
    return pages;
  };

  return (
    <>
      <div className="flex items-center justify-evenly ">
        <NavBarComponent signIn={signIn} signOut={signOut} session={session} />
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
        <div className="flex  items-start justify-between flex-wrap">
          <div className="div mb-5">
            <FilterCard
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />
          </div>
          <div className="flex flex-col mb-16">
            {links &&
              links
                .filter((e) =>
                  e.short_code.toLowerCase().includes(filterValue.toLowerCase())
                )
                .map((e, index) => {
                  return (
                    <div key={`${e.id}-${index}`} className="mb-4 ">
                      <UrlCard
                        data={e}
                        width="responsive-width"
                        visibility="block"
                        dropdown="block"
                      />
                    </div>
                  );
                })}
            {links.length > 0 &&
              links.filter((e) =>
                e.short_code.toLowerCase().includes(filterValue.toLowerCase())
              ).length === 0 && (
                <p className="text-center flex items-center self-center mt-14">
                  No data available !
                </p>
              )}
          </div>
        </div>
      </div>
      <div className="flex justify-center fixed bottom-0 w-full bg-white py-4 bg-white-700 z-10">
        {/* <div className="pagination">
          <span
            onClick={() => handlePageChange(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀
          </span>
          {renderPagination()}
          <span
            onClick={() => handlePageChange(page + 1)}
            className={page < totalPages ? "" : "pagination__disable"}
          >
            ▶
          </span>
        </div> */}
        <div className="flex justify-center mt-4">
          <PaginationComponent
            currentPage={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
