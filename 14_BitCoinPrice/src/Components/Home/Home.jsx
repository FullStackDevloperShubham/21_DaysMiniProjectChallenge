import { useEffect, useState } from "react";

const BitcoinData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let API_URL = "https://api.api-ninjas.com/v1/bitcoin";
            let API_KEY = "B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW";

            try {
                const response = await fetch(API_URL, {
                    headers: {
                        "X-Api-Key": API_KEY,
                    },
                });
                const jsonData = await response.json();

                // Convert object to array and format timestamp if available
                const arrayData = Object.entries(jsonData).map(([key, value]) => ({
                    key,
                    value: key.includes("timestamp") ? new Date(value * 1000).toLocaleString() : value,
                }));

                setData(arrayData);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    Bitcoin Data 📈
                </h2>
                <ul className="space-y-3">
                    {data.map((item, index) => (
                        <li
                            key={index}
                            className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
                        >
                            <span className="font-semibold text-gray-700">{item.key}:</span>
                            <span className="text-gray-900">{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BitcoinData;
