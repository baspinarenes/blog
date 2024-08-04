import { Icon } from "./Icon";

export const ReadingTime = ({ text }: ReadingTimeProps) => {
  return (
    <span className="flex gap-1 items-center">
      <Icon name="clock" size={12} />
      {text || "-"}
    </span>
  );
};

export type ReadingTimeProps = Readonly<{
  text: string;
}>;
