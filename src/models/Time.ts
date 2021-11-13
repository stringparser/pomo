export type TimerItem = {
  label: string;
} & Partial<{
  end: number;
  start: number;
}>;
