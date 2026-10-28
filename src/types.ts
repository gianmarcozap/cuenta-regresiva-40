export interface AppConfig {
  sisterName: string;
  targetDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss
  youtubeVideoId: string;
  directVideoUrl: string;
  headlineCustom: string;
  birthdayLetter?: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
  isExpired: boolean;
}
