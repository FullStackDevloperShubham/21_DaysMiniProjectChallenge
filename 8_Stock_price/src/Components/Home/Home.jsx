import { useState } from "react";

const Home = () => {
  // Manage state for stock ticker symbol
  const [stockTicker, setStockTicker] = useState("");
  const [data, setData] = useState(null);

  // Handle input change
  const handleChange = (event) => {
    setStockTicker(event.target.value);
  };

  // Fetch API data when submit button is clicked
  const handleSubmit = () => {
    if (!stockTicker) return; // Prevent empty input submission

    const API_KEY = "B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW";
    const API_URL = `https://api.api-ninjas.com/v1/stockprice?ticker=${stockTicker}`;

    fetch(API_URL, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data)) // Store API response
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📈 Stock Price Checker</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <label htmlFor="stock-price" className="block text-lg font-medium text-gray-700">
            Enter Stock Ticker
          </label>
          <input
            type="text"
            value={stockTicker}
            placeholder="Stock ticker symbol (e.g., AAPL)"
            name="stock-price"
            id="stock-price"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />
          
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Get Stock Price
          </button>
        </form>
      </div>

      {/* Display API data if available */}
      {data && (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📈 Stock Price Checker 💹</h2>
          <div className="text-gray-700 text-lg space-y-2">
            <p><span className="font-semibold">📌 Ticker:</span> {data.ticker}</p>
            <p><span className="font-semibold">🏢 Name:</span> {data.name}</p>
            <p><span className="font-semibold">💰 Price:</span> {data.price} {data.currency}</p>
            <p><span className="font-semibold">🏛️ Exchange:</span> {data.exchange}</p>
            <p><span className="font-semibold">📅 Updated:</span> {new Date(data.updated).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
