import React from 'react';
import { Heart } from 'lucide-react';

const SongCard = ({ song }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100">
      <div className="relative aspect-[3/4] sm:aspect-square">
        <img 
          src={song.image} 
          alt={song.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-rose-900/10 group-hover:bg-rose-900/20 transition-colors" />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-xl text-slate-800 leading-tight">{song.title}</h3>
          <Heart className="text-rose-400 w-5 h-5 fill-rose-400" />
        </div>
        <p className="text-rose-500 font-semibold mb-4 text-xs uppercase tracking-widest">{song.artist}</p>
        
        <div className="bg-rose-50 p-4 rounded-xl italic text-slate-600 text-sm border-l-4 border-rose-200 mb-4">
          "{song.memory}"
        </div>

<div className="mt-4 overflow-hidden rounded-xl shadow-inner bg-black aspect-video">
  <iframe
    width="100%"
    height="100%"
    src={`https://www.youtube.com/embed/${song.youtubeId}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>
      </div>
    </div>
  );
};

export default SongCard;