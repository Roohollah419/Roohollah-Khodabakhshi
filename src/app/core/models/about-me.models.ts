export interface StatisticItem {
  icon: string;
  value: number | string;
  label: string;
  ariaLabel?: string;
}

export interface StatisticSlide {
  id: number;
  items: StatisticItem[];
}

export interface AboutMeContent {
  heading: string;
  introduction: string;
  imageUrl: string;
  imageAlt: string;
}
