import axios from 'axios';
import { useEffect, useState } from 'react';

function Starlink() {

    const [totalDocs,setTotalDocs] = useState(0);
    const [satelites, setSatelites] = useState([]);

    useEffect(() => {
        const fetchSatelites = async () => {
            const response = await axios.post(
                'https://api.spacexdata.com/v4/starlink/query',
                {
                    "query": {},
                    "options": {
                        limit: 100
                    }
                }
            );
            console.log(response.data);
            setTotalDocs(response.data.totalDocs);
            setSatelites(response.data.docs);
        }
        fetchSatelites();
    }, []);

    return (
        <div>
            <h1>Lista de Satelites ({totalDocs})</h1>
            <ul>
                {
                    satelites.map((sat) => (
                        <li key={sat.id}>{sat.spaceTrack.OBJECT_NAME}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Starlink