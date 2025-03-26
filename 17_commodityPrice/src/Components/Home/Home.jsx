import { useState } from 'react'

const Home = () => {
    // state management for input data 
    const [inputData, setInputData] = useState({
        value: ''
    })
    console.log(inputData.value)

    // state management for api data handling
    const [data, setData] = useState([])
    
    // handle onClick
    const HandleOnClick = async () => {
        try {
            // api details 
            let API_URL = `https://api.api-ninjas.com/v1/commodityprice?name=${inputData.value}`
            let API_KEY = 'B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW'

            // get data using fetch
            const response = await fetch(API_URL, {
                headers: {
                    'X-Api-Key': API_KEY
                }
            })

            // format data 
            let apiResponse = await response.json()
            // set data into state variable
            setData(apiResponse)
            console.log(apiResponse)
        } catch (error) {
            console.log('Error while fetching the data ', error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <label htmlFor="name" className="text-lg font-semibold mb-2">🔍 Enter The Commodity Name</label>
            <input
                type="text"
                className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={inputData.value}
                onChange={(event) => setInputData({ ...inputData, value: event.target.value })}
                placeholder="e.g. gold, silver"
            />
            <button 
                onClick={HandleOnClick} 
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                ⚡ Get Details
            </button>

            {/* display the data  */}
            {
                <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                    <h1 className="text-xl font-semibold">📈 Exchange: <span className="text-blue-600">{data.exchange}</span></h1>
                    <h1 className="text-xl font-semibold">🏷️ Name: <span className="text-blue-600">{data.name}</span></h1>
                    <h1 className="text-xl font-semibold">💰 Price: <span className="text-green-600">{data.price}</span></h1>
                    <h1 className="text-xl font-semibold">📅 Date: <span className="text-gray-600">{new Date(data.updated).toLocaleDateString()}</span></h1>
                </div>
            }
        </div>
    )
}

export default Home