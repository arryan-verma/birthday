import React, { useState, useEffect } from "react";
import { useRef } from "react";
import "tailwindcss/tailwind.css";

function FloatingLetters() {
  const letters = "Happy Birthday".split("");
  const [fallingLetters, setFallingLetters] = useState([]);

  useEffect(() => {
    const newLetters = letters.map((letter, index) => ({
      letter,
      key: index,
      animationDelay: `${Math.random() * 3}s`,
      positionX: Math.random() * 100,
      fallDuration: `${Math.random() * 5 + 3}s`,
    }));
    setFallingLetters(newLetters);
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center pointer-events-none z-10">
      <div className="flex space-x-2 flex-wrap justify-center sm:space-x-1 md:space-x-2 lg:space-x-3">
        {fallingLetters.map(({ letter, key, animationDelay, positionX, fallDuration }) => (
         <div
         key={key}
         className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gradient opacity-80 transform"
         style={{
           animation: `fall ${fallDuration} linear infinite, float 7s ease-in-out forwards, rotate 3s ease-in-out forwards`,
           animationDelay,
           left: `${positionX}%`,
           transform: `rotate(${Math.random() * 30 - 15}deg)`,
           background: "linear-gradient(90deg, rgba(255, 0, 150, 1) 0%, rgba(0, 204, 255, 1) 100%)",
           WebkitBackgroundClip: "text",
           color: "yellow",
           textShadow: `0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 0, 150, 0.5)`,
           whiteSpace: "nowrap",  // Added this line to prevent line breaks
         }}
       >
         {letter}
       </div>
        ))}
      </div>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100vh) scale(0.8); opacity: 0.5; }
          100% { transform: translateY(100vh) scale(1); opacity: 1; }
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const KeywordPage = ({ onCorrectKeyword }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const correctKeyword = "bhutpie"; // Predefined key

  const handleSubmit = () => {
    if (input.toLowerCase() === correctKeyword.toLowerCase()) {
      onCorrectKeyword();
    } else {
      setError("Incorrect keyword. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 sm:px-8 md:px-12 lg:px-16">
      <input
        type="text"
        className="px-4 py-2 text-black rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md"
        placeholder="Enter keyword"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit} className="px-4 py-2 mt-4 bg-blue-500 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md">
        Submit
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

function FloatingLanterns() {
  const [lanterns, setLanterns] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random().toString(36).substr(2, 9);
      const lantern = {
        id,
        left: Math.random() * 100,
        size: Math.random() * 30 + 50,
        delay: Math.random() * 5,
        animationDuration: Math.random() * 9 + 10 + "s",
      };
      setLanterns((prev) => [...prev, lantern]);

      setTimeout(() => {
        setLanterns((prev) => prev.filter((el) => el.id !== id));
      }, parseFloat(lantern.animationDuration) * 1000);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {lanterns.map((lantern) => (
        <div
          key={lantern.id}
          className="absolute animate-lantern"
          style={{
            left: `${lantern.left}%`,
            width: `${lantern.size}px`,
            height: `${lantern.size}px`,
            animationDuration: lantern.animationDuration,
            animationDelay: `${lantern.delay}s`,
            bottom: "0",
          }}
        >
          <div
            className="w-full h-full bg-gradient-to-r from-yellow-400 to-blue-400 rounded-full shadow-lg"
            style={{
              borderRadius: "50%",
              boxShadow: `0 4px 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.5)`,
            }}
          ></div>
        </div>
      ))}
      <style>{`
        @keyframes lantern {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-lantern {
          animation: lantern linear forwards;
        }
      `}</style>
    </div>
  );
}

function MoonAndStars() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-28 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-yellow-500 bg-opacity-50 rounded-full shadow-lg backdrop-blur-lg"></div>

      {Array.from({ length: 100 }).map((_, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-full opacity-70 animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.2;
          }
        }
        .animate-twinkle {
          animation: twinkle 2s infinite;
        }
      `}</style>
    </div>
  );
}

const HomePage = ({ onKeywordEnter }) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: 'url(/assets/log.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        objectFit: 'cover',
      }}
    >
     <div className="text-center sm:text-left flex  mr-48">
  <button onClick={onKeywordEnter}>
    <img 
      src="/assets/svg.svg" 
      alt="Enter Icon" 
      className="w-16 h-14 sm:w-20 sm:h-16 text-white"
    />
  </button>
</div>

    </div>
  );
};

function RomanticNight({ onBack }) {
  const [showMessage, setShowMessage] = useState(false);
  const audioRef = useRef(null);
    useEffect(() => {
      audioRef.current = new Audio('/assets/AUDIO.mp3');
      audioRef.current.loop = true; // Enable looping
      audioRef.current.play().catch(error => console.log("Audio play failed:", error));
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }, []);

  useEffect(() => {
    setTimeout(() => setShowMessage(true), 5000);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-gray-900">
      <MoonAndStars />
      <FloatingLanterns />
      <FloatingLetters />
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-xl p-6 text-center backdrop-blur-sm bg-opacity-50 bg-rose-700-400 shadow-2xl absolute bottom-10 left-1/2 transform -translate-x-1/2 px-4 sm:px-6 md:px-8">
  {showMessage && (
    <div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient text-yellow-200 mb-4 transform scale-110 transition-transform duration-300 ease-out text-shadow-lg">
        My Dearest Love Kritika
      </h1>
      <p className="mt-4 text-base sm:text-lg md:text-xl text-gradient text-white">
        Under the moonlight, my heart beats for you. Every star in the sky reminds me of your beauty and the love we share. Tonight, let's make memories that will last a lifetime. ❤️
      </p>
    </div>
  )}
  <div className="mt-12">
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-yellow-200">A Special Message for You:</h2>
    <p className="text-sm sm:text-base md:text-lg text-white">
      "Count your life by smiles, not tears. Count your age by friends, not years. Happiest birthday! 🥳🎂 My lovely Cutie 🥰 I love you, my darling."
    </p>
  </div>
  <button
    onClick={onBack}
    className="mt-6 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300 transform hover:scale-105 shadow-lg"
  >
    Back to Home
  </button>
</div>


    </div>
  );
}

const App = () => {
  const [keywordEntered, setKeywordEntered] = useState(false);
  const [showRomanticNight, setShowRomanticNight] = useState(false);

  return (
    <div>
      {!keywordEntered ? (
        <KeywordPage onCorrectKeyword={() => setKeywordEntered(true)} />
      ) : showRomanticNight ? (
        <RomanticNight onBack={() => setShowRomanticNight(false)} />
      ) : (
        <HomePage onKeywordEnter={() => setShowRomanticNight(true)} />
      )}
    </div>
  );
};

export default App;
