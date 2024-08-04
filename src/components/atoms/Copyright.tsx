import { copyright } from "@/configs";

export function Copyright() {
  return (
    <div className="text-center text-xs text-gray-500 mt-8 sm:mt-0">
      <p>{copyright}</p>
    </div>
  );
}
