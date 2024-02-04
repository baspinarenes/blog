import { FileTextIcon } from "lucide-react";

export const SelectContentInfo: React.FC<SelectContentInfoProps> = (props) => {
  const {} = props;

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full text-zinc-300">
      <FileTextIcon size={32} absoluteStrokeWidth />
      <span>Select a content to view it</span>
    </div>
  );
};

export type SelectContentInfoProps = {};
