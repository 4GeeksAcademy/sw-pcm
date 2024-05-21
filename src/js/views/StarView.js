import { Context } from "../store/appContext";
import React, { useContext, useEffect, useState } from "react";
import { CharacterCard, StarShipCard, PlanetsCard } from "../component/Card.jsx"; //`https://playground.4geeks.com/contact/agendas/Ronalse/contacts/${id}`


export const StarView = () => {
    const { store, actions } = useContext(Context);
  
    useEffect(() => {
        actions.CharactersGet();
        actions.PlanetsGet();
        actions.ShipsGet();
        actions.cargarFavoritos();
    }, []);



    return (
        <div className="container-fluid">
            <div className="Top text-light text-center">
                <h1>STAR WARS <i className="fab fa-galactic-senate"></i> </h1>
            </div>
                <div className="Personajes text-light">
                    <h2 className="text-center">CHARACTERS <i className="fab fa-jedi-order"></i></h2>
                </div>
                <div className="scroll-container">
                    {store.Character.map((personaje,index) => (
                        <div className="Cardsx" key={index}>
                            <CharacterCard
                                personaje={personaje}
                                agregarFavorito={actions.FavoriteCharacter}
                                favoritos={store.favoritos}
                            />
                        </div>
                    ))}
                </div>
                <div className="Ships text-light">
                    <h2 className="text-center">STARSHIPS <i className="fas fa-space-shuttle"></i></h2>
                </div>
                <div className="scroll-container">
                    {store.Ships.map((ship,index) => (
                        <div className="Shipsxd" key={index}>
                            <StarShipCard
                                ship = {ship}
                                agregarFavorito={actions.FavoriteShips}
                                favoritos={store.favoritos}
                            />
                        </div>
                    ))}
                </div>
                <div className="Planets text-light">
                    <h2 className="text-center">PLANETS <i className="fas fa-globe"></i></h2>
                </div>
                <div className="scroll-container">
                    {store.Planets.map((planet,index) =>(
                        <div className="Planetasxd" key={index}>
                            <PlanetsCard
                                planet = {planet}
                                agregarFavorito={actions.FavoritePlanets}
                                favoritos={store.favoritos}
                            />
                        </div>
                    ))}
                </div>
        </div>
    );
};