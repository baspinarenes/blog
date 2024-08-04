"use client";

import { useState, type FC } from "react";
import { Icon } from "./Icon";
import { Button } from "../ui/button";

export const CopyButton: FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  let copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-center p-0 h-fit"
      onClick={copyToClipboard}
    >
      <Icon name={copied ? "complete" : "copyboard"} size={16} />
    </Button>
  );
};

export type CopyButtonProps = Readonly<{
  text: string;
}>;
