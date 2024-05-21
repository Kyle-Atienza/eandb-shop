"use client";

import { HeaderOne } from "@/components/common/header";
import { Label } from "@/components/common/label";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname.includes("login");

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-lg border-2 border-light flex-1 flex flex-col h-fit">
        <div className="flex flex-col lg:flex-row">
          <div className="bg-light spaced">
            <HeaderOne className="text-tertiary">
              {pathname.replace("/account/", "")}
            </HeaderOne>
          </div>
          <Link
            href={`/account/${isLogin ? "register" : "login"}`}
            className="flex-1 hover:bg-primary text-light flex items-center justify-center transition-colors spaced-y"
          >
            <Label>
              {isLogin ? "Create an account" : "Log in your account"}
            </Label>
          </Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
