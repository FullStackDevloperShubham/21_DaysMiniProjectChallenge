
// getWeather()
const getWeather = async () => {

    // hold the variable 
    let holdCityName = document.querySelector('#cityInput').value

    // api call 
    const API_KEY = 'b7b311b4f99d780d64dc64efb75caa91'
    const API_CALL_URL = `https://api.openweathermap.org/data/2.5/weather?q=${holdCityName}&appid=${API_KEY}`

    if(holdCityName === '') return alert("Enter City Name")

    // fetching the data 
    try {
        // take response
        let response = await fetch(API_CALL_URL)

        // parse the response
        const data = await response.json()

        // destrure the data
        let { temp, humidity,feels_like} = data.main
        let { speed } = data.wind
        let {country} = data.sys
        let { description } = data.weather[0]

        // add into UI
        let holdTemperature = document.querySelector('#Temperature')
        let holdHumidity = document.querySelector('#Humidity')
        let holdFeelsLike = document.querySelector('#FeelLike')
        let holdWindSpeed = document.querySelector('#WindSpeed')
        let holdContry =  document.querySelector('#Contry')
        let holdDescription = document.querySelector('#Description')
        let holdCityNameForUI = document.querySelector('#CityName')

        holdTemperature.textContent = `Temprature :${Math.floor(temp - 273.15)}°C`
        holdHumidity.textContent = `Humidity :${humidity}%`
        holdFeelsLike.textContent = `Feels Like : ${Math.floor(feels_like - 273.15)}°C`
        holdWindSpeed.textContent = `Wind Speed : ${speed} m/s`
        holdContry.textContent = `Country : ${country}`
        holdDescription.textContent = `Description: ${description}`
        holdCityNameForUI.textContent = `City : ${holdCityName}`

    } catch (error) {
        console.log(error.message)
    }

}



