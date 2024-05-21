import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";

export const Planet = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [planetaDetalle, setPlanetaDetalle] = useState(null);
    const [descripcion, setDescripcion] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/planets/${id}`) 
            .then(response => response.json())
            .then(data => {
                setPlanetaDetalle(data.result);
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
                {planetaDetalle ? (
                    <div>
                        <h4>{planetaDetalle.properties.name}</h4>
                        <div>
                            <p>Terrain</p>
                            <p>{planetaDetalle.properties.terrain}</p>
                        </div>
                        <div>
                            <p>Gravity</p>
                            <p>{planetaDetalle.properties.gravity}</p>
                        </div>
                    </div>
                ) : (
                    <p>Cargando detalles del planeta...</p>
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
