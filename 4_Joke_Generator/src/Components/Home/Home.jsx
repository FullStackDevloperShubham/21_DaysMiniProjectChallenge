import { useState, useEffect } from "react";
import { Clipboard as ClipboardIcon, Check } from "lucide-react";

const Home = () => {
    const [jokes, setJokes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null); // Track copied joke

    useEffect(() => {
        const API_KEY = "B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW";
        const API_URL = "https://api.api-ninjas.com/v1/jokes";

        const getDataFromApi = async () => {
            setLoading(true);
            try {
                const response = await fetch(API_URL, { headers: { "X-Api-Key": API_KEY } });
                const data = await response.json();

                if (Array.isArray(data)) {
                    setJokes(data); // ✅ Ensure it's an array
                } else {
                    console.error("Invalid API response:", data);
                    setJokes([]);
                }
            } catch (error) {
                console.error("Error fetching jokes:", error);
                setJokes([]);
            } finally {
                setLoading(false);
            }
        };

        getDataFromApi();
    }, []);

    const copyToClipboard = (text, index) => {
        if (!text) return; // ✅ Prevent copying undefined joke
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 sec
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 px-4">
            <h2 className="text-white text-4xl font-bold mb-6 drop-shadow-lg">😂 Funny Jokes</h2>
            {loading ? (
                <p className="text-center text-white text-2xl font-semibold animate-pulse">Loading...</p>
            ) : (
                <div className="w-full max-w-2xl space-y-6">
                    {jokes.length === 0 ? (
                        <p className="text-white text-center text-xl">No jokes found!</p>
                    ) : (
                        jokes.map((jokeObj, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-xl rounded-2xl p-6 border border-gray-300 flex items-center justify-between transition-all hover:scale-105 hover:shadow-2xl duration-300"
                            >
                                <p className="text-gray-900 text-2xl font-comic leading-snug">{jokeObj?.joke}</p>
                                <button
                                    className="ml-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                                    onClick={() => copyToClipboard(jokeObj?.joke, index)}
                                >
                                    {copiedIndex === index ? (
                                        <Check className="text-green-500 w-6 h-6" />
                                    ) : (
                                        <ClipboardIcon className="text-gray-600 w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
