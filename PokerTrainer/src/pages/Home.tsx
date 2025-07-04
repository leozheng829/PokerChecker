
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Poker GTO Trainer</h1>
        <p className="text-xl text-muted-foreground">
          Master equity-based calling decisions with GTO principles
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Practice Mode</CardTitle>
            <CardDescription>
              Train your decision-making skills with realistic poker scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Get instant feedback on your calling decisions based on pot odds and equity calculations.
              Practice across different streets and player counts to improve your GTO play.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/training" className="w-full">
              <Button className="w-full">Start Training</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Track Your Progress</CardTitle>
            <CardDescription>
              Monitor your performance and see your improvement over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              View detailed statistics on your decision-making accuracy, broken down by street and player count.
              Identify your strengths and weaknesses to focus your training.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/stats" className="w-full">
              <Button variant="outline" className="w-full">View Stats</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>What is GTO Poker?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Game Theory Optimal (GTO) poker is a strategy that aims to make decisions that are unexploitable by opponents.
              It's based on mathematical principles rather than exploitative play.
            </p>
            <p>
              A key concept in GTO poker is making decisions based on pot odds and equity. When your equity in a hand exceeds
              the pot odds you're being offered, calling is the mathematically correct play in the long run.
            </p>
            <p>
              This trainer focuses specifically on helping you practice equity-based calling decisions across different
              scenarios, streets, and player counts. With regular practice, you'll develop an intuitive sense for when
              to call and when to fold based on GTO principles.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/about" className="w-full">
              <Button variant="outline" className="w-full">Learn More</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;