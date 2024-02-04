import {
  ChevronRightSquareIcon,
  Code2Icon,
  CodeSquareIcon,
  GanttChartSquareIcon,
  GithubIcon,
  HammerIcon,
  LayoutGridIcon,
  LinkedinIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  MessageSquareTextIcon,
  MousePointer2Icon,
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
    label: "Home",
    href: "/",
    icon: LayoutGridIcon,
  },
  {
    label: "Journey",
    href: "/journey",
    icon: MousePointer2Icon,
  },
  {
    label: "Stack",
    href: "/stack",
    icon: HammerIcon,
  },
  {
    label: "Articles",
    href: "/article",
    icon: PenLineIcon,
  },
  {
    label: "Book Reviews",
    href: "/book-review",
    icon: GanttChartSquareIcon,
  },
  {
    label: "Thoughts",
    href: "/thought",
    icon: MessageCircleIcon,
  },
  {
    label: "Snippets",
    href: "/snippet",
    icon: ChevronRightSquareIcon,
  },
];
