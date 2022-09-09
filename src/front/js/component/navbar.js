import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.user && store.user.email}
					{"  "}
					{
						!store.token ? <Link to="/login">
							<button className="btn btn-primary">Login</button>
							</Link>:
						<button onClick={() => actions.logout()} className="btn btn-primary">Cerrar Sesión</button>
					}
					{" "}
					{
						!store.token ?
						<Link to="/signup">
							<button className="btn btn-primary">Registrarse</button>
						</Link> : null
					}
					
				</div>			
			</div>
		</nav>
	);
};
