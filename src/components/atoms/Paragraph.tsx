import { cn } from "@/libraries/utils";
import { type FC } from "react";

export const Paragraph: FC<ParagraphProps> = ({ children, align = "left" }) => {
  return (
    <p
      className={cn("text-base mb-6", {
        "text-justify": align === "justify",
        "text-center": align === "center",
      })}
    >
      {children}
    </p>
  );
};

export type ParagraphProps = Readonly<{
  children: string;
  align?: "left" | "center" | "right" | "justify";
}>;
