import { useState } from "react";

const Home = () => {
  // 📌 Handle state for input value
  const [inputData, setInputData] = useState({ value: "" });

  // 📊 Handle state for API data
  const [data, setData] = useState([]);

  // 🚀 Handle submit button
  const handleSubmit = async () => {
    try {
      // 🌐 API Details
      let API_URL = `https://api.api-ninjas.com/v1/marketcap?ticker=${inputData.value}`;
      let API_KEY = "B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW";

      // 🔄 Fetch Data
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "X-Api-Key": API_KEY,
        },
      });

      let result = await response.json();

      // 🔍 Convert object to array before setting state
      setData(result && typeof result === "object" ? [result] : []);

      console.log(result);
    } catch (error) {
      console.error("❌ Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          📈 Market Cap Finder
        </h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="🔎 Enter the ticker..."
            value={inputData.value}
            onChange={(e) =>
              setInputData({ ...inputData, value: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-400 outline-none"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            📊 Get Data
          </button>
        </div>

        {/* 📃 Display API Data */}
        {data.length > 0 ? (
          <div className="mt-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-md mb-4"
              >
                <p className="text-lg font-semibold text-gray-800">
                  🔖 Ticker: <span className="text-blue-600">{item.ticker}</span>
                </p>
                <p className="text-gray-700">
                  🏢 Name: <span className="font-medium">{item.name}</span>
                </p>
                <p className="text-gray-700">
                  💰 Market Cap:{" "}
                  <span className="font-medium">
                    ${item.market_cap.toLocaleString()}
                  </span>
                </p>
                <p className="text-gray-600 text-sm">
                  ⏳ Last Updated:{" "}
                  <span className="font-medium">
                    {new Date(item.updated).toLocaleDateString()}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-4">⚠️ No data available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
