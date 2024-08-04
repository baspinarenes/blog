"use client";

import screamLogo from "@public/scream.svg";
import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src={screamLogo}
      alt="scream"
      width={120}
      height={120}
      className="mx-auto mb-4 animate-scream"
    />
  );
};
