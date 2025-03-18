import { useState } from 'react';

const Home = () => {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const handleOnClick = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            let API_URL = `https://api.api-ninjas.com/v1/inflation?country=${country}`;
            let API_KEY = 'B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW';

            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'X-Api-Key': API_KEY,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">📊 Inflation Rate Checker</h1>

            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <label htmlFor="country_name" className="block text-lg font-medium text-gray-700 mb-2">
                    🌍 Enter Country Name:
                </label>
                <input
                    value={country}
                    type="text"
                    placeholder="e.g., Ireland, Mexico, Norway"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setCountry(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={handleOnClick}
                    disabled={loading}
                    className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    {loading ? '⏳ Fetching...' : '🔍 Get Info'}
                </button>
            </div>

            {/* Display Data */}
            {data.length > 0 && (
                <div className="mt-6 w-full max-w-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 Inflation Data</h2>
                    {data.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                            <p className="text-lg"><span className="font-bold">🌍 Country:</span> {item.country}</p>
                            <p className="text-lg"><span className="font-bold">📑 Type:</span> {item.type}</p>
                            <p className="text-lg"><span className="font-bold">📅 Period:</span> {item.period}</p>
                            <p className="text-lg"><span className="font-bold">📊 Monthly Rate (%):</span> {item.monthly_rate_pct}</p>
                            <p className="text-lg"><span className="font-bold">📉 Yearly Rate (%):</span> {item.yearly_rate_pct}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
