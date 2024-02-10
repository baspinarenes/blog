import {
  ChevronRightSquareIcon,
  GanttChartSquareIcon,
  GithubIcon,
  HammerIcon,
  LayoutGridIcon,
  LinkedinIcon,
  MessageCircleIcon,
  MousePointer2Icon,
  NotebookPenIcon,
  NotebookTextIcon,
  PenLineIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

export const TITLE = "Enes Başpınar";
export const DESCRIPTION = "Software Engineer, working at Trendyol";
export const URL = "https://enesbaspinar.com";
export const AUTHOR = {
  name: "Enes",
  surname: "Başpınar",
  title: "Software Engineer",
  age: new Date().getFullYear() - 1999,
  socials: [
    {
      name: "Twitter",
      username: "enesbaspinar",
      url: "https://twitter.com/ensbaspinar",
      icon: TwitterIcon,
    },
    {
      name: "Github",
      username: "enesbaspinar",
      url: "https://github.com/baspinarenes",
      icon: GithubIcon,
    },
    {
      name: "Linkedin",
      username: "enesbaspinar",
      url: "https://www.linkedin.com/in/enesbaspinar",
      icon: LinkedinIcon,
    },
    {
      name: "Youtube",
      username: "@ensbaspinar",
      url: "https://youtube.com/@ensbaspinar",
      icon: YoutubeIcon,
    },
  ],
};

export const NAVIGATIONS = [
  {
    id: "home",
    href: "/",
    icon: LayoutGridIcon,
  },
  {
    id: "journey",
    href: "/journey",
    icon: MousePointer2Icon,
  },
  {
    id: "stack",
    href: "/stack",
    icon: HammerIcon,
  },
  {
    id: "articles",
    href: "/article",
    icon: PenLineIcon,
  },
  {
    id: "writings",
    href: "/writing",
    icon: NotebookTextIcon,
  },
  {
    id: "book-reviews",
    href: "/book-review",
    icon: GanttChartSquareIcon,
  },
  {
    id: "thoughts",
    href: "/thought",
    icon: MessageCircleIcon,
  },
  {
    id: "snippets",
    href: "/snippet",
    icon: ChevronRightSquareIcon,
  },
];
