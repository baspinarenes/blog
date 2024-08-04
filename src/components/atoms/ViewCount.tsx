import { Icon } from "./Icon";

export const ViewCount = ({ count }: ViewCountProps) => {
  return (
    <span className="flex gap-1 items-center justify-center text-sm">
      <Icon name="view" size={14} />
      {count || "-"}
    </span>
  );
};

export type ViewCountProps = Readonly<{
  count: number;
}>;
