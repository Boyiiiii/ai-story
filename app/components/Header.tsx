"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { UserButton, useUser } from "@clerk/nextjs";
const Header = () => {
  const MenuList = [
    { name: "Home", path: "/" },
    { name: "Create Story", path: "/create-story" },
    { name: "Explore Stories", path: "/explore" },
    { name: "Contact", path: "/contact" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const { user, isSignedIn } = useUser();
  return (
    <Navbar maxWidth="full" onMenuOpenChange={setIsOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
          <h2 className="font-bold text-2xl text-primary ml-3">
            Story Sky Site
          </h2>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden sm:flex">
        {MenuList.map((i, index) => (
          <NavbarItem
            key={index}
            className="text-xl text-primary font-medium hover:underline mx-8"
          >
            <Link href={i.path}>{i.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <Link href={"/dashboard"}>
          <Button color="primary">
            {isSignedIn ? "Dashboard" : "Get Started!"}
          </Button>
        </Link>
        <UserButton />
      </NavbarContent>
      <NavbarMenu>
        {MenuList.map((i, index) => (
          <NavbarItem
            key={index}
            className="text-xl text-primary font-medium hover:underline mx-8"
          >
            <Link href={i.path}>{i.name}</Link>
          </NavbarItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
