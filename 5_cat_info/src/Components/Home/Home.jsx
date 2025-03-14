import { useState, useEffect } from 'react';

const Home = () => {
    const [catName, setCatName] = useState('');
    const [submittedCat, setSubmittedCat] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOnChange = (event) => {
        setCatName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!catName.trim()) return;
        setSubmittedCat(catName);
    };

    useEffect(() => {
        if (!submittedCat.trim()) return;

        setLoading(true);

        const API_KEY = 'B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW';
        const API_URL = `https://api.api-ninjas.com/v1/cats?name=${submittedCat}`;

        const fetchDataFromAPI = async () => {
            try {
                const response = await fetch(API_URL, { 
                    headers: { "X-Api-Key": API_KEY } 
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
                
            } catch (error) {
                console.error("Error fetching data:", error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDataFromAPI();
    }, [submittedCat]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">Cat Breed Information</h1>
            
            <form 
                onSubmit={handleSubmit} 
                className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
            >
                <label htmlFor="name" className="block text-lg mb-2 text-gray-300">Enter Cat Breed:</label>
                <input 
                    type="text" 
                    value={catName}
                    onChange={handleOnChange} 
                    name="catName" 
                    id="name" 
                    placeholder="Type a cat breed..."
                    className="w-full p-2 rounded-md text-red-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button 
                    type="submit" 
                    className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                    Search
                </button>
            </form>

            {loading ? (
                <p className="mt-6 text-lg text-yellow-400">Loading...</p>
            ) : (
                data.length > 0 ? (
                    <div className="mt-6 w-full max-w-2xl">
                        <h2 className="text-2xl font-semibold text-yellow-400 mb-4 text-center">Cat Information</h2>
                        {data.map((cat, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                                {cat.image_link && (
                                    <img 
                                        src={cat.image_link} 
                                        alt={cat.name} 
                                        className="w-full h-60 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <p><strong className="text-yellow-400">Name:</strong> {cat.name}</p>
                                <p><strong className="text-yellow-400">Origin:</strong> {cat.origin}</p>
                                <p><strong className="text-yellow-400">Life Span:</strong> {cat.max_life_expectancy} - {cat.min_life_expectancy} years</p>
                                <p><strong className="text-yellow-400">Weight:</strong> {cat.max_weight} kg</p>
                                <p><strong className="text-yellow-400">Intelligence:</strong> {cat.intelligence}</p>
                                <p><strong className="text-yellow-400">Children Friendly:</strong> {cat.children_friendly}</p>
                                <p><strong className="text-yellow-400">Family Friendly:</strong> {cat.family_friendly}</p>
                                <p><strong className="text-yellow-400">General Health:</strong> {cat.general_health}</p>
                                <p><strong className="text-yellow-400">Min Height:</strong> {cat.min_weight} cm</p>
                                <p><strong className="text-yellow-400">Stranger Friendly:</strong> {cat.stranger_friendly}</p>
                                <p><strong className="text-yellow-400">Playfulness:</strong> {cat.playfulness}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    submittedCat && <p className="mt-6 text-lg text-red-400">No data found for "{submittedCat}".</p>
                )
            )}
        </div>
    );
};

export default Home;
