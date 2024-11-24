import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getBills } from "../Services/apiService";
import { Table, Button } from "react-bootstrap";

const EmployeeSale = ({ id }) => {
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
				<NavLink to="newsale">
					<Button>Sprzedaż</Button>
				</NavLink>
				<NavLink to="/employee">
					<Button>Powrót</Button>
				</NavLink>
			</div>
			<div class="sale-list">
				<div>Twoje rachunki</div>
				<Table striped bordered hover>
					<thead>
						<th>#</th>
						<th>Data sprzedaży</th>
						<th>Cena bez VAT</th>
						<th>Cena z VAT</th>
					</thead>
					<tbody>
						{sales
							.filter((it) => it.employee_id === id)
							.map((it) => (
								<tr>
									<td>{it.bill_id}</td>
									<td>{it.issue_date}</td>
									<td>{Number(it.price_no_vat).toFixed(2)}</td>
									<td>{Number(it.price_with_vat).toFixed(2)}</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default EmployeeSale;
