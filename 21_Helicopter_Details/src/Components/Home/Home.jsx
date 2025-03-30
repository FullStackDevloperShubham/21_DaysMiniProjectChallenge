import { useState } from 'react';

const Home = () => {
    const [inputData, setInputData] = useState({ manufacture: '', model: '' });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            let API_URL = `https://api.api-ninjas.com/v1/helicopter?manufacturer=${inputData.manufacture}&model=${inputData.model}`;
            let API_KEY = 'B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW';

            const response = await fetch(API_URL, {
                headers: { 'X-Api-Key': API_KEY }
            });

            if (!response.ok) throw new Error('API error');

            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                <label htmlFor="manufacture" className="block text-gray-700 font-medium">Manufacturer</label>
                <input
                    type="text"
                    id="manufacture"
                    placeholder="Enter Manufacturer Bell.."
                    value={inputData.manufacture}
                    onChange={(event) => setInputData({ ...inputData, manufacture: event.target.value })}
                    className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label htmlFor="model" className="block mt-4 text-gray-700 font-medium">Model</label>
                <input
                    type="number"
                    id="model"
                    placeholder="Enter model 206"
                    value={inputData.model}
                    onChange={(event) => setInputData({ ...inputData, model: event.target.value })}
                    className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="button"
                    onClick={fetchData}
                    disabled={loading}
                    className={`mt-4 w-full p-2 text-white font-medium rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {loading ? 'Fetching...' : 'Fetch Data'}
                </button>

                {loading && <p className="mt-2 text-blue-500">Loading...</p>}

                {data.length > 0 ? (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        {data.map((item, index) => (
                            <div key={index} className="mb-2 p-2 bg-white shadow-md rounded-lg">
                                <ul className="text-gray-700">
                                    {Object.entries(item).map(([key, value]) => (
                                        <li key={key} className="py-1 border-b last:border-b-0">{key}: {value || "N/A"}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && <p className="mt-4 text-gray-500">No data available</p>
                )}
            </div>

        </>
    );
};

export default Home;
