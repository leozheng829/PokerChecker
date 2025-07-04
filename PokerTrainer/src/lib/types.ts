
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  rank: Rank;
  suit: Suit;
}

export type Street = 'preflop' | 'flop' | 'turn' | 'river';

export interface GameState {
  playerCount: number;
  street: Street;
  playerHand: Card[];
  communityCards: Card[];
  potSize: number;
  betToCall: number;
  equity: number; // The actual equity of the hand
  isGoodCall: boolean; // Whether calling is GTO-correct
  explanation: string;
}

export interface TrainingSettings {
  playerCountRange: [number, number];
  streets: Street[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TrainingResult {
  id: string;
  timestamp: number;
  gameState: GameState;
  userDecision: boolean; // true = call, false = fold
  isCorrect: boolean;
}

export interface UserStats {
  totalHands: number;
  correctDecisions: number;
  incorrectDecisions: number;
  streakCount: number;
  bestStreak: number;
  handsByStreet: Record<Street, { total: number; correct: number }>;
  handsByPlayerCount: Record<number, { total: number; correct: number }>;
  recentResults: TrainingResult[];
}