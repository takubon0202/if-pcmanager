export type PeripheralCategory =
  | "monitor"
  | "keyboard"
  | "mouse"
  | "headset"
  | "webcam";

export interface PeripheralItem {
  id: string;
  category: PeripheralCategory;
  name: string;
  brand: string;
  price: number;
  url: string | null;
  specs: Record<string, string>;
  tags: string[];
}

export interface PeripheralQuestion {
  id: string;
  label: string;
  options: { id: string; label: string; icon?: string; desc?: string }[];
  multi?: boolean;
}

export interface PeripheralFlowConfig {
  category: PeripheralCategory;
  title: string;
  icon: string;
  subtitle: string;
  questions: PeripheralQuestion[];
  scoreFn: (item: PeripheralItem, answers: Record<string, string[]>) => number;
  webcamUpsell?: boolean;
}
