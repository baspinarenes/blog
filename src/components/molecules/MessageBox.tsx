import { cn } from "@/libraries/utils";
import { Icon } from "../atoms";
import { MarkdownContent } from "./MarkdownContent";

export function MessageBox({ children, type }: MessageBoxProps) {
  return (
    <div
      className={cn(
        "message-box p-5 flex flex-col items-center gap-2 my-6 sm:items-start sm:flex-row sm:gap-4 sm:rounded-md -mx-6 sm:mx-0",
        {
          "bg-yellow-400": type === "warning",
          "bg-[rgba(220,38,38,0.5)]": type === "danger",
          "bg-gray-200": type === "info",
        }
      )}
    >
      <Icon name={type} className="shrink-0" size={30} />
      <MarkdownContent>{children}</MarkdownContent>
    </div>
  );
}

export type MessageBoxProps = {
  children: string;
  type: "warning" | "danger" | "info";
};
