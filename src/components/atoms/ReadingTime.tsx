import { Icon } from "./Icon";

export const ReadingTime = ({ time }: ReadingTimeProps) => {
  return (
    <span className="flex gap-1 items-center text-sm text-gray-600">
      <Icon name="clock" size={12} />
      {time || "-"} min
    </span>
  );
};

export type ReadingTimeProps = Readonly<{
  time: number;
}>;
