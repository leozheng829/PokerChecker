
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { UserStats } from '@/lib/types';

interface StatsDisplayProps {
  stats: UserStats;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  const accuracy = stats.totalHands > 0 
    ? (stats.correctDecisions / stats.totalHands) * 100 
    : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Training Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-sm font-medium mb-1">Total Hands</h3>
            <p className="text-2xl font-bold">{stats.totalHands}</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-sm font-medium mb-1">Accuracy</h3>
            <p className="text-2xl font-bold">{accuracy.toFixed(1)}%</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-sm font-medium mb-1">Current Streak</h3>
            <p className="text-2xl font-bold">{stats.streakCount}</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="text-sm font-medium mb-1">Best Streak</h3>
            <p className="text-2xl font-bold">{stats.bestStreak}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Performance by Street</h3>
          <div className="space-y-2">
            {Object.entries(stats.handsByStreet).map(([street, data]) => {
              const streetAccuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
              return (
                <div key={street} className="flex justify-between items-center bg-muted p-2 rounded-md">
                  <span className="capitalize">{street}</span>
                  <div className="text-right">
                    <span className="font-medium">{streetAccuracy.toFixed(1)}%</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({data.correct}/{data.total})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Performance by Player Count</h3>
          <div className="space-y-2">
            {Object.entries(stats.handsByPlayerCount)
              .sort((a, b) => Number(a[0]) - Number(b[0]))
              .map(([playerCount, data]) => {
                const countAccuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
                return (
                  <div key={playerCount} className="flex justify-between items-center bg-muted p-2 rounded-md">
                    <span>{playerCount} players</span>
                    <div className="text-right">
                      <span className="font-medium">{countAccuracy.toFixed(1)}%</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({data.correct}/{data.total})
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsDisplay;