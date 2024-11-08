import { useEffect, useState } from "react";
import SaleListItem from "../Components/saleListItem";
import { NavLink } from "react-router-dom";
import { getBills } from "../Services/apiService";

const EmployeeSale = () => {
	const [sales, setSales] = useState([]);

	useEffect(() => {
		let mount = true;
		getBills().then((res) => {
			console.log("Response from api ", res);
			setSales(res);
			return () => (mount = false);
		});
	}, []);

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
				{sales.map((it) => (
					<SaleListItem key={it.id_rachunku} element={it} />
				))}
			</div>
		</div>
	);
};

export default EmployeeSale;
