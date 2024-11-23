import { NavLink, redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ManagerHub = ({ isLoggedIn, setIsLoggedIn, isManager }) => {
	let navigate = useNavigate();
	useEffect(() => {
		if (isLoggedIn === false) navigate("/");
		else if (isManager === false) navigate("/employee");
	}, []);

	return (
		<main class="grid menu">
			<div class="menu-container-1">
				<div class="menu-container-2">
					<NavLink to="/employee" className="menu-tile">
						Menu pracownika
					</NavLink>
					<NavLink to="/manager" className="menu-tile">
						Menu managera
					</NavLink>
				</div>
				<div class="menu-container-2">
					<NavLink
						to="/"
						className="menu-tile"
						onClick={() => setIsLoggedIn(false)}
					>
						Wyloguj
					</NavLink>
				</div>
			</div>
		</main>
	);
};

export default ManagerHub;
