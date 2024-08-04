import { type FC } from "react";
import Image from "next/image";
import { Paragraph } from "@/components/atoms";

export const Journey: FC<JourneyProps> = ({ title, description, image }) => {
  return (
    <li>
      <h4 className="mt-0 mb-1">{title}</h4>
      <Paragraph>{description}</Paragraph>
      {image && (
        <Image
          src={image}
          alt={title}
          width={1200}
          height={400}
          className="rounded-lg"
        />
      )}
    </li>
  );
};

export type JourneyProps = Readonly<{
  title: string;
  description: string;
  image?: string;
}>;
