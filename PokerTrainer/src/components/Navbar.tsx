
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Poker GTO Trainer
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/training">
            <Button variant="ghost">Training</Button>
          </Link>
          <Link to="/stats">
            <Button variant="ghost">Stats</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;