import gsap from "gsap";

export const animatePageIn = () => {
  const main = document.getElementById("main");

  if (main) {
    const tl = gsap.timeline();

    tl.set(main, {
      opacity: 0,
    }).to(main, {
      opacity: 1,
      duration: 1,
    });
  }
};
