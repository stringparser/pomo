export type TimerItem = {
  id: string;
} & Partial<{
  end: number;
  start: number;
  description: string;
}>;
