import { Icon } from "./Icon";

export const ViewCount = ({ count }: ViewCountProps) => {
  return (
    <span className="flex gap-1 items-center text-sm text-gray-600">
      <Icon name="view" size={12} />
      {count || "-"}
    </span>
  );
};

export type ViewCountProps = Readonly<{
  count: number;
}>;
