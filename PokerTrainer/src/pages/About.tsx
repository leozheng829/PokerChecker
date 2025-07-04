import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">About Poker GTO Trainer</h1>
        <p className="text-muted-foreground">
          Learn more about GTO poker and how to use this trainer
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What is GTO Poker?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Game Theory Optimal (GTO) poker is a strategy that aims to make
            mathematically balanced decisions that cannot be exploited by
            opponents, regardless of their playing style. Unlike exploitative
            play, which adjusts to take advantage of specific opponents'
            tendencies, GTO focuses on playing a balanced, unexploitable
            strategy.
          </p>
          <p>Key concepts in GTO poker include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Equity:</strong> Your share of the pot based on the
              probability of winning the hand.
            </li>
            <li>
              <strong>Pot Odds:</strong> The ratio of the current pot size to
              the cost of a contemplated call.
            </li>
            <li>
              <strong>Expected Value (EV):</strong> The average amount you can
              expect to win or lose on a bet.
            </li>
            <li>
              <strong>Balanced Ranges:</strong> Playing a mix of hands in a way
              that makes it difficult for opponents to exploit you.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Trainer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            This trainer focuses specifically on helping you practice
            equity-based calling decisions. Here's how it works:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Configure your training:</strong> Select which streets
              (preflop, flop, turn, river) you want to practice, the number of
              players at the table, and your difficulty level.
            </li>
            <li>
              <strong>Analyze the scenario:</strong> You'll be presented with
              your hole cards, community cards (if applicable), the current pot
              size, and the amount you need to call.
            </li>
            <li>
              <strong>Make your decision:</strong> Decide whether to call or
              fold based on your assessment of your equity versus the pot odds.
            </li>
            <li>
              <strong>Get feedback:</strong> The trainer will tell you if your
              decision was correct according to GTO principles and explain why.
            </li>
            <li>
              <strong>Track your progress:</strong> View your statistics to see
              how you're improving over time and which areas need more work.
            </li>
          </ol>
          <div className="bg-muted p-3 rounded-md text-sm">
            <strong>Clarifications:</strong>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Pot size</strong> shown <u>does not</u> include the
                amount you need to call. For example, if the pot is 16 and an
                opponent bets 30, the pot size is 16 and the amount to call is
                30. If you call, the total pot after your call will be 16 + 30 +
                30 = 76 (your call plus the opponent's bet plus the original
                pot).
              </li>
              <li>
                <strong>Pot odds</strong> are calculated as:{" "}
                <code>call amount / (pot size + call amount)</code>. For
                example, if the pot is 16 and you need to call 30, your pot odds
                are 30 / (16 + 30) = 65.2%.
              </li>
              <li>
                <strong>Assumption:</strong> There are no players left to act
                behind you. The scenario is heads-up between you and the bettor.
              </li>
              <li>
                <strong>Equity</strong> is a simplified estimate based on your
                hand, the board, and the number of players. It does not account
                for advanced factors or exact opponent ranges.
              </li>
              <li>
                <strong>Explanations</strong> are generated automatically based
                on the scenario and the logic in the app. The odds and correct
                play are determined by comparing your estimated equity to your
                pot odds.
              </li>
            </ul>
          </div>
          <p className="mt-4">
            <strong>Note:</strong> This trainer uses simplified equity
            calculations for educational purposes. In real poker, exact equity
            calculations are more complex and depend on many factors.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Making GTO Calling Decisions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The fundamental principle behind GTO calling decisions is comparing
            your equity to the pot odds:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>If your equity &gt; pot odds:</strong> Calling is
              profitable in the long run.
            </li>
            <li>
              <strong>If your equity &lt; pot odds:</strong> Folding is the
              correct decision.
            </li>
          </ul>
          <p>
            For example, if you need to call 25 into a pot of 75 (total pot will
            be 100), your pot odds are 25/100 = 25%. If you estimate your equity
            (chance of winning) to be 30%, then calling is profitable because
            30% &gt; 25%.
          </p>
          <p>
            Over time, practicing these decisions will help you develop an
            intuitive sense for when to call and when to fold based on GTO
            principles.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Link to="/training">
          <Button>Start Training Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
