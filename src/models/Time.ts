export type TimerItem = {
  id: string;
} & Partial<{
  title: string;
  content: string;
  start: number;
  ended: number;
}>;
