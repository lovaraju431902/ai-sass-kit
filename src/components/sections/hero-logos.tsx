import Image from "next/image";
import React from "react";
import { RevealAnimation } from "@/components/animation/RevealAnimation";

export default function HeroLogos() {
  return (
    <div className="wrapper">
      <div className="max-w-[1016px] relative z-30 mx-auto pt-14 pb-16">
        <RevealAnimation delay={0.1}>
          <p className="text-center text-white/50 text-lg font-medium">
            Trusted by worlds largest companies including...
          </p>
        </RevealAnimation>

        <div className="flex flex-wrap justify-center items-center gap-7 md:gap-14 mt-10">
          {[1, 2, 3, 4, 5, 6, 7].map((num, i) => (
            <RevealAnimation key={num} delay={0.2 + i * 0.1} useSpring={true}>
              <Image
                src={`/images/brands/br-${num}.svg`}
                className="opacity-50 transition hover:opacity-100"
                alt=""
                width={80}
                height={32}
              />
            </RevealAnimation>
          ))}
        </div>
      </div>
    </div>
  );
}
