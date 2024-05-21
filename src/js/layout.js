import React, {useContext} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Context } from "./store/appContext";

//import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { StarView } from "./views/StarView";
import { Character } from "./component/Character.jsx";
import { StarShip } from "./component/StarShip.jsx";
import { Planet } from "./component/Planets.jsx"

//create your first component
const Layout = () => {
	const { store } = useContext(Context);
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar favoritos={store.favoritos}/>
					<Routes>
						<Route path="/" element={<StarView />} />
						<Route path="/Character/:id" element={<Character />} />
						<Route path="/Planets/:id" element={<Planet />} />
						<Route path="/StarShip/:id" element={<StarShip />} />
						<Route path="/demo" element={<Demo />} />
						<Route path="/single/:theid" element={<Single />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);