import { useState, useEffect } from "react";

const Home = () => {
  // useState for data handling
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API details
  let API_URL = "https://api.api-ninjas.com/v1/advice";
  let API_KEY = "B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW";

  useEffect(() => {
    fetch(API_URL, {
      headers: { "X-Api-Key": API_KEY },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch advice 😞");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-400 text-white p-6">
      <div className="bg-white/20 backdrop-blur-lg rounded-lg p-6 shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
          💡 Life Advice
        </h1>
        {loading ? (
          <p className="text-lg animate-pulse">⏳ Loading advice...</p>
        ) : error ? (
          <p className="text-lg text-red-300">{error}</p>
        ) : (
          <p className="text-xl font-semibold">"{data.advice}" ✨</p>
        )}
      </div>
    </div>
  );
};

export default Home;