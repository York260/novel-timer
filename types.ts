
export type ActivityType = 'study' | 'exercise' | 'running';

export interface ActivityEntry {
  id: string;
  type: ActivityType;
  value: number; // minutes or meters
  timestamp: string;
}

export interface RedemptionEntry {
  id: string;
  amount: number; // minutes
  timestamp: string;
}

export interface AppState {
  activities: ActivityEntry[];
  redemptions: RedemptionEntry[];
}
