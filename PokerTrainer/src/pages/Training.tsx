
import React, { useState, useEffect } from 'react';
import TrainingControls from '@/components/TrainingControls';
import TrainingScenario from '@/components/TrainingScenario';
import { GameState, Street, TrainingResult, TrainingSettings, UserStats } from '@/lib/types';
import { generateRandomGameState } from '@/lib/poker';
import { toast } from 'sonner';

const defaultSettings: TrainingSettings = {
  playerCountRange: [2, 6],
  streets: ['preflop', 'flop', 'turn', 'river'],
  difficulty: 'intermediate',
};

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

const Training = () => {
  const [settings, setSettings] = useState<TrainingSettings>(() => {
    const savedSettings = localStorage.getItem('poker-trainer-settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  
  const [stats, setStats] = useState<UserStats>(() => {
    const savedStats = localStorage.getItem('poker-trainer-stats');
    return savedStats ? JSON.parse(savedStats) : initialStats;
  });
  
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isTraining, setIsTraining] = useState(false);

  // Save settings and stats to localStorage when they change
  useEffect(() => {
    localStorage.setItem('poker-trainer-settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('poker-trainer-stats', JSON.stringify(stats));
  }, [stats]);

  const handleStartTraining = () => {
    setIsTraining(true);
    generateNewHand();
  };

  const generateNewHand = () => {
    const newGameState = generateRandomGameState(
      settings.streets,
      settings.playerCountRange[0],
      settings.playerCountRange[1]
    );
    setGameState(newGameState);
  };

  const handleDecision = (decision: boolean, result: TrainingResult) => {
    const { gameState, isCorrect } = result;
    const { street, playerCount } = gameState;

    // Update stats
    const newStats = { ...stats };
    newStats.totalHands += 1;
    
    if (isCorrect) {
      newStats.correctDecisions += 1;
      newStats.streakCount += 1;
      newStats.bestStreak = Math.max(newStats.bestStreak, newStats.streakCount);
      
      toast.success('Correct decision!');
    } else {
      newStats.incorrectDecisions += 1;
      newStats.streakCount = 0;
      
      toast.error('Incorrect decision!');
    }

    // Update street stats
    newStats.handsByStreet[street].total += 1;
    if (isCorrect) {
      newStats.handsByStreet[street].correct += 1;
    }

    // Update player count stats
    if (!newStats.handsByPlayerCount[playerCount]) {
      newStats.handsByPlayerCount[playerCount] = { total: 0, correct: 0 };
    }
    newStats.handsByPlayerCount[playerCount].total += 1;
    if (isCorrect) {
      newStats.handsByPlayerCount[playerCount].correct += 1;
    }

    // Add to recent results
    newStats.recentResults = [result, ...newStats.recentResults].slice(0, 50);

    setStats(newStats);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Poker Training</h1>
        <p className="text-muted-foreground">Practice your GTO calling decisions</p>
      </div>

      {!isTraining ? (
        <div className="max-w-md mx-auto">
          <TrainingControls
            settings={settings}
            onSettingsChange={setSettings}
            onStartTraining={handleStartTraining}
          />
        </div>
      ) : gameState ? (
        <div className="max-w-2xl mx-auto">
          <TrainingScenario
            gameState={gameState}
            onDecision={handleDecision}
            onNextHand={generateNewHand}
          />
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsTraining(false)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Back to Settings
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default Training;