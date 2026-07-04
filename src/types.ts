export type Machine = {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  category: string;
  capability: string;
  image: string;
  illustrationPath?: string;
  status: "Operational" | "Inspect" | "Calibrate";
  bay: string;
  overview: string;
  specs: { label: string; value: string }[];
  photos: string[];
  documentation: { title: string; kind: string }[];
};
