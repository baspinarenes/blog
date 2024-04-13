import { Language } from "@/lib/models";
import { Button } from "./ui/button";

export const FlagButton: React.FC<FlagButtonProps> = (props) => {
  const { lng, handleLanguageChange } = props;

  return (
    <Button
      variant="ghost"
      className="hidden lg:block w-full bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url("/images/flags/${lng}.png")`,
      }}
      onClick={handleLanguageChange}
    />
  );
};

export type FlagButtonProps = {
  lng: Language;
  handleLanguageChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
