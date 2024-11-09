import { NavLink } from "react-router-dom";

const ManagerHub = () => {
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
					<div class="menu-tile">Wyloguj</div>
				</div>
			</div>
		</main>
	);
};

export default ManagerHub;
