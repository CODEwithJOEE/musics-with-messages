import { useState, useRef, useEffect } from "react";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";

const SongCard = ({ song, isActive, onActivate, onDeactivate }) => {
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // For collapsible message
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  // 1. Initialize the YouTube Player
  useEffect(() => {
    let isCancelled = false;

    const createPlayer = () => {
      if (isCancelled || !containerRef.current || playerRef.current) return;

      // Isolated div for YouTube API
      const playerTarget = document.createElement("div");
      playerTarget.id = `yt-player-${song.id}`;
      playerTarget.className = "w-full h-full";
      containerRef.current.appendChild(playerTarget);

      playerRef.current = new window.YT.Player(playerTarget.id, {
        videoId: song.youtubeId,
        playerVars: {
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === 1) {
              onActivate(song.id); // 1 = PLAYING
            } else if (event.data === 0) {
              onDeactivate(); // 0 = ENDED
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        createPlayer();
      };
    }

    return () => {
      isCancelled = true;
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [song.id, song.youtubeId]);

  // 2. Stop video if another is active
  useEffect(() => {
    if (
      !isActive &&
      playerRef.current &&
      typeof playerRef.current.getPlayerState === "function"
    ) {
      const state = playerRef.current.getPlayerState();
      if (state === 1 || state === 3) {
        playerRef.current.stopVideo();
      }
    }
  }, [isActive]);

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100 h-full">
      {/* Image Container */}
      <div className="relative h-72 w-full shrink-0 bg-gradient-to-br from-rose-100 to-rose-200 overflow-hidden">
        {!imgError ? (
          <img
            src={song.image}
            alt={song.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-rose-400">
            <Heart className="w-16 h-16 fill-rose-300 mb-2" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              {song.artist}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-rose-900/10 group-hover:bg-rose-900/20 transition-colors pointer-events-none" />

        {/* "Playing" Badge */}
        {isActive && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg z-10">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Playing
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1 gap-2">
          <h3 className="font-bold text-xl text-slate-800 leading-tight">
            {song.title}
          </h3>
          <Heart className="text-rose-400 w-5 h-5 fill-rose-400 shrink-0" />
        </div>
        <p className="text-rose-500 font-semibold mb-4 text-xs uppercase tracking-widest">
          {song.artist}
        </p>

        {/* Collapsible Memory Text */}
        <div
          className="bg-rose-50 p-4 rounded-xl border-l-4 border-rose-200 mb-4 cursor-pointer hover:bg-rose-100/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <p
            className={`text-slate-600 text-sm italic ${isExpanded ? "" : "line-clamp-3"}`}
          >
            "{song.memory}"
          </p>
          <button
            className="flex items-center gap-1 text-xs text-rose-500 font-bold mt-2 uppercase tracking-wider"
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <>
                Read Less <ChevronUp size={14} />
              </>
            ) : (
              <>
                Read More <ChevronDown size={14} />
              </>
            )}
          </button>
        </div>

        {/* Responsive Video Container */}
        <div className="mt-auto pt-2">
          <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden shadow-inner bg-black">
            <div
              ref={containerRef}
              className="absolute top-0 left-0 w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
