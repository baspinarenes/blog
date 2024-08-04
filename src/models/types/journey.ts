export type Journey = {
  title: string;
  description: string;
  image?: string;
};

export type JourneyGroup = {
  year: number;
  items: Journey[];
};
