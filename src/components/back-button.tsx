"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const BackButton: React.FC<BackButtonProps> = (props) => {
  const { to } = props;

  const router = useRouter();

  const handleBackButtonClick = () => {
    to ? router.push(to) : router.back();
  };

  return (
    <Button variant="ghost" onClick={handleBackButtonClick} className="w-9 h-9 p-0">
      <ArrowLeftIcon size={16} />
    </Button>
  );
};

export type BackButtonProps = {
  to: `/${string}`;
};
