// Fix: Define the Category interface used for the category selection cards.
export interface Category {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  description: string;
}

// Fix: Define the CategoryInfo interface for the data returned by the Gemini API.
export interface CategoryInfo {
  title: string;
  summary: string;
  funFact: string;
  examples: string[];
  imagePrompts: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}