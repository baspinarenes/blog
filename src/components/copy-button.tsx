import { useState } from "react";
import { Button } from "./ui/button";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { CopyIcon } from "lucide-react";

export const CopyButton: React.FC<CopyButtonProps> = (props) => {
  const { code, language } = props;
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    let modifiedCode = code;

    if (language === "bash") {
      modifiedCode = code.split("").reduce((acc, char, index) => {
        if (acc.at(-1) === "\\" && char === "\n") {
          return acc + char;
        }

        if (char === "\n" && code.length - 1 !== index) {
          return acc + " && ";
        }

        return acc + char;
      }, "");
      // modifiedCode = code.replaceAll("\n", " && ").slice(0, -4);
    }

    navigator.clipboard.writeText(modifiedCode);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-md lg:rounded-lg h-6 lg:h-8"
      disabled={copied}
      onClick={onCopy}
    >
      <LazyMotion features={domAnimation}>
        <m.span
          key={copied ? "copied" : "copy"}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          className="inline-flex w-9 lg:w-12 items-center justify-center gap-0.5"
          transition={{ duration: 0.3 }}
        >
          {copied ? (
            "Copied"
          ) : (
            <span className="flex items-center gap-2 text-[11px] lg:text-sm">
              <CopyIcon size={14} className="w-2.5" />
              Copy
            </span>
          )}
        </m.span>
      </LazyMotion>
    </Button>
  );
};

export type CopyButtonProps = {
  code: string;
  language: string;
};
