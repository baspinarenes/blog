import { Icon } from "./Icon";

export const NoContent = () => {
  return (
    <div className="flex flex-col gap-4 items-center content-center justify-center h-full text-gray-400">
      <Icon name="file" size={72} strokeWidth={1} className="text-gray-300" />
      <span className="text-center">
        Burada henüz bir şey yok :(
        <br />
        Daha sonra tekrar dene.
      </span>
    </div>
  );
};
