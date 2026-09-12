export interface TravelPreferences {
  region: string;
  area: string;
  departureDate: string;
  days: string;
  budget: string;
  adults: string;
  children: string;
  childrenAges: string[];
  styles: string[];
  tripMode: string;
  transportation: string;
  accommodation: string;
}

export interface DailyItineraryItem {
  day: number;
  title: string;
  activities: string[];
}

export interface TravelRecommendation {
  title: string;
  summary: string;
  estimatedBudget: string;
  highlights: string[];
  transportation: string;
  accommodation: string;
  dailyItinerary: DailyItineraryItem[];
}

export interface TravelRecommendResponse {
  recommendations: TravelRecommendation[];
}
