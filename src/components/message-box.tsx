import { AlertCircleIcon, InfoIcon, SkullIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export const MessageBox: React.FC<MessageBoxProps> = ({ type, content }) => {
  const options = {
    info: {
      textColor: "text-blue-600",
      borderColor: "border-blue-600",
      icon: InfoIcon,
    },
    warning: {
      textColor: "text-yellow-600",
      borderColor: "border-yellow-600",
      icon: AlertCircleIcon,
    },
    danger: {
      textColor: "text-red-600",
      borderColor: "border-red-600",
      icon: SkullIcon,
    },
  }[type]!;

  return (
    <Card className={options.borderColor}>
      <CardContent className={`${options.textColor} inline-flex gap-4 p-4`}>
        <options.icon className={`inline-block flex-shrink-0`} />
        <p className="m-0 inline-block text-sm">{content}</p>
      </CardContent>
    </Card>
  );
};

export type MessageBoxProps = {
  type: "info" | "warning" | "danger";
  content: string;
};
