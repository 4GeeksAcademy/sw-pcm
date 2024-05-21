import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Link, } from "react-router-dom";

export const Character = () => {

    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [personajeDetalle, setPersonajeDetalle] = useState(null);
    const [descripcion, setDescripcion] = useState(null);

    useEffect(()=>{
        fetch(`https://www.swapi.tech/api/people/${id}`) 
        .then(response => response.json())
        .then(data => {
            setPersonajeDetalle(data.result); 
            setDescripcion(data.result.description); 

        },[id])
        .catch(error => console.error('Error', error));
    })

return (
    <div className="container">
        <div className="container">
            <div className="card">
                <div className="">
                    <div className="">
                        <img className="imagen"src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"  alt="StarWars" />
                    </div>
                    {personajeDetalle ? (
                    <div className="">
                        <div className="">
                            <h4>{personajeDetalle.properties.name}</h4>
                        </div>
                        <div className="">
                            <p>Nombre</p>
                            <p>{personajeDetalle.properties.name}</p>
                        </div>
                        <div className="">
                            <p>Año de nacimiento</p>
                            <p>{personajeDetalle.properties.birth_year}</p>
                        </div>
                    </div>
                    ) :
                    <p>Cargando detalles del personaje...</p>
                    }
                </div>
            </div>
            <div className="">
                <Link to="/">
                    <button className="btn btn-warning mt-5">Back Home</button>
                </Link>
            </div>
        </div>
    </div>
);
};