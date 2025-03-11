
// get data from value when click on button
const submitData = (event) => {
    event.preventDefault()

    // taking the input from form
    let holdUserName = document.getElementById('username').value
    let holdEmail = document.getElementById('email').value
    let holdPassword = document.getElementById('password').value
    let holdAddress = document.getElementById('address').value

    // array creating for data storing
    let createObjectForDataStore =[holdUserName, holdEmail, holdPassword, holdAddress]

    // send data into the local storage
    localStorage.setItem('data',createObjectForDataStore)
    alert('Data stored successfully!')

}
