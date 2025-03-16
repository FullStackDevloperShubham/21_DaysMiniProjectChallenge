import { useState } from 'react';

const Home = () => {
    const [inputCurrencyData, setInputCurrencyData] = useState({
        currentCurrency: '',
        amount: 0
    });

    const [convertInto, setConvertInto] = useState({
        convert: ''
    });

    const [convertedAmount, setConvertedAmount] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const API_KEY = 'B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW';
        const API_URL = `https://api.api-ninjas.com/v1/convertcurrency?have=${inputCurrencyData.currentCurrency}&want=${convertInto.convert}&amount=${inputCurrencyData.amount}`;

        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: { 'X-Api-Key': API_KEY }
            });
            const data = await response.json();
            console.log(data)
            
            if (data.new_amount) {
                setConvertedAmount(data.new_amount);
            } else {
                console.error("Invalid API response:", data);
            }
        } catch (error) {
            console.error('Error fetching conversion data:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl rounded-2xl text-white">
            <h2 className="text-3xl font-bold text-center mb-6">Currency Converter</h2>
            
            <div className="bg-white p-5 rounded-xl shadow-lg">
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Your Currency</label>
                        <input
                            type="text"
                            value={inputCurrencyData.currentCurrency}
                            placeholder="e.g., USD"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            onChange={(e) => setInputCurrencyData({ ...inputCurrencyData, currentCurrency: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Currency You Want</label>
                        <input
                            type="text"
                            placeholder="e.g., EUR"
                            value={convertInto.convert}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            onChange={(e) => setConvertInto({ ...convertInto, convert: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Amount</label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={inputCurrencyData.amount}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            onChange={(e) => setInputCurrencyData({ ...inputCurrencyData, amount: e.target.value })}
                        />
                    </div>
                    <button 
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
                        onClick={handleSubmit}
                    >
                        Convert
                    </button>
                    {convertedAmount !== null && (
                        <div className="mt-4 p-4 bg-green-100 text-green-800 font-semibold rounded-lg text-center">
                            Converted Amount: {convertedAmount} {convertInto.convert}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    
    
    );
};

export default Home;
