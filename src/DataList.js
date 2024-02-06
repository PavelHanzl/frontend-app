import React, { useState, useEffect } from 'react';

function DataList() {
    const [data, setData] = useState([]);
    const [threshold, setThreshold] = useState(25); // Nastavení počáteční threshold

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

    return (

        <div>

            <div className="form-group w-50 p-3 mx-auto">
                <label htmlFor="thresholdInput">Set maximum of used memory</label>
                <input type="number" className="form-control" id="thresholdInput" aria-describedby="thresholdInputHelp"
                       placeholder="Enter email" value={threshold} onChange={handleThresholdChange}/>
                <small id="thresholdInputHelp" className="form-text text-muted">Application will automatically update values in table below after editing threshold.</small>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Client</th>
                    <th>Used Memory</th>
                    <th>Free Memory</th>
                    <th>Total Memory</th>
                </tr>
                </thead>
                <tbody>
                {data.filter(item => item.usedMemory < threshold).map((item, index) => (

                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.clientName.clientName}</td>
                        <td>{item.usedMemory} MB</td>
                        <td>{item.freeMemory} MB</td>
                        <td>{item.totalMemory} MB</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataList;