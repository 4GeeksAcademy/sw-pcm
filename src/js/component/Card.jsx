import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CharacterCard = ({personaje, favoritos, agregarFavorito}) =>{

    const isInFavoritosCharacter = favoritos.some(favorito => favorito.name === personaje.name);

    return (
 <div className="contenedoresCard">
        <div className="card bg-danger mx-3" >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{personaje.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item overflow-hidden">Gender: {personaje.details.properties.gender}</li>
                <li className="list-group-item overflow-hidden">Hair: {personaje.details.properties.hair_color}</li>
                <li className="list-group-item overflow-hidden">Eye Color: {personaje.details.properties.eye_color}</li>
            </ul>
            <div className="card-body">
            <Link to={`/Character/${personaje.uid}`} className="btn btn-dark">
                Learn More
            </Link>
            <button onClick={() => agregarFavorito(personaje)} className="btn btn-danger">
                                {isInFavoritosCharacter ? (
                                    <i className="fas fa-heart"></i>
                                ) : (
                                    <i className="far fa-heart"></i>
                                )}
                            </button>
            </div>
        </div>
</div>
    );
};

export const StarShipCard = ({ship, agregarFavorito, favoritos}) =>{
    const isInFavoritosShips = favoritos.some(favorito => favorito.name === ship.name);
    return (
<div className="contenedoresCard">
        <div className="card bg-danger mx-3" >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{ship.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item overflow-hidden">model : {ship.details.properties.model} </li>
                <li className="list-group-item overflow-hidden">Time :{ship.details.properties.consumables} </li>
                <li className="list-group-item overflow-hidden">Class : {ship.details.properties.vehicle_class}</li>
            </ul>
            <div className="card-body">
            <Link to={`/StarShip/${ship.uid}`} className="btn btn-dark">
                Learn More
            </Link>
            <button onClick={() => agregarFavorito(ship)} className="btn btn-danger">
                                { isInFavoritosShips? (
                                    <i className="fas fa-heart"></i>
                                ) : (
                                    <i className="far fa-heart"></i>
                                )}
            </button>
            </div>
        </div>
</div>
    )
};

export const PlanetsCard = ({planet, agregarFavorito, favoritos}) => {

const isInFavoritosPlanet = favoritos.some(favorito => favorito.name === planet.name);

    return (
    <div className="contenedoresCard">
        <div className="card bg-danger mx-3" >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{planet.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item overflow-hidden">gravity : {planet.details.properties.gravity} </li>
                <li className="list-group-item overflow-hidden">Time rotation : {planet.details.properties.rotation_period} </li>
                <li className="list-group-item overflow-hidden">terrain :{planet.details.properties.terrain} </li>
            </ul>
            <div className="card-body">
            <Link to={`/Planets/${planet.uid}`} className="btn btn-dark">
                Learn More
            </Link>
            <button onClick={() => agregarFavorito(planet)} className="btn btn-danger">
                                    {isInFavoritosPlanet ? (
                                        <i className="fas fa-heart"></i>
                                    ) : (
                                        <i className="far fa-heart"></i>
                                    )}
                                </button>
            </div>
        </div>
    </div>
    )
}