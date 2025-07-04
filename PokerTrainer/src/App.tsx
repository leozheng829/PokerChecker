
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Training from './pages/Training';
import Stats from './pages/Stats';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="poker-trainer-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/training" element={<Training />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;