import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";

export const StarShip = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [starshipDetalle, setStarshipDetalle] = useState(null);
    const [descripcion, setDescripcion] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/vehicles/${id}`) 
            .then(response => response.json())
            .then(data => {
                setStarshipDetalle(data.result);
                setDescripcion(data.result.description); 
            })
            .catch(error => console.error('Error', error));
    }, [id]);

    return (
        <div className="container">
            <div className="card">
                <div>
                    <img 
                        className="imagen" 
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"  
                        alt="StarWars" 
                    />
                </div>
                {starshipDetalle ? (
                    <div>
                        <h4>{starshipDetalle.properties.model}</h4>
                        <div>
                            <p>Class</p>
                            <p>{starshipDetalle.properties.vehicle_class}</p>
                        </div>
                        <div>
                            <p>Consumables</p>
                            <p>{starshipDetalle.properties.consumables}</p>
                        </div>
                    </div>
                ) : (
                    <p>Cargando detalles de la nave...</p>
                )}
            </div>
            <div>
                <Link to="/">
                    <button className="btn btn-warning mt-5">Back Home</button>
                </Link>
            </div>
        </div>
    );
};
