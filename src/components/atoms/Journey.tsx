import { cn } from "@/lib/utils";
import { type FC } from "react";
import { Title } from "./Title";
import { Paragraph } from "./Paragraph";
import Image from "next/image";

export const Journey: FC<JourneyProps> = ({ title, description, image }) => {
  return (
    <div
      className={cn(
        "flex flex-col pl-9 relative text-base",
        "before:absolute before:left-0 before:top-1 before:flex before:justify-center before:items-end before:text-white before:w-5 before:h-5 before:bg-black before:rounded-full before:content-['+'] before:z-20 before:outline before:outline-[6px] before:outline-white",
        "after:last-of-type:hidden after:w-px after:h-full after:bg-gray-300 after:absolute after:left-2.5 after:top-1"
      )}
    >
      <Title level={4} className="mt-0 mb-1">
        {title}
      </Title>
      <Paragraph>{description}</Paragraph>
      {image && (
        <Image
          src={image}
          alt={title}
          width={1200}
          height={400}
          className="rounded-lg mb-6"
        />
      )}
    </div>
  );
};

export type JourneyProps = Readonly<{
  title: string;
  description: string;
  image?: string;
}>;
