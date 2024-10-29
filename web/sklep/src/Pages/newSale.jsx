import SaleItem from "../Components/saleItem";
import { NavLink } from "react-router-dom";

const NewSale = () => {
	const items = [
		{ id: 1, name: "Masło Palma 0,5kg", count: 5, vat: 23, price: 6 },
		{
			id: 2,
			name: "Woda Cisowianka Niegazowana 1L",
			count: 3,
			vat: 23,
			price: 1.5,
		},
	];
	const list = items.map((it) => <SaleItem key={it.id} element={it} />);
	return (
		<div>
			<div class="navbar">
				<NavLink to="/employee/sales" className="nav-button">
					Powrót
				</NavLink>
			</div>
			<div>{/*Faktura*/}</div>
			<div>{/*Góra listy */}</div>
			<div class="sale-list">
				<div class="sale-list-item" style={{ backgroundColor: "white" }}>
					<div>Nazwa towaru</div>
					<div class="sale-item-right">
						<div>Stawka VAT</div>
						<div>Cena 1 szt. bez VAT</div>
						<div>Cena 1 szt. z VAT</div>
						<div>Cena łączna bez VAT</div>
						<div>Cena łączna z VAT</div>
					</div>
				</div>
				{list}
			</div>
		</div>
	);
};

export default NewSale;
