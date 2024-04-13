import { FileTextIcon } from "lucide-react";

export const NoContent: React.FC<NoContentProps> = (props) => {
  const { title } = props;

  return (
    <div className="h-[calc(100vh-48px-56px)] flex flex-col gap-2 items-center justify-center w-full lg:hidden text-zinc-300">
      <FileTextIcon size={32} absoluteStrokeWidth />
      <span className="font-mono text-lg">{title}</span>
    </div>
  );
};

export type NoContentProps = {
  title: string;
};
