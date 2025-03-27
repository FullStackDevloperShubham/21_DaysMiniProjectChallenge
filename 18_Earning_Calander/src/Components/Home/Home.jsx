import { useState } from 'react'

const Home = () => {

    // state management for inter data 
    const [interData, setInterData] = useState({
        name: ''
    })

    // state management for api data 
    const [data, setData] = useState([])

    // handle onChange
    const handleOnChange = (event) => {
        setInterData({ ...interData, name: event.target.value })
    }

    // hanlde OnClick
    const handleOnClick = async() =>{
        try {
            // API data
            let API_URL =`https://api.api-ninjas.com/v1/earningscalendar?ticker=${interData.name}`
            let API_KEY = 'B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW'

            // fetching the data 
            let response = await fetch(API_URL,{
                headers:{
                    'X-Api-Key':API_KEY
                }
            })

            // data parsing
            let parsedData = await response.json()

            // set data into useState
            setData(parsedData)

            // debug
            console.log(parsedData)

        } catch (error) {
            console.log("Error fetching the data " , error.message)
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Input Section */}
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
          Enter Ticker
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Ticker Like INFY"
          value={interData.name}
          onChange={handleOnChange}
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleOnClick}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Get Information
        </button>
      </div>

      {/* Display Data */}
      <div className="w-full max-w-3xl mt-6">
        {data.length === 0 ? (
          <h1 className="text-xl text-red-500 text-center font-semibold">No Data Available</h1>
        ) : (
          <div className="grid gap-4">
            {data.slice(0, 3).map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-bold text-gray-800">Ticker: {item.ticker}</h2>
                <p className="text-gray-600">📅 Date: {new Date(item.date).toLocaleDateString()}</p>
                <p className="text-green-600 font-medium">💰 Actual EPS: {item.actual_eps}</p>
                <p className="text-green-600 font-medium">📈 Actual Revenue: {item.actual_revenue}</p>
                <p className="text-blue-600 font-medium">🔮 Estimated EPS: {item.estimated_eps}</p>
                <p className="text-blue-600 font-medium">📊 Estimated Revenue: {item.estimated_revenue}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
        </>
    )
}

export default Home