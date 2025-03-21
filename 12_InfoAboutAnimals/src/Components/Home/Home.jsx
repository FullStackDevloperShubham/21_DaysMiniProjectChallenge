import { useState } from 'react';

const Home = () => {
    // handle state for input
    const [inputName, setInputName] = useState({ name: '' });

    // handle state for API data
    const [data, setData] = useState([]);

    // handle fetchData function
    const fetchData = async () => {
        try {
            let API_KEY = 'B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW';
            const response = await fetch(
                `https://api.api-ninjas.com/v1/animals?name=${inputName.name}`,
                {
                    headers: { 'X-Api-Key': API_KEY }
                }
            );
            const result = await response.json();
            setData(result);
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                    <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                        Enter Animal Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Animal Name with specific country..."
                        value={inputName.name}
                        onChange={(event) => setInputName({ ...inputName, name: event.target.value })}
                        className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={fetchData}
                        className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Fetch Data
                    </button>
                </div>

                {/* Display Data */}
                {data.length > 0 && (
                    <div className="mt-8 w-full max-w-4xl">
                        <h1 className="text-2xl font-bold text-gray-800 text-center">Characteristics</h1>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.map((animal) => (
                                <div key={animal.name} className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="text-xl font-semibold text-gray-700">{animal.name}</h2>
                                    <ul className="mt-2 space-y-2">
                                        <li><span className="font-semibold">Average Litter Size:</span> {animal.characteristics.average_litter_size}</li>
                                        <li><span className="font-semibold">Color:</span> {animal.characteristics.color}</li>
                                        <li><span className="font-semibold">Common Name:</span> {animal.characteristics.common_name}</li>
                                        <li><span className="font-semibold">Diet:</span> {animal.characteristics.diet}</li>
                                        <li><span className="font-semibold">Distinctive Feature:</span> {animal.characteristics.distinctive_feature}</li>
                                        <li><span className="font-semibold">Group:</span> {animal.characteristics.group}</li>
                                        <li><span className="font-semibold">Lifespan:</span> {animal.characteristics.lifespan}</li>
                                        <li><span className="font-semibold">Slogan:</span> {animal.characteristics.slogan}</li>
                                        <li><span className="font-semibold">Temperament:</span> {animal.characteristics.temperament}</li>
                                        <li><span className="font-semibold">Training:</span> {animal.characteristics.training}</li>
                                        <li><span className="font-semibold">Type:</span> {animal.characteristics.type}</li>
                                    </ul>

                                    {/* Location */}
                                    <h1 className="text-xl font-semibold text-gray-700 mt-4">Location</h1>
                                    <ul className="mt-2">
                                        <li><span className="font-semibold">Location:</span> {animal.locations}</li>
                                    </ul>

                                    {/* Taxonomy */}
                                    <h1 className="text-xl font-semibold text-gray-700 mt-4">Taxonomy</h1>
                                    <ul className="mt-2">
                                        <li><span className="font-semibold">Class:</span> {animal.taxonomy.class}</li>
                                        <li><span className="font-semibold">Family:</span> {animal.taxonomy.family}</li>
                                        <li><span className="font-semibold">Genus:</span> {animal.taxonomy.genus}</li>
                                        <li><span className="font-semibold">Kingdom:</span> {animal.taxonomy.kingdom}</li>
                                        <li><span className="font-semibold">Order:</span> {animal.taxonomy.order}</li>
                                        <li><span className="font-semibold">Phylum:</span> {animal.taxonomy.phylum}</li>
                                        <li><span className="font-semibold">Scientific Name:</span> {animal.taxonomy.scientific_name}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
