import { type FC } from "react";
import { Icon } from "./Icon";

export const EmptyContent: FC<EmptyContentProps> = ({}) => {
  return (
    <div className="flex flex-col items-center content-center justify-center h-full text-gray-400">
      <Icon name="file" size={72} color="" />
      <span>Burada henüz bir şey yok :(</span>
      <span>Daha sonra tekrar dene.</span>
    </div>
  );
};

export type EmptyContentProps = Readonly<{}>;
