import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import PokerHand from "./PokerHand";
import { GameState, TrainingResult } from "@/lib/types";
import { formatCard } from "@/lib/poker";

interface TrainingScenarioProps {
  gameState: GameState;
  onDecision: (decision: boolean, result: TrainingResult) => void;
  onNextHand: () => void;
}

const TrainingScenario: React.FC<TrainingScenarioProps> = ({
  gameState,
  onDecision,
  onNextHand,
}) => {
  const [decision, setDecision] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    playerHand,
    communityCards,
    street,
    playerCount,
    potSize,
    betToCall,
    isGoodCall,
    explanation,
  } = gameState;

  const handleDecision = (callDecision: boolean) => {
    if (decision !== null) return;

    const isCorrect = callDecision === isGoodCall;
    setDecision(callDecision);

    const result: TrainingResult = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      gameState,
      userDecision: callDecision,
      isCorrect,
    };

    onDecision(callDecision, result);
    setShowExplanation(true);
  };

  const handleNextHand = () => {
    setDecision(null);
    setShowExplanation(false);
    onNextHand();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {street.charAt(0).toUpperCase() + street.slice(1)} Decision
          </span>
          <span className="text-sm font-normal">{playerCount} players</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Your Hand</h3>
          <PokerHand cards={playerHand} size="md" />
        </div>

        {communityCards.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Community Cards</h3>
            <PokerHand cards={communityCards} size="md" />
          </div>
        )}

        <div className="bg-muted p-4 rounded-md">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Pot Size:</span>
            <span>{potSize}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Bet to Call:</span>
            <span>{betToCall}</span>
          </div>
        </div>

        {decision !== null && (
          <div
            className={`p-4 rounded-md ${
              decision === isGoodCall
                ? "bg-green-100 dark:bg-green-900"
                : "bg-red-100 dark:bg-red-900"
            }`}
          >
            <p className="font-bold mb-2">{isGoodCall ? "✓" : "✗"}</p>
            <p>The correct decision was to {isGoodCall ? "call" : "fold"}.</p>
          </div>
        )}

        {showExplanation && (
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Explanation:</h3>
            <p className="whitespace-pre-line">{explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        {decision === null ? (
          <>
            <Button
              variant="outline"
              className="w-1/2"
              onClick={() => handleDecision(false)}
            >
              Fold
            </Button>
            <Button className="w-1/2" onClick={() => handleDecision(true)}>
              Call {betToCall}
            </Button>
          </>
        ) : (
          <Button className="w-full" onClick={handleNextHand}>
            Next Hand
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TrainingScenario;
