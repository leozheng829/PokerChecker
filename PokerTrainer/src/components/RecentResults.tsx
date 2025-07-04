
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrainingResult } from '@/lib/types';
import { formatCard } from '@/lib/poker';

interface RecentResultsProps {
  results: TrainingResult[];
}

const RecentResults: React.FC<RecentResultsProps> = ({ results }) => {
  const sortedResults = [...results].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Hands</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedResults.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No training results yet. Start training to see your history.
          </p>
        ) : (
          <div className="space-y-4">
            {sortedResults.slice(0, 10).map((result) => {
              const { gameState, userDecision, isCorrect, timestamp, id } = result;
              const { playerHand, communityCards, street, potSize, betToCall, isGoodCall } = gameState;
              
              return (
                <div 
                  key={id}
                  className={`p-3 rounded-md border ${
                    isCorrect ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="capitalize font-medium">{street}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {new Date(timestamp).toLocaleString()}
                      </span>
                    </div>
                    <span className={isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="text-sm font-medium">Hand:</span>
                    <span className="text-sm">
                      {playerHand.map(card => formatCard(card)).join('')}
                    </span>
                    
                    {communityCards.length > 0 && (
                      <>
                        <span className="text-sm font-medium ml-2">Board:</span>
                        <span className="text-sm">
                          {communityCards.map(card => formatCard(card)).join('')}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="text-sm">
                    <span>Pot: {potSize}, Call: {betToCall}</span>
                    <span className="mx-2">•</span>
                    <span>
                      You: {userDecision ? 'Called' : 'Folded'}, 
                      Correct: {isGoodCall ? 'Call' : 'Fold'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentResults;