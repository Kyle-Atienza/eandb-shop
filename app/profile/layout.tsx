"use client";

import { SimpleButton } from "@/components/common/button";
import { HeaderOne } from "@/components/common/header";
import { useUserStore } from "@/state/user";
import { usePathname, useRouter } from "next/navigation";

interface SideNavButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

function SideNavButton({ children, active, ...rest }: SideNavButtonProps) {
  return (
    <SimpleButton
      className={`text-sm !rounded-none text-start text-light transition-colors ${
        active ? "bg-secondary !text-dark" : ""
      }`}
      {...rest}
    >
      {children}
    </SimpleButton>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useUserStore();

  return (
    <div className="mt-[50px]">
      <HeaderOne>Hi {user?.name} ✨</HeaderOne>
      <div className="grid grid-cols-[200px_1fr] gap-spaced spaced-t">
        <div className="flex flex-col overflow-hidden border-2 rounded-md border-secondary h-fit">
          <SideNavButton
            active={pathname === "/profile"}
            onClick={() => router.push("/profile")}
          >
            Account Overview
          </SideNavButton>
          <SideNavButton
            active={pathname.includes("/profile/details")}
            onClick={() => router.push("/profile/details")}
          >
            Personal Info
          </SideNavButton>
          <SideNavButton
            active={pathname.includes("/profile/address")}
            onClick={() => router.push("/profile/address")}
          >
            Address Book
          </SideNavButton>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
