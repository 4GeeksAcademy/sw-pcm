import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = ({favoritos}) => {
	const { store, actions } = useContext(Context);
	return (
		<div className="containerNavbar">
			<nav className="navbar navbar-light  mb-3 fixed-top">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 star-wars">Star Wars</span>
				</Link>
				<div className="ml-auto">
					<div className="botonFavoritos btn-group dropstart">
						<button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							Favoritos <span className="badge bg-secondary">{store.contadorFavoritos}</span>
						</button>
						<ul className="dropdown-menu">
						{favoritos.length > 0 ? (
                                favoritos.map((persona, index) => (
                                    <li key={index}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="dropdown-item">{persona.name}</span>
                                            <button className="btn btn-link" onClick={(event) => actions.eliminarFavorito(persona, event)}>
                                                <i className="fas fa-trash-alt text-warning"></i>
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="dropdown-item">No hay favoritos</li>
                            )}
						</ul>
					</div>
				</div>
			</nav>

		</div>
	);
};