import { useState } from "react";

const Home = () => {
    // State management for input
    const [inputData, setInputData] = useState({ value: '' });

    // State management for API data
    const [data, setData] = useState(null);

    // Handle onClick
    const handleOnClick = async () => {
        try {
            if (!inputData.value) {
                alert("Please enter a phone number.");
                return;
            }

            // API details
            const API_URL = `https://api.api-ninjas.com/v1/validatephone?number=+91${inputData.value}`;
            const API_KEY = 'B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW'; // Move to backend

            // Fetch data
            const response = await fetch(API_URL, {
                headers: {
                    'X-Api-Key': API_KEY
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            // Parse data
            const result = await response.json();

            // Update state with data
            setData(result);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Phone Number Validator</h2>
                
                <label htmlFor="number" className="block text-gray-700 text-sm font-medium mb-1">
                    Enter The Number
                </label>
                
                <input
                    type="number"
                    id="number"
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
                    placeholder="Enter phone number"
                    value={inputData.value}
                    onChange={(event) => setInputData({ ...inputData, value: event.target.value })}
                />
                
                <button
                    onClick={handleOnClick}
                    className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Get Number Meta Data
                </button>
            </div>

            {/* Display the data */}
            {data && (
                <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Phone Number Details</h3>
                    <div className="space-y-2 text-gray-700">
                        <p><strong>Country:</strong> {data.country || "N/A"}</p>
                        <p><strong>Country Code:</strong> {data.country_code || "N/A"}</p>
                        <p><strong>Format (E.164):</strong> {data.format_e164 || "N/A"}</p>
                        <p><strong>Format (International):</strong> {data.format_international || "N/A"}</p>
                        <p><strong>Format (National):</strong> {data.format_national || "N/A"}</p>
                        <p><strong>Formatted Properly:</strong> {data.is_formatted_properly ? "Yes" : "No"}</p>
                        <p><strong>Valid:</strong> {data.is_valid ? "Yes" : "No"}</p>
                        <p><strong>Location:</strong> {data.location || "N/A"}</p>
                        <p><strong>Timezone:</strong> {data.timezones?.[0] || "N/A"}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
