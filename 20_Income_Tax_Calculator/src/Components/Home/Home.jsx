import { useState } from "react"

const Home = () => {

    // state managament for input data 
    const [inputData, setInputData] = useState({
        country: '',
        region: '',
        income: '',
        filing_status: 'Single'
    })

    // state managament for API data handling
    const [data, setData] = useState([])



    // handle onClick
    const hanldeOnClick = async () => {
        // console.log(`country: ${inputData.country}\nregion: ${inputData.region}\nincome:${inputData.income} `)
        try {
            // api details 
            let API_URL = `https://api.api-ninjas.com/v1/incometaxcalculator?country=${inputData.country}&region=${inputData.region}&income=${inputData.income}&filing_status=${inputData.filing_status}`
            let API_KEY = 'B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW'

            let response = await fetch(API_URL, {
                headers: {
                    'X-Api-Key': API_KEY
                }
            })

            // Parse JSON response
            let data = await response.json();

            // Convert object into an array of key-value pairs
            let parsedData = Object.entries(data).map(([key, value]) => ({ key, value }));

            setData(parsedData)

        } catch (error) {
            console.log('Error while fetching the data ', error.message)
        }
    }

    return (
        <>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
                    Tax Calculator
                </h1>

                {/* Form */}
                <div className="grid gap-4">
                    <label className="font-medium text-gray-600" htmlFor="country">
                        Enter Country Name
                    </label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        placeholder="Example: US"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        value={inputData.country}
                        onChange={(e) =>
                            setInputData({ ...inputData, country: e.target.value })
                        }
                    />

                    <label className="font-medium text-gray-600" htmlFor="region">
                        Enter Region Name
                    </label>
                    <input
                        type="text"
                        name="region"
                        id="region"
                        placeholder="Example: CA"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        value={inputData.region}
                        onChange={(e) =>
                            setInputData({ ...inputData, region: e.target.value })
                        }
                    />

                    <label className="font-medium text-gray-600" htmlFor="income">
                        Enter Income
                    </label>
                    <input
                        type="number"
                        name="income"
                        id="income"
                        placeholder="Example: 100000"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        value={inputData.income}
                        onChange={(e) =>
                            setInputData({ ...inputData, income: e.target.value })
                        }
                    />

                    <label className="font-medium text-gray-600" htmlFor="filing_status">
                        Filing Status
                    </label>
                    <input
                        type="text"
                        name="filing_status"
                        id="filing_status"
                        placeholder="Single"
                        readOnly
                        className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                        value={inputData.filing_status}
                    />

                    <button
                        onClick={hanldeOnClick}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md"
                    >
                        Get Details
                    </button>
                </div>

                {/* Display Data */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Tax Details</h2>
                    {data.length > 0 ? (
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <table className="w-full border-collapse border border-gray-300 table-fixed">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left w-1/2">Key</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left w-1/2">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data
                                        .filter((item) => item.value !== "premium subscription required")
                                        .map((item, index) => (
                                            <tr
                                                key={index}
                                                className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                    }`}
                                            >
                                                <td className="border border-gray-300 px-4 py-2 font-medium">
                                                    {item.key}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {item.value}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No data available.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home 