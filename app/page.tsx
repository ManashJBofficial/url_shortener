/**
 * Page component renders the main UI of the application.
 *
 * It displays the app header, url shortener form,
 * list of recently shortened urls, and auth status.
 *
 * Fetches previously shortened urls from localStorage
 * and dispatches them to Redux store on mount.
 *
 * Renders skeleton UI if no urls exist yet.
 */
"use client";

import Image from "next/image";
import background from "../public/gradient.png";
import { Toaster } from "@/components/ui/toaster";
import { Link1Icon } from "@radix-ui/react-icons";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FormInput } from "./components/FormInput";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPublicLinks } from "../redux/publicLinkSlice";
import { RootState } from "../redux/store";
import UrlCard from "./components/UrlCard";
import { Tooltip } from "@nextui-org/react";
import { copyTextToClipboard } from "../lib/utils/CopyToClipboard";
import NavBarComponent from "./components/NavBarComponent";
import SkeletonComponent from "./components/SkeletonComponent";

const Page = () => {
  const dispatch = useDispatch();
  const publicLinks = useSelector(
    (state: RootState) => state.publicLinks.publicLink
  );

  const { data: session } = useSession();

  const fetchDataFromLocalStorage = useCallback(() => {
    const storedData = localStorage.getItem("publicLinks");
    if (storedData) {
      const linksData = JSON.parse(storedData);
      dispatch(setPublicLinks(linksData));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, [fetchDataFromLocalStorage]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-50">
      <div className="absolute inset-0 z-0 ">
        <Image
          src={background}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="absolute inset-0  bg-white opacity-60 z-0"></div>
      <NavBarComponent signIn={signIn} signOut={signOut} session={session} />
      <div className="flex flex-col h-screen items-center justify-start  z-10 md:px-10">
        <div className="flex items-center justify-start mx-4 p-8 mb-4 pt-unit-40">
          <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-8 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
            Url Shortener
          </h1>
        </div>
        <FormInput />
        <Toaster />
        <div>
          {publicLinks && publicLinks.length > 0 ? (
            [...publicLinks]
              .reverse()
              .slice(0, 3)
              .map((e, index) => (
                <span key={`${e.id}-${index}`}>
                  <UrlCard
                    data={e}
                    width="width-sm"
                    visibility="hidden"
                    drop={false}
                  />
                </span>
              ))
          ) : (
            <div className="flex flex-col gap-3">
              <SkeletonComponent />
              <SkeletonComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
