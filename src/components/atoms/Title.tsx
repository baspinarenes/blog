import { cn, dasherize } from "@/lib/utils";
import { FC } from "react";

export const Title: FC<TitleProps> = ({ level, children, className }) => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;

  const id = dasherize(children?.toString() as string);

  return (
    <Heading
      id={id}
      className={cn(
        "font-semibold",
        "group relative cursor-pointer before:absolute before:-left-4 sm:hover:before:content-['#']",
        className
      )}
    >
      <a
        href={`#${id}`}
        className="sm:group-hover:underline sm:group-hover:underline-offset-4"
      >
        {children}
      </a>
    </Heading>
  );
};

export type TitleProps = Readonly<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}>;
