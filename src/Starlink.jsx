import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css'
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup'

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

    const ocean = [-3.092652536502263, -60.01849591940468]
    const lanche = [-3.1230428200783815, -60.01331785839022]

    return (
        <div>
            <h1>Lista de Satelites ({totalDocs})</h1>
            <MapContainer center={ocean} zoom={2} scrollWheelZoom={false} 
            style={{height: '70vh'}} >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={lanche}>
                </Marker>

                {
                    satelites
                        .filter((sat) => sat.latitude && sat.longitude)
                        .map((sat) => (
                        <Marker position={[sat.latitude,sat.longitude]}>
                            <Popup>
                                Nome: {sat.spaceTrack.OBJECT_NAME} <br/>
                            </Popup>
                        </Marker>
                    ))
                }

                <Marker position={ocean}>
                    <Popup>
                        Samsung OCEAN Manaus <br/>
                        Avenida Darcy Vargas, 1200 <br/>
                        Recomendo prof. Cleto Leal.
                    </Popup>
                </Marker>
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