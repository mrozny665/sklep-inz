import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EmployeeMenu = ({ isLoggedIn, setIsLoggedIn, isManager }) => {
	let navigate = useNavigate();
	useEffect(() => {
		if (isLoggedIn === false) navigate("/");
	}, []);
	return (
		<main class="grid menu">
			<div class="menu-container-1">
				<div class="menu-container-2">
					<NavLink to="sales" className="menu-tile">
						Sprzedaż towaru
					</NavLink>
					<NavLink to="supplies" className="menu-tile">
						Dostawa
					</NavLink>
				</div>
				<div class="menu-container-2">
					<NavLink to="products" className="menu-tile">
						Przegląd towaru
					</NavLink>
					{isManager ? (
						<NavLink to="/hub" className="menu-tile">
							Powrót
						</NavLink>
					) : (
						<NavLink
							to="/"
							className="menu-tile"
							onClick={() => setIsLoggedIn(false)}
						>
							Wyloguj
						</NavLink>
					)}
				</div>
			</div>
		</main>
	);
};

export default EmployeeMenu;
