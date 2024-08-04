"use client";

import Image from "next/image";
import screamLogo from "@/../public/scream.svg";

export const Logo = () => {
  return (
    <Image
      src={screamLogo}
      alt="scream"
      width={120}
      height={120}
      priority={true}
      className="mx-auto mb-4 animate-scream"
    />
  );
};
