import {
  ChevronRightSquareIcon,
  FilmIcon,
  GanttChartSquareIcon,
  GithubIcon,
  HammerIcon,
  LayoutGridIcon,
  LinkedinIcon,
  MessageCircleIcon,
  MousePointer2Icon,
  NotebookTextIcon,
  PenLineIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

export const TITLE = "Enes Başpınar";
export const DESCRIPTION = "A person who blogs about software development, politics, books, thoughts.";
export const SITE_URL = "https://enesbaspinar.com";
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
    id: "tool",
    href: "/tools",
    icon: HammerIcon,
  },
  {
    id: "article",
    href: "/article",
    icon: PenLineIcon,
  },
  {
    id: "snippet",
    href: "/snippet",
    icon: ChevronRightSquareIcon,
  },
  {
    id: "writing",
    href: "/writing",
    icon: NotebookTextIcon,
    location: "tr",
  },
  {
    id: "bookReview",
    href: "/book-review",
    icon: GanttChartSquareIcon,
    location: "tr",
  },
  {
    id: "movieReview",
    href: "/movie-review",
    icon: FilmIcon,
    location: "tr",
  },
  {
    id: "thought",
    href: "/thought",
    icon: MessageCircleIcon,
    location: "tr",
  },
];
