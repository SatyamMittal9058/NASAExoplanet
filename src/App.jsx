import { useEffect, useState } from "react";
import Papa from "papaparse";
import Dropdownbar from "./components/Dropdownbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
    const [planetData, setPlanetData] = useState([]);

    const csvfile = "/csvdata.csv";
    const fetchExcelData = async () => {
      const response = await fetch(csvfile);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      }).data;
      setPlanetData(parsedData);
    };
    useEffect(() => {
      fetchExcelData();
    }, []);

    return planetData.length === 0 ? <h1>Fetching Data</h1> : (
      <>
      <div className="bg-slate-300 p-7">
        <h1 className="text-center text-3xl font-bold">NASA Exoplanet Query</h1>
        </div>
        <Dropdownbar planetData={planetData} />
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition:Bounce
        />
      </>
    )
  }
export default App
