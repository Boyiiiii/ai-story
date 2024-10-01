"use client";
import { NextUIProvider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "./_context/UserDetailContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }: { children: React.ReactNode }) {
  const [userDetail, setUserDetail] = useState<any>();
  const { user } = useUser();

  useEffect(() => {
    user && saveNewUserIfNotExist();
  }, [user]);
  const saveNewUserIfNotExist = async () => {
    const userRes = await db
      .select()
      .from(Users)
      .where(
        eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? "")
      );
    console.log(userRes);
    if (!userRes[0]) {
      const result = await db
        .insert(Users)
        .values({
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
        })
        .returning({
          userEmail: Users.userEmail,
          userName: Users.userName,
          credits: Users.credit,
        });
      setUserDetail(result[0]);
    } else {
      setUserDetail(userRes[0]);
    }
  };
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "" }}
      >
        <NextUIProvider>
          <Header />
          {children}
          <ToastContainer />
        </NextUIProvider>
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
