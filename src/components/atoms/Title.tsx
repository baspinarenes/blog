import { type FC } from "react";
import { cn, dasherize } from "@/libraries/utils";

export const Title: FC<TitleProps> = ({ level, children, className }) => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;

  const id = dasherize(children?.toString() as string);

  return (
    <Heading
      id={id}
      className={cn(
        "font-semibold",
        "relative cursor-pointer before:absolute before:-left-4 sm:hover:before:content-['#'] hover:before:-ml-1",
        className
      )}
    >
      <a href={`#${id}`}>{children}</a>
    </Heading>
  );
};

export type TitleProps = Readonly<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}>;
