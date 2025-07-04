
import { Card, GameState, Rank, Street, Suit } from './types';

// All possible ranks and suits
const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];

// Create a full deck of cards
export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
};

// Shuffle an array using Fisher-Yates algorithm
export const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Deal a specified number of cards from a deck
export const dealCards = (deck: Card[], count: number): Card[] => {
  return deck.slice(0, count);
};

// Get the remaining cards after dealing
export const getRemainingCards = (deck: Card[], dealtCards: Card[]): Card[] => {
  return deck.filter(
    (card) =>
      !dealtCards.some(
        (dealtCard) => dealtCard.rank === card.rank && dealtCard.suit === card.suit
      )
  );
};

// Format a card for display
export const formatCard = (card: Card): string => {
  const rankSymbol = card.rank;
  const suitSymbol = getSuitSymbol(card.suit);
  return `${rankSymbol}${suitSymbol}`;
};

// Get HTML symbol for a suit
export const getSuitSymbol = (suit: Suit): string => {
  switch (suit) {
    case 'hearts':
      return '♥';
    case 'diamonds':
      return '♦';
    case 'clubs':
      return '♣';
    case 'spades':
      return '♠';
  }
};

// Get color for a suit
export const getSuitColor = (suit: Suit): string => {
  return suit === 'hearts' || suit === 'diamonds' ? 'text-red-500' : 'text-black dark:text-white';
};

// Calculate pot odds (call amount / (pot size + call amount))
export const calculatePotOdds = (potSize: number, callAmount: number): number => {
  return callAmount / (potSize + callAmount);
};

// Determine if a call is correct based on equity and pot odds
export const isCallCorrect = (equity: number, potOdds: number): boolean => {
  return equity > potOdds;
};

// Generate a random street
export const getRandomStreet = (streets: Street[]): Street => {
  return streets[Math.floor(Math.random() * streets.length)];
};

// Generate a random player count within a range
export const getRandomPlayerCount = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random pot size appropriate for the street
export const getRandomPotSize = (street: Street, bigBlind: number = 2): number => {
  switch (street) {
    case 'preflop':
      return bigBlind * (Math.floor(Math.random() * 5) + 1);
    case 'flop':
      return bigBlind * (Math.floor(Math.random() * 10) + 5);
    case 'turn':
      return bigBlind * (Math.floor(Math.random() * 20) + 10);
    case 'river':
      return bigBlind * (Math.floor(Math.random() * 40) + 20);
  }
};

// Generate a random bet size as a percentage of the pot
export const getRandomBetSize = (potSize: number): number => {
  const betSizePercentage = [0.25, 0.33, 0.5, 0.66, 0.75, 1, 1.5, 2][
    Math.floor(Math.random() * 8)
  ];
  return Math.round(potSize * betSizePercentage);
};

// Calculate a simplified equity estimate for the hand
// In a real app, this would use a more sophisticated equity calculator
export const calculateSimplifiedEquity = (
  playerHand: Card[],
  communityCards: Card[],
  playerCount: number,
  street: Street
): number => {
  // This is a simplified model - a real GTO trainer would use more accurate equity calculations
  
  // Convert ranks to numerical values for easier comparison
  const rankValues: Record<Rank, number> = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 
    'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };
  
  // Check if we have a pair in hand
  const isPair = playerHand[0].rank === playerHand[1].rank;
  
  // Get numerical ranks
  const handRanks = playerHand.map(card => rankValues[card.rank]).sort((a, b) => b - a);
  
  // Check if suited
  const isSuited = playerHand[0].suit === playerHand[1].suit;
  
  // Base equity adjustments
  let equity = 0;
  
  // Preflop equity approximation
  if (street === 'preflop') {
    // Premium pairs
    if (isPair) {
      if (handRanks[0] >= 10) {
        equity = 0.85 - (0.05 * (playerCount - 2)); // AA, KK, QQ, JJ, TT
      } else {
        equity = 0.65 - (0.07 * (playerCount - 2)); // 99 down to 22
      }
    } 
    // Big cards
    else if (handRanks[0] >= 12 && handRanks[1] >= 10) {
      equity = isSuited ? 
        0.65 - (0.06 * (playerCount - 2)) : // AK, AQ, AJ suited etc.
        0.60 - (0.07 * (playerCount - 2));  // AK, AQ, AJ offsuit etc.
    }
    // Medium strength hands
    else if (handRanks[0] >= 10 && handRanks[1] >= 8) {
      equity = isSuited ?
        0.55 - (0.07 * (playerCount - 2)) :
        0.50 - (0.08 * (playerCount - 2));
    }
    // Connected cards
    else if (Math.abs(handRanks[0] - handRanks[1]) <= 2) {
      equity = isSuited ?
        0.50 - (0.07 * (playerCount - 2)) :
        0.45 - (0.08 * (playerCount - 2));
    }
    // Weak hands
    else {
      equity = isSuited ?
        0.40 - (0.08 * (playerCount - 2)) :
        0.35 - (0.08 * (playerCount - 2));
    }
  } 
  // Postflop equity approximation
  else {
    // All cards in play (player hand + community cards)
    const allCards = [...playerHand, ...communityCards];
    const allRanks = allCards.map(card => rankValues[card.rank]);
    const allSuits = allCards.map(card => card.suit);
    
    // Count rank frequencies
    const rankFrequency: Record<number, number> = {};
    allRanks.forEach(rank => {
      rankFrequency[rank] = (rankFrequency[rank] || 0) + 1;
    });
    
    // Count suit frequencies
    const suitFrequency: Record<Suit, number> = {
      hearts: 0, diamonds: 0, clubs: 0, spades: 0
    };
    allSuits.forEach(suit => {
      suitFrequency[suit] += 1;
    });
    
    // Check for made hands
    const hasPair = Object.values(rankFrequency).some(freq => freq >= 2);
    const hasTwoPair = Object.values(rankFrequency).filter(freq => freq >= 2).length >= 2;
    const hasTrips = Object.values(rankFrequency).some(freq => freq >= 3);
    const hasQuads = Object.values(rankFrequency).some(freq => freq >= 4);
    const hasFlushDraw = Object.values(suitFrequency).some(freq => freq >= 4);
    const hasFlush = Object.values(suitFrequency).some(freq => freq >= 5);
    
    // Straight possibilities (very simplified)
    const uniqueRanks = [...new Set(allRanks)].sort((a, b) => a - b);
    const hasOpenEndedStraightDraw = 
      uniqueRanks.length >= 4 && 
      (uniqueRanks[uniqueRanks.length - 1] - uniqueRanks[0]) <= 5;
    
    // Base equity based on made hands
    if (hasQuads) {
      equity = 0.95;
    } else if (hasTrips && hasPair) { // Full house
      equity = 0.9;
    } else if (hasFlush) {
      equity = 0.85;
    } else if (hasTrips) {
      equity = 0.75;
    } else if (hasTwoPair) {
      equity = 0.65;
    } else if (hasPair) {
      // Check if top pair
      const boardHighCard = Math.max(...communityCards.map(c => rankValues[c.rank]));
      const isPairWithHighCard = Object.entries(rankFrequency)
        .some(([rank, freq]) => freq >= 2 && Number(rank) === boardHighCard);
      
      equity = isPairWithHighCard ? 0.6 : 0.5;
    } else if (hasFlushDraw) {
      equity = 0.4;
    } else if (hasOpenEndedStraightDraw) {
      equity = 0.35;
    } else {
      // High card value
      const highestCardInHand = Math.max(...playerHand.map(c => rankValues[c.rank]));
      if (highestCardInHand >= 13) { // K or A
        equity = 0.3;
      } else if (highestCardInHand >= 10) { // T, J, Q
        equity = 0.25;
      } else {
        equity = 0.2;
      }
    }
    
    // Adjust for number of players
    equity = Math.max(0.05, equity - (0.05 * (playerCount - 2)));
    
    // Adjust for street - more uncertainty on earlier streets
    if (street === 'flop') {
      equity = equity * 0.9;
    } else if (street === 'turn') {
      equity = equity * 0.95;
    }
  }
  
  // Ensure equity is within bounds
  return Math.max(0.05, Math.min(0.95, equity));
};

// Generate explanation for the decision
export const generateExplanation = (
  gameState: GameState,
  potOdds: number
): string => {
  const { playerHand, communityCards, street, potSize, betToCall, equity, isGoodCall } = gameState;
  
  let explanation = `You have ${formatCard(playerHand[0])}${formatCard(playerHand[1])}`;
  
  if (communityCards.length > 0) {
    explanation += ` with a board of ${communityCards.map(formatCard).join('')}`;
  }
  
  explanation += `.\n\nThe pot is ${potSize} and you need to call ${betToCall}. `;
  explanation += `Your pot odds are ${(potOdds * 100).toFixed(1)}% (${betToCall}/${potSize + betToCall}). `;
  explanation += `Your equity in this spot is approximately ${(equity * 100).toFixed(1)}%.\n\n`;
  
  if (isGoodCall) {
    explanation += `Since your equity (${(equity * 100).toFixed(1)}%) is greater than your pot odds (${(potOdds * 100).toFixed(1)}%), calling is the correct GTO play. `;
    explanation += `For every 100 units you invest, you'll win back more than 100 units in the long run.`;
  } else {
    explanation += `Since your equity (${(equity * 100).toFixed(1)}%) is less than your pot odds (${(potOdds * 100).toFixed(1)}%), folding is the correct GTO play. `;
    explanation += `For every 100 units you invest, you'll win back less than 100 units in the long run.`;
  }
  
  return explanation;
};

// Generate a random game state for training
export const generateRandomGameState = (
  streets: Street[],
  minPlayers: number,
  maxPlayers: number
): GameState => {
  // Select random street and player count
  const street = getRandomStreet(streets);
  const playerCount = getRandomPlayerCount(minPlayers, maxPlayers);
  
  // Create and shuffle deck
  const deck = shuffle(createDeck());
  
  // Deal player hand (always 2 cards)
  const playerHand = dealCards(deck, 2);
  
  // Deal community cards based on street
  let communityCards: Card[] = [];
  if (street === 'flop') {
    communityCards = dealCards(deck.slice(2), 3);
  } else if (street === 'turn') {
    communityCards = dealCards(deck.slice(2), 4);
  } else if (street === 'river') {
    communityCards = dealCards(deck.slice(2), 5);
  }
  
  // Generate pot size and bet to call
  const potSize = getRandomPotSize(street);
  const betToCall = getRandomBetSize(potSize);
  
  // Calculate equity
  const equity = calculateSimplifiedEquity(playerHand, communityCards, playerCount, street);
  
  // Determine if calling is correct
  const potOdds = calculatePotOdds(potSize, betToCall);
  const isGoodCall = isCallCorrect(equity, potOdds);
  
  // Generate explanation
  const explanation = generateExplanation(
    { playerHand, communityCards, street, playerCount, potSize, betToCall, equity, isGoodCall, explanation: '' },
    potOdds
  );
  
  return {
    playerHand,
    communityCards,
    street,
    playerCount,
    potSize,
    betToCall,
    equity,
    isGoodCall,
    explanation
  };
};