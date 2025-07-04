
import React from 'react';
import PokerCard from './PokerCard';
import { Card as CardType } from '@/lib/types';

interface PokerHandProps {
  cards: CardType[];
  size?: 'sm' | 'md' | 'lg';
}

const PokerHand: React.FC<PokerHandProps> = ({ cards, size = 'md' }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {cards.map((card, index) => (
        <PokerCard key={`${card.rank}-${card.suit}-${index}`} card={card} size={size} />
      ))}
    </div>
  );
};

export default PokerHand;