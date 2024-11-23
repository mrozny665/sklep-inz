import { NavLink } from "react-router-dom";

const ManagerMenu = () => {
	return (
		<main class="grid menu">
			<div class="menu-container-1">
				<div class="menu-container-2">
					<NavLink to="sales" className="menu-tile">
						Podsumowanie sprzedaży
					</NavLink>
					<NavLink to="employees" className="menu-tile">
						Pracownicy
					</NavLink>
				</div>
				<div class="menu-container-2">
					<NavLink to="/hub" className="menu-tile">
						Powrót
					</NavLink>
				</div>
			</div>
		</main>
	);
};

export default ManagerMenu;
