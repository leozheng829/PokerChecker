
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StatsDisplay from '@/components/StatsDisplay';
import RecentResults from '@/components/RecentResults';
import { UserStats } from '@/lib/types';

const initialStats: UserStats = {
  totalHands: 0,
  correctDecisions: 0,
  incorrectDecisions: 0,
  streakCount: 0,
  bestStreak: 0,
  handsByStreet: {
    preflop: { total: 0, correct: 0 },
    flop: { total: 0, correct: 0 },
    turn: { total: 0, correct: 0 },
    river: { total: 0, correct: 0 },
  },
  handsByPlayerCount: {},
  recentResults: [],
};

const Stats = () => {
  const [stats, setStats] = useState<UserStats>(() => {
    const savedStats = localStorage.getItem('poker-trainer-stats');
    return savedStats ? JSON.parse(savedStats) : initialStats;
  });

  const handleResetStats = () => {
    if (window.confirm('Are you sure you want to reset all your stats? This cannot be undone.')) {
      localStorage.removeItem('poker-trainer-stats');
      setStats(initialStats);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Your Statistics</h1>
        <p className="text-muted-foreground">Track your progress and performance</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <StatsDisplay stats={stats} />
        <RecentResults results={stats.recentResults} />
      </div>

      <div className="flex justify-center gap-4">
        <Link to="/training">
          <Button>Continue Training</Button>
        </Link>
        {stats.totalHands > 0 && (
          <Button variant="outline" onClick={handleResetStats}>
            Reset Stats
          </Button>
        )}
      </div>
    </div>
  );
};

export default Stats;