import { type FC } from "react";
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
  IconCode,
  IconLayout,
  IconNotebook,
  IconSend,
  IconSignature,
  IconTools,
  IconLanguage,
  IconMenu2,
  IconMasksTheater,
  IconClock,
  IconEye,
  IconBrain,
  IconPlus,
  IconCategory,
  IconCommand,
  IconCopy,
  IconCheck,
  IconBug,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandTypescript,
  IconBrandJavascript,
  IconFileCode2,
  IconTerminal2,
  IconBrandGitlab,
  IconArrowLeft,
  IconCoffee,
  IconBrandCpp,
  IconProps,
  IconFile,
  IconQuestionMark,
  IconError404,
  IconSquareRoundedXFilled,
  IconInfoSquareRoundedFilled,
  IconAlertSquareRoundedFilled,
  IconBrandSwift,
  IconAlertTriangleFilled,
  IconBrandGolang,
} from "@tabler/icons-react";

const getIconByName = (name: string): typeof IconBrandTwitter | null => {
  return (
    {
      twitter: IconBrandTwitter,
      github: IconBrandGithub,
      linkedin: IconBrandLinkedin,
      youtube: IconBrandYoutube,
      home: IconLayout,
      journey: IconSend,
      article: IconNotebook,
      writing: IconSignature,
      snippet: IconCode,
      tools: IconTools,
      tool: IconTools,
      culture: IconMasksTheater,
      thought: IconBrain,
      html: IconBrandHtml5,
      css: IconBrandCss3,
      typescript: IconBrandTypescript,
      javascript: IconBrandJavascript,
      js: IconBrandJavascript,
      swift: IconBrandSwift,
      bash: IconTerminal2,
      yaml: IconFileCode2,
      gitlab: IconBrandGitlab,
      java: IconCoffee,
      cpp: IconBrandCpp,
      external: IconArrowUpRight,
      language: IconLanguage,
      menu: IconMenu2,
      clock: IconClock,
      view: IconEye,
      plus: IconPlus,
      category: IconCategory,
      command: IconCommand,
      copyboard: IconCopy,
      complete: IconCheck,
      bug: IconBug,
      back: IconArrowLeft,
      file: IconFile,
      question: IconQuestionMark,
      "not-found": IconError404,
      danger: IconSquareRoundedXFilled,
      warning: IconAlertTriangleFilled,
      info: IconInfoSquareRoundedFilled,
      go: IconBrandGolang,
    }[name] || null
  );
};

export const Icon: FC<{ name: string } & IconProps> = ({ name, ...props }) => {
  const IconComponent = getIconByName(name);
  return IconComponent ? <IconComponent {...props} /> : null;
};
