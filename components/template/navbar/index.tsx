"use client";

import { TransitionLink } from "@/components/common/transition-link";
import { BackButton } from "@/components/decorations/back";
import { useUserStore } from "@/state/user";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export function Navbar() {
  const { user, signOut } = useUserStore();

  const container = useRef(null);
  const pathname = usePathname();

  /* useGSAP(
    () => {
      gsap.to(".navbar", {
        transform: "translateY(0%)",
      });
    },
    { scope: container }
  ); */

  return (
    <div ref={container}>
      <div className="navbar fixed top-0 w-screen h-[100px] spaced-x">
        <div className="flex items-center justify-between h-full gap-spaced relative">
          <div>{pathname.includes("/product/") ? <BackButton /> : null}</div>
          {/* middle */}
          {/* <TransitionLink
            href="/"
            className="flex flex-col text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 nav-brand hover:text-primary transition-colors cursor-pointer"
          >
            <div className="text-3xl font-ranille ">E&B</div>
            <div className="font-gopher uppercase text-xs leading-[0.8em]">
              Farm
            </div>
          </TransitionLink> */}
          {/* left */}
          <div className="ml-auto">
            <TransitionLink href={user ? "/profile" : "/account/login"}>
              <div
                className={` flex gap-spaced bg-light w-14 aspect-square items-center justify-center rounded-full transition-colors hover:bg-primary group border-2 border-tertiary`}
              >
                <div>
                  {user ? (
                    <i className="text-xl md:text-xl text-primary bi bi-person-fill group-hover:text-light"></i>
                  ) : (
                    <i className="text-xl md:text-xl bi bi-person"></i>
                  )}
                </div>
              </div>
            </TransitionLink>
          </div>
        </div>
      </div>
    </div>
  );
}
