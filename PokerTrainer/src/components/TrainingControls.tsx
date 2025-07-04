
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Street, TrainingSettings } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface TrainingControlsProps {
  settings: TrainingSettings;
  onSettingsChange: (settings: TrainingSettings) => void;
  onStartTraining: () => void;
}

const TrainingControls: React.FC<TrainingControlsProps> = ({
  settings,
  onSettingsChange,
  onStartTraining,
}) => {
  const handleStreetToggle = (street: Street) => {
    const newStreets = settings.streets.includes(street)
      ? settings.streets.filter((s) => s !== street)
      : [...settings.streets, street];
    
    // Ensure at least one street is selected
    if (newStreets.length > 0) {
      onSettingsChange({ ...settings, streets: newStreets });
    }
  };

  const handlePlayerCountChange = (min: number, max: number) => {
    onSettingsChange({
      ...settings,
      playerCountRange: [min, max],
    });
  };

  const handleDifficultyChange = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    onSettingsChange({
      ...settings,
      difficulty,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Training Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Streets</h3>
          <div className="flex flex-wrap gap-2">
            {(['preflop', 'flop', 'turn', 'river'] as Street[]).map((street) => (
              <Button
                key={street}
                variant={settings.streets.includes(street) ? 'default' : 'outline'}
                onClick={() => handleStreetToggle(street)}
                className="capitalize"
              >
                {street}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Number of Players</h3>
          <Tabs
            defaultValue="heads-up"
            onValueChange={(value) => {
              if (value === 'heads-up') handlePlayerCountChange(2, 2);
              else if (value === '3-4') handlePlayerCountChange(3, 4);
              else if (value === '5-6') handlePlayerCountChange(5, 6);
              else if (value === '7-9') handlePlayerCountChange(7, 9);
            }}
            value={
              settings.playerCountRange[1] === 2
                ? 'heads-up'
                : settings.playerCountRange[1] <= 4
                ? '3-4'
                : settings.playerCountRange[1] <= 6
                ? '5-6'
                : '7-9'
            }
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="heads-up">Heads-up</TabsTrigger>
              <TabsTrigger value="3-4">3-4 players</TabsTrigger>
              <TabsTrigger value="5-6">5-6 players</TabsTrigger>
              <TabsTrigger value="7-9">7-9 players</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Difficulty</h3>
          <Select
            value={settings.difficulty}
            onValueChange={(value: any) => handleDifficultyChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onStartTraining} className="w-full">
          Start Training
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingControls;