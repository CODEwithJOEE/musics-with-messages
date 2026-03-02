import React, { useState } from 'react';
import { Heart } from 'lucide-react'; // Added this
import { songs } from './data/songs';
import SongCard from './components/SongCard';

function App() {
  // Move the state INSIDE the function
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fffafa]">
      {/* Hero Section */}
      <header className="py-24 px-6 text-center">
        <span className="text-rose-400 font-bold tracking-[0.2em] text-sm uppercase">Our Personal Vinyl</span>
        <h1 className="text-6xl font-black text-slate-900 mt-2 mb-6">
          The Soundtrack <br/> <span className="text-rose-600">to Us.</span>
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
          Every song here is a piece of us. Click play and let's go back to these moments together.
        </p>
      </header>

      {/* Grid */}
      <main className="max-w-6xl mx-auto pb-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </main>

      {/* Secret Message Section */}
      <section className="max-w-2xl mx-auto mb-24 px-6 text-center">
        {!isOpen ? (
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-rose-600 text-white px-8 py-4 rounded-full font-bold hover:bg-rose-700 transition-all shadow-lg hover:shadow-rose-200 flex items-center gap-2 mx-auto cursor-pointer"
          >
            Click for a final surprise <Heart size={18} />
          </button>
        ) : (
          <div className="animate-in fade-in zoom-in duration-700 bg-white border-2 border-dashed border-rose-200 rounded-3xl p-10 shadow-sm">
            <p className="text-slate-600 leading-relaxed text-lg italic">
              "Baby, I know lagi tayo nag aaway, may mga misunderstandings na nagyayari, pero sana wag mo naman ihantong sa separation. I LOVE YOU SO MUCH. I will fight this no matter what, madami pa akong gagawin kasama ka, babawi pa ako. So please Stay, I LOVE YOU ALWAYS.."
            </p>
            <div className="mt-4 text-rose-500 font-bold tracking-widest text-sm uppercase">— Forever yours</div>
          </div>
        )}
      </section>

      <footer className="py-12 border-t border-rose-100 text-center">
        <p className="text-rose-300 font-medium">I love you more than words (or code) can say.</p>
      </footer>
    </div>
  );
}

export default App;