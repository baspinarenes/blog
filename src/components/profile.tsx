import { AUTHOR } from "@/lib/constants";

export const Profile: React.FC<ProfileProps> = (props) => {
  const {} = props;

  return (
    <div className="flex gap-2 p-2">
      <img
        alt="Profile img"
        src="/images/scream.png"
        width={36}
        height={36}
        loading="eager"
        fetchPriority="high"
        className="w-9 h-9"
      />
      <div className="flex flex-col text-sm">
        <span className="font-semibold tracking-tight">
          {AUTHOR.name} {AUTHOR.surname}
        </span>
        <span className="text-gray-600 font-extralight text-xs">{AUTHOR.title}</span>
      </div>
    </div>
  );
};

export type ProfileProps = {};
