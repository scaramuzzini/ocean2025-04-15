import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css'

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

    const position = [51.505, -0.09]

    return (
        <div>
            <h1>Lista de Satelites ({totalDocs})</h1>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} 
            style={{height: '70vh'}} >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
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