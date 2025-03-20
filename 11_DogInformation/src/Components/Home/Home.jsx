import { useState } from "react";

const Home = () => {
  // Input state management
  const [dogName, setDogName] = useState({ name: "" });

  // Store API response
  const [data, setData] = useState([]);

  console.log(data)

  // Handle submit button
  const handleSubmit = async (event) => {
    event.preventDefault();
    const API_KEY = "B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW";

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/dogs?name=${dogName.name}`,
        {
          headers: { "X-Api-Key": API_KEY },
        }
      );

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching dog data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <label htmlFor="dog-name" className="block text-lg font-semibold mb-2">
          Dog Breed Name
        </label>
        <input
          id="dog-name"
          type="text"
          value={dogName.name}
          placeholder="golden retriever"
          onChange={(e) => setDogName({ ...dogName, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white font-semibold py-2 mt-4 rounded-md hover:bg-blue-600 transition"
        >
          Get Information
        </button>
      </div>

      {/* Display Data */}
      {data.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-2xl text-gray-700">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            {data[0].name}
          </h2>
          <img
            src={data[0].image_link}
            alt={data[0].name}
            className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
          />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><strong>Barking:</strong> {data[0].barking}</p>
            <p><strong>Good with Children:</strong> {data[0].good_with_children}</p>
            <p><strong>Good with Other Dogs:</strong> {data[0].good_with_other_dogs}</p>
            <p><strong>Shedding:</strong> {data[0].shedding}</p>
            <p><strong>Grooming:</strong> {data[0].grooming}</p>
            <p><strong>Drooling:</strong> {data[0].drooling}</p>
            <p><strong>Coat Length:</strong> {data[0].coat_length}</p>
            <p><strong>Good with Strangers:</strong> {data[0].good_with_strangers}</p>
            <p><strong>Playfulness:</strong> {data[0].playfulness}</p>
            <p><strong>Protectiveness:</strong> {data[0].protectiveness}</p>
            <p><strong>Trainability:</strong> {data[0].trainability}</p>
            <p><strong>Energy Level:</strong> {data[0].energy}</p>
            <p><strong>Life Expectancy:</strong> {data[0].min_life_expectancy} - {data[0].max_life_expectancy} years</p>
            <p><strong>Height (Male):</strong> {data[0].min_height_male} - {data[0].max_height_male} cm</p>
            <p><strong>Height (Female):</strong> {data[0].min_height_female} - {data[0].max_height_female} cm</p>
            <p><strong>Weight (Male):</strong> {data[0].min_weight_male} - {data[0].max_weight_male} kg</p>
            <p><strong>Weight (Female):</strong> {data[0].min_weight_female} - {data[0].max_weight_female} kg</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
