import SaleListItem from "../Components/saleListItem";
import { NavLink } from "react-router-dom";

const EmployeeSale = () => {
	const sales = [
		{ id: 1, text: 1 },
		{ id: 2, text: 2 },
	];
	const list = sales.map((it) => <SaleListItem key={it.id} element={it} />);
	return (
		<div>
			<div class="navbar">
				<NavLink to="newsale" className="nav-button">
					Sprzedaż
				</NavLink>
				<NavLink to="/employee" className="nav-button">
					Powrót
				</NavLink>
			</div>
			<div class="sale-list">
				<div>Twoje rachunki</div>
				{list}
			</div>
		</div>
	);
};

export default EmployeeSale;
