import axios from "axios";
import { useEffect, useState } from "react";

//! Axios est une librairie qui permet de réaliser des requete ajax
//? Exemple :
//  axios.get('noure.be/demo?limit=42').then(({data}) => ...);
//  axios.get('noure.be/demo', { params: { limit: 42 }}).then(({data}) => ...);
//? Equivalent Fetch
//  fetch('noure.be/demo?limit=42').then(res => res.json()).then(data => ...);


const DashboardItem = ({ stationName, time, delay, platform }) => {

    return (
        <li>
            {stationName} / Quai: {platform}
            <br />
            {time.toLocaleTimeString()} {delay > 0 && `+${delay}`}
        </li>
    )
}

const Dahsboard = ({ stationName, updateTime, departuresCount, departures }) => {

    return (
        <>
            <p>Il y a {departuresCount} trains au départ de {stationName}</p>
            <p>Liste des départs :</p>
            <ul>
                {departures.map(dep => <DashboardItem key={dep.id} {...dep} />)}
            </ul>
        </>
    )
};

//! Composant dédié à la requete
//* - Il fait le requete (fetch/axios/...)
//* - Ensuite, en fonction de l'etat de la requete : 
//*    - Afficher le chargement...
//*    - Resultat de la requete
//*    - L'erreur de la requete
const StationRequest = ({ stationToFind }) => {

    const [searchResult, setSearchResult] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Effet dans lequel on réalise la requete
    // Attention, celui doit être limité au nom de la station
    useEffect(() => {
        
        //! Mise a jours des stats avant d'envoyer la requete
        setSearchResult(null);
        setError(false);
        setLoading(true);

        //! Requete AJAX (via Axios)
        // Exemple de requete : https://api.irail.be/v1/liveboard/?station=Hourpes&format=json&lang=fr
        axios.get('https://api.irail.be/v1/liveboard/', {
            // L'option "params" permet de gérer les parametres "get" de la requete via Axios 
            params: {
                station: stationToFind,
                lang: 'fr',
                format: 'json'
            }
        }).then(({ data }) => {

            //* Données brutes recus depuis la WebAPI
            console.log(data);

            //! Converti les données dans un format adapté a NOS besoin
            const result = {
                stationName: data.station,
                updateTime: new Date(data.timestamp * 1000),
                departuresCount: data.departures.number,
                departures: data.departures.departure.map(
                    dep => ({
                        id: dep.id,
                        stationName: dep.station,
                        time: new Date(dep.time * 1000),
                        delay: dep.delay / 60,
                        platform: dep.platform
                    })
                )
            }

            //* Données converties
            console.log(result);

            //! Mise a jours du state après la requete
            setLoading(false);
            setSearchResult(result);
        }).catch(err => {

            //! Mise à jours du state s'il y a une erreur
            setLoading(false);
            setError(true);
        })

    }, [stationToFind]);

    return (
        <div>
            {isLoading ? (
                <p>Chargement...</p>
            ) : searchResult ? (
                <Dahsboard {...searchResult} />
            ) : error ? (
                <p>Erreur lors de requete</p>
            ) : (
                <p>Aucune données...</p>
            )}
        </div>
    );
};

export default StationRequest;