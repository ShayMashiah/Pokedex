import { SortOption } from './types';

export const pageSizeOptions = [10, 20, 30];

export const SORT_OPTIONS = [
  { label: 'Alphabetical A-Z', value: SortOption.AZ },
  { label: 'Alphabetical Z-A', value: SortOption.ZA },
  { label: 'Power (High to low)', value: SortOption.PowerHighLow },
  { label: 'Power (Low to high)', value: SortOption.PowerLowHigh },
  { label: 'HP (High to low)', value: SortOption.HPHighLow },
  { label: 'HP (Low to high)', value: SortOption.HPLowHigh },
];