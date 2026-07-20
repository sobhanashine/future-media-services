"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MotionOrchestrator() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-reveal]",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 22 },
          {
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-project-media]").forEach((media) => {
        const image = media.querySelector("img");
        if (!image) return;

        gsap.fromTo(
          image,
          { yPercent: -2.5, scale: 1.035 },
          {
            yPercent: 2.5,
            scale: 1.035,
            ease: "none",
            scrollTrigger: {
              trigger: media,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });

      const processRoute = document.querySelector<HTMLOListElement>("[data-process-route]");
      if (processRoute) {
        const markers = processRoute.querySelectorAll<HTMLElement>(".process-list__marker");
        const cards = processRoute.querySelectorAll<HTMLElement>("article");

        ScrollTrigger.create({
          trigger: processRoute,
          start: "top 78%",
          once: true,
          onEnter: () => {
            processRoute.classList.add("is-route-animated");
            gsap.timeline()
              .fromTo(markers, { autoAlpha: 0, scale: 0.55 }, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.46,
                stagger: 0.13,
                ease: "back.out(1.7)",
              }, 0.16)
              .fromTo(cards, { autoAlpha: 0, y: 26 }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.62,
                stagger: 0.11,
                ease: "power3.out",
                clearProps: "transform,opacity,visibility",
              }, 0.3);
          },
        });
      }
    });

    return () => context.revert();
  }, []);

  return null;
}
