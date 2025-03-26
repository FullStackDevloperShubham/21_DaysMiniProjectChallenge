import { useState } from "react";

const Home = () => {
  // 📌 State for input data
  const [inputData, setInputData] = useState({ value: "" });

  // 📌 State for API response data
  const [data, setData] = useState([]);

  // 🎯 Fetch data from API on button click
  const HandleOnClick = async () => {
    try {
      let API_URL = `https://api.api-ninjas.com/v1/commodityprice?name=${inputData.value}`;
      let API_KEY = "B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW";

      const response = await fetch(API_URL, {
        headers: { "X-Api-Key": API_KEY },
      });

      let apiResponse = await response.json();
      setData(apiResponse);
    } catch (error) {
      console.error("❌ Error while fetching data:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {/* 🔍 Search Box */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">📊 Commodity Price Finder</h1>

        <label htmlFor="name" className="block text-lg font-medium text-gray-700">
          🔎 Enter The Commodity Name
        </label>

        <input
          type="text"
          value={inputData.value}
          onChange={(event) => setInputData({ ...inputData, value: event.target.value })}
          className="w-full mt-2 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Gold, Silver 🏆"
        />

        <button
          onClick={HandleOnClick}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          📡 Get Details
        </button>
      </div>

      {/* 📋 Display Data */}
      {data.length > 0 && (
        <div className="mt-6 w-full max-w-lg bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📌 Commodity Details</h2>
          {data.map((item, index) => (
            <div key={index} className="border-b py-2">
              <h3 className="text-lg font-medium text-gray-700">
                🌍 Exchange: <span className="text-gray-900 font-semibold">{item.exchange || "N/A"}</span>
              </h3>
              <h3 className="text-lg font-medium text-gray-700">
                📛 Name: <span className="text-gray-900 font-semibold">{item.name || "N/A"}</span>
              </h3>
              <h3 className="text-lg font-medium text-gray-700">
                💰 Price: <span className="text-gray-900 font-semibold">{item.price || "N/A"}</span>
              </h3>
              <h3 className="text-lg font-medium text-gray-700">
                🗓️ Date:{" "}
                <span className="text-gray-900 font-semibold">
                  {item.updated ? new Date(item.updated).toLocaleDateString() : "N/A"}
                </span>
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
