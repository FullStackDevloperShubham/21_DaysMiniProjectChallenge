import { useState } from "react";

const Home = () => {
  // handle state for input data
  const [inputName, setInputName] = useState({
    name: "",
  });

  // handle state for API data
  const [data, setData] = useState([]);

  // handle onClick
  const handleOnClick = async () => {
    try {
      // API KEY and API URL
      let API_URL = `https://api.api-ninjas.com/v1/swiftcode?swift=${inputName.name}`;
      let API_KEY = "B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW";

      const response = await fetch(API_URL, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });

      let responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Bank Details Using SWIFT Code
        </h1>

        <label htmlFor="name" className="block text-gray-600 text-sm mb-1">
          Enter The SWIFT Code:
        </label>

        <input
          type="text"
          value={inputName.name}
          onChange={(event) =>
            setInputName({ ...inputName, name: event.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="e.g., BOFAUS3N"
        />

        <button
          onClick={handleOnClick}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Get Bank Information
        </button>

        {/* Display data */}
        {data.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {data.map((values, index) => (
              <li
                key={index}
                className="bg-gray-50 p-3 rounded-md shadow-sm border border-gray-200"
              >
                <p className="text-gray-700">
                  <span className="font-semibold">City:</span> {values.city}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Country:</span> {values.country}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Country Code:</span> {values.country_code}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">SWIFT Code:</span> {values.swift_code}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500 text-center">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
