"use client";
import React, { useEffect, useState } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";

interface NavBarProps {
  signIn: () => void;
  signOut: () => void;
  session?: any;
}
export default function NavBar({ signOut, session }: NavBarProps) {
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (session) {
      setAvatar(session.user.image);
      setUserName(session.user.name);
      setUserEmail(session.user.email);
    }
    return () => {};
  }, [session, pathname]);
  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <p className="font-bold text-inherit">SHORTY</p>
        </NavbarBrand>

        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            {session ? (
              pathname === "/" ? (
                <Button
                  type="button"
                  radius="full"
                  color="primary"
                  className=""
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </Button>
              ) : (
                <DropdownTrigger>
                  <Avatar
                    id="avatar_id"
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={userName}
                    size="sm"
                    src={avatar}
                  />
                </DropdownTrigger>
              )
            ) : (
              <>
                <Button
                  type="button"
                  radius="full"
                  color="primary"
                  className=""
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
              </>
            )}

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">{userName}</p>
                <p className="font-normal text-gray-500">{userEmail}</p>
              </DropdownItem>
              <DropdownItem key="settings" textValue="">
                My Settings
              </DropdownItem>
              <DropdownItem key="team_settings" textValue="">
                Team Settings
              </DropdownItem>
              <DropdownItem key="analytics" textValue="">
                Analytics
              </DropdownItem>
              <DropdownItem key="system" textValue="">
                System
              </DropdownItem>
              <DropdownItem key="configurations" textValue="">
                Configurations
              </DropdownItem>
              <DropdownItem key="help_and_feedback" textValue="">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                textValue=""
                color="danger"
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
}
