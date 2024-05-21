const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			Character: [],
			Planets : [],
			Ships : [],
            favoritos: [],
            contadorFavoritos: 0
		},
		actions: {
			// Use getActions to call a function within a fuction
		PlanetsGet : () =>{
			fetch("https://www.swapi.tech/api/planets")
			.then(response => response.json())
			.then(data => {
				// Array para almacenar las promesas de las solicitudes individuales de cada planeta
				const planetPromises = data.results.map(planet => {
					// Realizar una solicitud para obtener detalles sobre el planeta
					return fetch(planet.url)
						.then(response => response.json())
						.then(details => {
							// Agregar los detalles obtenidos al objeto del planeta
							planet.details = details.result;
							return planet;
						});
				});
	
				// Esperar a que todas las promesas se completen antes de actualizar el estado
				Promise.all(planetPromises)
					.then(planetsWithDetails => {
						setStore({ Planets: planetsWithDetails });
					})
					.catch(error => console.error(error));
			})
			.catch(error => console.error(error));
		},

		CharactersGet : () =>{
			fetch("https://www.swapi.tech/api/people/")
			.then(response => response.json())
			.then(data => {
				// Array para almacenar las promesas de las solicitudes individuales de cada personaje
				const characterPromises = data.results.map(personaje => {
					// Realizar una solicitud para obtener detalles sobre el personaje
					return fetch(personaje.url)
						.then(response => response.json())
						.then(details => {
							// Agregar los detalles obtenidos al objeto del personaje
							personaje.details = details.result;
							return personaje;
						});
				});
	
				// Esperar a que todas las promesas se completen antes de actualizar el estado
				Promise.all(characterPromises)
					.then(charactersWithDetails => {
						console.log(charactersWithDetails)
						setStore({ Character: charactersWithDetails });
					})
					.catch(error => console.error(error));
			})
			.catch(error => console.error(error));
		},

		ShipsGet : async () =>{
			fetch("https://www.swapi.tech/api/vehicles/")
        .then(response => response.json())
        .then(data => {
            // Array para almacenar las promesas de las solicitudes individuales de cada nave
            const shipPromises = data.results.map(async ship => {
                // Realizar una solicitud para obtener detalles sobre la nave
                const response = await fetch(ship.url);
				const details = await response.json();
				// Agregar los detalles obtenidos al objeto de la nave
				ship.details = details.result;
				return ship;
            });

            // Esperar a que todas las promesas se completen antes de actualizar el estado
            Promise.all(shipPromises)
                .then(shipsWithDetails => {
                    setStore({ Ships: shipsWithDetails });
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
		},

		FavoriteCharacter: (character) => {                  //funciones para agregar a favoritos o eliminar
			const store = getStore();
			const favoritosActualizados = store.favoritos.filter(fav => fav.name !== character.name);
			if (favoritosActualizados.length === store.favoritos.length) {
				// La persona no estaba en la lista de favoritos, la agregamos
				setStore({ favoritos: [...store.favoritos, character] });
				setStore({ contadorFavoritos: store.contadorFavoritos + 1 });
			} else {
				// La persona ya estaba en la lista de favoritos, la eliminamos
				setStore({ favoritos: favoritosActualizados });
				setStore({ contadorFavoritos: store.contadorFavoritos - 1 });
			}
			// Guardo los favoritos en el almacenamiento local despues de actualizar el estado
			getActions().guardarFavoritos();
		},

		FavoriteShips: (ships) => {
			const store = getStore();
			const favoritosActualizados = store.favoritos.filter(fav => fav.name !== ships.name);
			if (favoritosActualizados.length === store.favoritos.length) {      // El vehiculo no estaba en la lista de favoritos lo agrego
				setStore({ favoritos: [...store.favoritos, ships] });
				setStore({ contadorFavoritos: store.contadorFavoritos + 1 });
			} else {
				setStore({ favoritos: favoritosActualizados });
				setStore({ contadorFavoritos: store.contadorFavoritos - 1 });
			}
			getActions().guardarFavoritos();
		},

		FavoritePlanets: (planet) => {
			const store = getStore();
			const favoritosActualizados = store.favoritos.filter(fav => fav.name !== planet.name);
			if (favoritosActualizados.length === store.favoritos.length) {
				setStore({ favoritos: [...store.favoritos, planet] });
				setStore({ contadorFavoritos: store.contadorFavoritos + 1 });
			} else {
				setStore({ favoritos: favoritosActualizados });
				setStore({ contadorFavoritos: store.contadorFavoritos - 1 });
			}
			getActions().guardarFavoritos();
		},



		cargarFavoritos: () => {
			const localFavorites = JSON.parse(localStorage.getItem("favoritos"));
			if (localFavorites) {
				setStore({ favoritos: localFavorites });
				setStore({ contadorFavoritos: localFavorites.length });
			}
		},

		guardarFavoritos: () => {
			const store = getStore();
			localStorage.setItem("favoritos", JSON.stringify(store.favoritos));
		},



		eliminarFavorito: (favorito, event) => {
			event.stopPropagation(); // esto es para que no se cierre el dropdown al borrar un favorito
			const store = getStore();
			const favoritosActualizados = store.favoritos.filter(item => item.name !== favorito.name);
			setStore({ favoritos: favoritosActualizados });
			setStore({ contadorFavoritos: favoritosActualizados.length });
			// Guardar los favoritos en el almacenamiento local después de actualizar el estado
			getActions().guardarFavoritos();
		},

		exampleFunction: () => {
			getActions().changeColor(0, "green");
		},
		loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
		},
		changeColor: (index, color) => {
			//get the store
			const store = getStore();

			//we have to loop the entire demo array to look for the respective index
			//and change its color
			const demo = store.demo.map((elm, i) => {
				if (i === index) elm.background = color;
				return elm;
			});

			//reset the global store
			setStore({ demo: demo });
			}
		}
	};
};

export default getState;