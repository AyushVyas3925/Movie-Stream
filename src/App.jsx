import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [moodQuery, setMoodQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-zinc-950 text-slate-100 font-sans">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        moodQuery={moodQuery}
        setMoodQuery={setMoodQuery}
      />

      <main className="flex-grow w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} moodQuery={moodQuery} />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
