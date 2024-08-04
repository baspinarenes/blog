import { Icon } from "./Icon";

export function SelectInfo() {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <Icon name="file" size={60} color="#999" />
      <span className="text-gray-500">Select a post to view.</span>
    </div>
  );
}
