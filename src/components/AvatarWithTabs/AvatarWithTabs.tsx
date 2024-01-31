"use client";
import { Avatar } from "@/components";
import { useRegister } from "@/shared/hooks/useRegister";
import { Tab, Tabs } from "@mui/material";

import Image from "next/image";
import { useState } from "react";

export const AvatarWithTabs = ({
  size = "small",
  activeTab,
  handleChangeTab,
}: {
  src?: string;
  size?: "medium" | "small" | "normal";
  activeTab: number;
  handleChangeTab: (event: any, tab: number) => void;
}) => {
  const { user } = useRegister();
  const { handleLogoutUser } = useRegister()
  return (
    <div className=" hidden items-center p-6  md:block border-r-[1px] border-[#d9cff2] ">
      <div className="w-250 h-250 rounded-full bg-background p-1 bg-gradient">
        <Avatar size={size} src={user?.imagem} />
      </div>
      <Tabs
        orientation="vertical"
        className="mt-2"
        value={activeTab}
        onChange={handleChangeTab}
      >
        <Tab
          value={0}
          icon={
            <Image
              src={"/ticket-black.svg"}
              alt="Ticket Icon"
              width={24}
              height={24}
            />
          }
          iconPosition="start"
          label="Meus Ingressos"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%",
            justifyContent: "start",
          }}
        />
        <Tab
          value={1}
          icon={
            <Image
              src={"/profile.svg"}
              alt="Ticket Icon"
              width={24}
              height={24}
            />
          }
          iconPosition="start"
          label="Meu Perfil"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%",
            justifyContent: "start",
          }}
        />
        <Tab
          value={2}
          icon={
            <Image
              src={"/logout.svg"}
              alt="Ticket Icon"
              width={24}
              height={24}
            />
          }
          iconPosition="start"
          onClick={handleLogoutUser}
          label="Sair"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%",
            justifyContent: "start",
          }}
        />
      </Tabs>
    </div>
  );
};
