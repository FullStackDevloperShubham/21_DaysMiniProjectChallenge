import { useEffect, useState } from 'react';

function Home() {

    const [data,setData] = useState([])
    
  useEffect(() => {
    const fetchData = async () => {
      const API_URL = 'https://api.api-ninjas.com/v1/quotes';
      const API_KEY = 'B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW';

      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'X-Api-Key': API_KEY,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result)
        console.log(data)
        console.log(result);
      } catch (error) {
        console.error('Error: ', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
    {/* Title */}
    <h1 className="text-4xl font-bold text-white mb-10 drop-shadow-lg">
      ✨ Quote Generator ✨
    </h1>
  
    {/* Quotes Container */}
    <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
      {data.map((quotes, index) => (
        <div
          key={index}
          className="w-80 h-80 overflow-auto p-6 bg-white shadow-2xl rounded-2xl border border-gray-300 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          <p className="text-lg font-semibold text-gray-800 italic border-l-4 border-blue-500 pl-3">
            "{quotes.quote}"
          </p>
          <h4 className="mt-4 text-blue-600 font-semibold">🖊 Writer: {quotes.author}</h4>
          <h6 className="mt-2 text-gray-500">📌 Category: {quotes.category}</h6>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Home;
