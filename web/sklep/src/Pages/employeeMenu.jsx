import { NavLink } from "react-router-dom";

const EmployeeMenu = () => {
	return (
		<main class="grid menu">
			<div class="menu-container-1">
				<div class="menu-container-2">
					<NavLink to="sales" className="menu-tile">
						Sprzedaż towaru
					</NavLink>
					<div class="menu-tile">Dostawa</div>
				</div>
				<div class="menu-container-2">
					<div class="menu-tile">Przegląd towaru</div>
					<NavLink to="/" className="menu-tile">
						Wyloguj
					</NavLink>
				</div>
			</div>
		</main>
	);
};

export default EmployeeMenu;
