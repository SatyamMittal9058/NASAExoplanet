import { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { toast } from "react-toastify";
import Tagline from "./Tagline";

function Dropdownbar({ planetData }) {
    const [hostName, setHostName] = useState([]);
    const [disMethod, setDisMethod] = useState([]);
    const [disYear, setDisYear] = useState([]);
    const [disFacility, setDisFacility] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [filters, setFilter] = useState({
        hostname: "",
        disMethod: "",
        disYear: "",
        disFacilty: "",
    });

    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const handleValue = (dropdownname, value) => {
        setFilter({ ...filters, [dropdownname]: value });

    }

    const handleSearch = () => {
        if (filters.hostname === "" && filters.disMethod === "" && filters.disYear === "" && filters.disFacilty === "") {
            toast.error("You must Enter Something");
            return;
        }
        const newData = planetData.filter(item => {
            return (
                (filters.hostname === '' || item.hostname === filters.hostname) &&
                (filters.disMethod === '' || item.discoverymethod === filters.disMethod) &&
                (filters.disYear === '' || item.disc_year === filters.disYear) &&
                (filters.disFacilty === '' || item.disc_facility === filters.disFacilty)
            )
        })
        
        setFilterData(newData);
    }
    const handleClear = () => {
        setFilter({
            hostname: "",
            disMethod: "",
            disYear: "",
            disFacilty: "",
        })
        setFilterData([]);
    }
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('ascending');
    const sortBy = (column) => {
        const direction = sortColumn === column && sortDirection === 'ascending' ? 'descending' : 'ascending';
        const sortedData = [...filterData].sort((a, b) => {
            if (direction === 'ascending') {
                if (a[column] < b[column]) return -1;
                if (a[column] > b[column]) return 1;
                return 0;
            } else if (direction === 'descending') {
                if (a[column] > b[column]) return -1;
                if (a[column] < b[column]) return 1;
                return 0;
            }
            return 0;
        });

        setFilterData(sortedData);
        setSortColumn(column);
        setSortDirection(direction);
    };
    
    useEffect(() => {
        const uniquehostName = [...new Set(planetData.map(item => item.hostname))];
        setHostName(uniquehostName);
        const uniquedisMethod = [...new Set(planetData.map(item => item.discoverymethod))];
        setDisMethod(uniquedisMethod);
        const uniquedisYear = [...new Set(planetData.map(item => item.disc_year))];
        setDisYear(uniquedisYear);
        const uniqueFacilties = [...new Set(planetData.map(item => item.disc_facility))];
        setDisFacility(uniqueFacilties);
    }, []);

    return (
        <>
            <div className="my-5 flex justify-center">
                <DropDown label="HostName" options={hostName} onChange={(value) => handleValue("hostname", value)} />
                <DropDown label="Discovery Method" options={disMethod} onChange={(value) => handleValue("disMethod", value)} />
                <DropDown label="Discovery Year" options={disYear} onChange={(value) => handleValue("disYear", value)} />
                <DropDown label="Discovery Facility" options={disFacility} onChange={(value) => handleValue("disc_facilty", value)} />
                <button className="border border-black px-2 m-3 h-8 rounded-xl bg-blue-400 cursor-pointer " onClick={handleSearch}>Search</button>
                <button className="border border-black px-2 m-3 h-8 rounded-xl bg-blue-400 cursor-pointer" onClick={handleClear}>Clear</button>
            </div>
            {filterData.length === 0 ? <Tagline /> : <div className="p-4 m-5">
                <table className="w-full p-4">
                    <thead className="">
                        <tr className="border-b-2 text-left">
                            <th className="py-4">
                                Planet Name
                                <div className="flex">
                                    <span className="ml-1 cursor-pointer" onClick={() => sortBy('pl_name')}>&uarr;</span>
                                    <span className="ml-1 cursor-pointer" onClick={() => sortBy('pl_name')}>&darr;</span>
                                </div>
                            </th>
                            <th className="py-4">
                                Host Name
                                <div className="flex">
                                    <span className="ml-1 cursor-pointer" onClick={() => sortBy('hostname')}>&uarr;</span>
                                    <span className="ml-1 cursor-pointer" onClick={() => sortBy('hostname')}>&darr;</span>
                                </div>
                            </th>
                            <th className="py-4">
                                Discovery Method
                                <div className="flex">
                                    <span className="ml-1 cursor-pointer" onClick={() => sortBy('discoverymethod')}>&uarr;</span>
                                    <span className="ml-1 cursor-pointer" onClick={() => sortBy('discoverymethod')}>&darr;</span>
                                </div>
                            </th>
                            <th className="py-4">
                                Discovery Year
                                <div className="flex">
                                    <span className="ml-1 cursor-pointer" onClick={() => sortBy('disc_year')}>&uarr;</span>
                                    <span className="ml-1 cursor-pointer" onClick={() => sortBy('disc_year')}>&darr;</span>
                                </div>
                            </th>
                            <th className="py-4">
                                Discovery Facility
                                <div className="flex">
                                    <span className="ml-1 cursor-pointer" onClick={() => sortBy('disc_facility')}>&uarr;</span>
                                    <span className="ml-1 cursor-pointer" onClick={() => sortBy('disc_facility')}>&darr;</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData.map((item, idx) => (
                            <tr key={idx} className="text-left border-b-2 text-200 hover:bg-gray-100 ">
                                <td className="py-4"><a href={`https://exoplanetarchive.ipac.caltech.edu/overview/${encodeURIComponent(item.pl_name)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                    {item.pl_name} &#9741;
                                </a> </td>
                                <td className="py-4">{item.hostname}</td>
                                <td className="py-4">{item.discoverymethod
                                }</td>
                                <td className="py-4">{item.
                                    disc_year}</td>
                                <td className="py-4">{item.disc_facility
                                }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            }
        </>
    )
}
export default Dropdownbar;