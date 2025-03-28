import { useState } from "react";

const Home = () => {
  // State for input fields
  const [inputData, setInputData] = useState({
    loan_amount: "",
    interest_rate: "",
    duration_year: "",
  });

  // State for API response
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle API Call
  const handleOnClick = async () => {
    // Validate input before making API request
    if (!inputData.loan_amount || !inputData.interest_rate || !inputData.duration_year) {
      setError("All fields are required!");
      return;
    }

    setError(null); // Reset error state

    try {
      const API_URL = `https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${inputData.loan_amount}&interest_rate=${inputData.interest_rate}&duration_years=${inputData.duration_year}`;
      const API_KEY = "B9i1uTG5Jz4iYO2Gkct23w==bVSONreqE5xIN9iW";

      const response = await fetch(API_URL, {
        headers: { "X-Api-Key": API_KEY },
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const parsedData = await response.json();
      console.log(parsedData)
      setData(parsedData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-500 p-6">
      <div className="max-w-md w-full p-6 bg-gradient-to-r from-blue-50 to-blue-100 shadow-2xl rounded-2xl border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Mortgage Calculator</h2>

        <div className="mb-4">
          <label className="block font-medium text-gray-600 mb-1">Loan Amount</label>
          <input
            type="number"
            name="loan_amount"
            value={inputData.loan_amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter loan amount"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-600 mb-1">Interest Rate (%)</label>
          <input
            type="number"
            name="interest_rate"
            value={inputData.interest_rate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter interest rate"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-600 mb-1">Duration (Years)</label>
          <input
            type="number"
            name="duration_year"
            value={inputData.duration_year}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter duration in years"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          onClick={handleOnClick}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          Calculate
        </button>

        {data && (
          <div className="mt-6 p-5 bg-white shadow-md rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Results:</h3>
            <p className="text-gray-600">Monthly Payment: <span className="font-bold text-blue-600">{data.monthly_payment.total} Rs</span></p>
            <p className="text-gray-600">Annual Payment: <span className="font-bold text-blue-600">{data.annual_payment.total} Rs</span></p>
            <p className="text-gray-600">Total Interest Paid: <span className="font-bold text-red-500">{data.total_interest_paid} Rs</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
