export interface Macronutrients {
  protein_g: number;
  fett_g: number;
  karbohydrater_g: number;
  fiber_g: number;
}

export interface Vitamins {
  [key: string]: string;
}

export interface Minerals {
  [key: string]: string;
}

export interface Food {
  name: string;
  kategori: string;
  kalorier_per_100g: number;
  makronæringsstoffer: Macronutrients;
  vitaminer: Vitamins;
  mineraler: Minerals;
  fordelar: string[];
}

export type FoodCategory = 'Grønnsak' | 'Frukt' | 'Kjøtt' | 'Fisk' | 'Meieriprodukt' | 'Kornprodukt'; 