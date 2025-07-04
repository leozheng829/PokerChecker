
import React from 'react';
import { Card as CardType, getSuitColor, getSuitSymbol } from '@/lib/poker';

interface PokerCardProps {
  card: CardType;
  size?: 'sm' | 'md' | 'lg';
}

const PokerCard: React.FC<PokerCardProps> = ({ card, size = 'md' }) => {
  const { rank, suit } = card;
  const suitSymbol = getSuitSymbol(suit);
  const suitColor = getSuitColor(suit);
  
  const sizeClasses = {
    sm: 'w-8 h-12 text-sm',
    md: 'w-12 h-16 text-base',
    lg: 'w-16 h-24 text-lg'
  };
  
  return (
    <div 
      className={`${sizeClasses[size]} flex flex-col items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm relative overflow-hidden`}
    >
      <div className={`absolute top-1 left-1 ${suitColor}`}>
        {rank}
      </div>
      <div className={`text-2xl ${suitColor}`}>
        {suitSymbol}
      </div>
      <div className={`absolute bottom-1 right-1 ${suitColor} rotate-180`}>
        {rank}
      </div>
    </div>
  );
};

export default PokerCard;