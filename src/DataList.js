import React, { useState, useEffect } from 'react';
import moment from 'moment'; // Importujte knihovnu moment

function DataList() {
    const [data, setData] = useState([]);
    const [threshold, setThreshold] = useState(35); // Nastavení počáteční threshold
    const [minutesFilter, setMinutesFilter] = useState(5); // Počáteční hodnota pro filtrování minut
    useEffect(() => {
        // Funkce pro načtení dat
        const fetchData = () => {
            fetch('https://localhost:443/api/data')
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.error('Error:', error));
        };

        // Okamžité první načtení dat
        fetchData();

        // Nastavení intervalu pro pravidelné načítání dat
        const interval = setInterval(fetchData, 1000);

        // Vyčištění intervalu při odmontování komponenty
        return () => clearInterval(interval);
    }, []);

    const handleThresholdChange = (event) => {
        setThreshold(Number(event.target.value));
    };

    const handleMinutesFilterChange = (event) => {
        setMinutesFilter(Number(event.target.value));
    };

    const getCurrentDateTime = () => moment(); // Aktuální datum a čas

    return (

        <div>
            <div class="row">
                <div class="col-sm ">


            <div className="form-group w-50 p-3 float-end">
                <label htmlFor="thresholdInput">Set maximum of used memory</label>
                <input
                    type="number"
                    className="form-control"
                    id="thresholdInput"
                    aria-describedby="thresholdInputHelp"
                    placeholder="Enter email"
                    value={threshold}
                    onChange={handleThresholdChange}
                />
                <small id="thresholdInputHelp" className="form-text text-muted">Filters data with value less than specified.</small>
            </div>
                </div>
                <div class="col-sm">
            <div className="form-group w-50 p-3 float-start">
                <label htmlFor="minutesFilterInput">Set time filter (minutes)</label>
                <input
                    type="number"
                    className="form-control"
                    id="minutesFilterInput"
                    aria-describedby="minutesFilterInputHelp"
                    placeholder="Enter minutes"
                    value={minutesFilter}
                    onChange={handleMinutesFilterChange}
                />
                <small id="minutesFilterInputHelp" className="form-text text-muted">Filter data for the last {minutesFilter} minutes.</small>
            </div>
                </div>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Client</th>
                    <th>Used Memory</th>
                    <th>Free Memory</th>
                    <th>Total Memory</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {data
                    .filter((item) => item.usedMemory < threshold && getCurrentDateTime().diff(moment(item.createdAt), 'minutes') <= minutesFilter) // Filtrování za posledních X minut
                    .map((item, index) => (
                        <tr key={index}>
                            <td className="align-middle">{item.id}</td>
                            <td className="align-middle">{item.clientName.clientName}</td>
                            <td className="align-middle">{item.usedMemory} MB</td>
                            <td className="align-middle">{item.freeMemory} MB</td>
                            <td className="align-middle">{item.totalMemory} MB</td>
                            <td>
                                <div>
                                    <strong>{moment(item.createdAt).format('HH:mm:ss')}</strong>
                                </div>
                                <div>
                                    <small className="text-secondary">
                                        {moment(item.createdAt).format('DD-MM-YYYY')}
                                    </small>
                                </div>
                            </td>
                            {/* Formátování data a času */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataList;