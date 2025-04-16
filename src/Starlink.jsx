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
    const [paginaAtual, setPaginaAtual] = useState(1);

    useEffect(() => {
        fetchSatelites(paginaAtual);
    }, []);

    const ocean = [-3.092652536502263, -60.01849591940468]
    const lanche = [-3.1230428200783815, -60.01331785839022]

    const fetchSatelites = async (pagina) => {
        const response = await axios.post(
            'https://api.spacexdata.com/v4/starlink/query',
            {
                "query": {},
                "options": {
                    limit: 100,
                    page: pagina
                }
            }
        );
        //console.log(response.data);
        setTotalDocs(response.data.totalDocs);
        //setSatelites(response.data.docs);
        setSatelites((antigos) => [...antigos,...response.data.docs]);
    }
    const carregarMais = () => {
        setPaginaAtual(paginaAtual + 1);
        //Realizar chamada do backend com a pagina a ser carregada
        fetchSatelites(paginaAtual);
    };

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
                                <h2>Nome: {sat.spaceTrack.OBJECT_NAME} </h2> <br/>
                                Velocidade: {sat.velocity_kms} <br/>
                                Data de Lançamento: {sat.spaceTrack.LAUNCH_DATE} <br/>
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

            Página atual: {paginaAtual}
            <button onClick={carregarMais}>Carregar mais</button>
            
        </div>
    )
}

export default Starlink