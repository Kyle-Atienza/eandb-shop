"use client";

import { TransitionLink } from "@/components/common/transition-link";
import { useUserStore } from "@/state/user";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export function Navbar() {
  const { user, signOut } = useUserStore();

  const container = useRef(null);

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
      <div className="navbar relative bg-secondary h-[70px] spaced-x">
        <div className="flex items-center justify-between h-full gap-spaced relative">
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
                className={` flex gap-spaced bg-light w-9 md:w-10 aspect-square items-center justify-center rounded-full transition-colors hover:bg-primary group`}
              >
                <div>
                  {user ? (
                    <i className="text-xl md:text-2xl text-primary bi bi-person-fill group-hover:text-light"></i>
                  ) : (
                    <i className="text-xl md:text-2xl bi bi-person"></i>
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
