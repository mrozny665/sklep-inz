import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
	getSupplies,
	getEmployees,
	getProductSupplies,
	getProducts,
} from "../Services/apiService";
import "../Services/dateExtentions.jsx";
import { Button, Table, Modal } from "react-bootstrap";

const Supplies = () => {
	const [supplies, setSupplies] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [supplyProducts, setSupplyProducts] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [chosenSupply, setChosenSupply] = useState();
	const [productSupplies, setProductSupplies] = useState([]);
	const [products, setProducts] = useState([]);

	const handleGetProducts = async () => {
		getProductSupplies()
			.then((res) => {
				console.log("Response from api ", res);
				const temp = res;
				setProductSupplies(
					temp.filter((it) => it.supply_id === chosenSupply.supply_id)
				);
			})
			.then(
				getProducts()
					.then((res) => {
						setProducts(res);
						console.log(res);
						console.log(products);
					})
					.then(console.log(products))
			);
	};

	const closeModal = () => {
		setOpenModal(false);
		setSupplyProducts([]);
		setChosenSupply();
		setProductSupplies([]);
	};

	useEffect(() => {
		console.log(chosenSupply);
		if (chosenSupply) {
			handleGetProducts();
		}
	}, [chosenSupply]);

	useEffect(() => {
		console.log(products);
		if (products.length !== 0) {
			productSupplies.forEach((e) => {
				const temp = supplyProducts;
				console.log(temp);
				const p = products.find((it) => it.product_id === e.product_id);
				console.log(p);
				temp.push(p);
				console.log(temp);
				setSupplyProducts(temp);
			});
			setOpenModal(true);
		}
	}, [products]);

	useEffect(() => {
		let mount = true;
		getEmployees()
			.then((res) => {
				console.log("Response from api ", res);
				setEmployees(res);
				return () => (mount = false);
			})
			.then(() => {
				let mount = true;
				getSupplies().then((res) => {
					console.log("Response from api ", res);
					setSupplies(res);
					return () => (mount = false);
				});
			});
	}, []);

	return (
		<div>
			<div class="navbar">
				<NavLink to="newsupply">
					<Button>Dodaj dostawę</Button>
				</NavLink>
				<NavLink to="/employee">
					<Button>Powrót</Button>
				</NavLink>
			</div>

			<Modal show={openModal} onHide={closeModal}>
				<Modal.Header>
					<Modal.Title>
						Dostawa nr {chosenSupply ? chosenSupply.supply_id : null}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Data dostawy: {chosenSupply ? chosenSupply.supply_date : null}</p>
					<p>Pracownik przymujący dostawę: Łukasz Mróz</p>
					<Table striped bordered hover>
						<thead>
							<th>Nazwa towaru</th>
							<th />
							<th>Stawka VAT</th>
							<th>Cena 1 szt. bez VAT</th>
							<th>Cena 1 szt. z VAT</th>
						</thead>
						<tbody>
							{supplyProducts.map((it) => (
								<tr>
									<td>
										{it.product_name} {it.unit}
									</td>
									<td>{it.count} szt.</td>
									<td>{it.vat}</td>
									<td>{Number(it.price_no_vat).toFixed(2)}</td>
									<td>{Number(it.price_with_vat).toFixed(2)}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Modal.Body>
			</Modal>

			<Table striped bordered hover>
				<thead>
					<th>#</th>
					<th>Data dostawy</th>
					<th>Liczba towarów</th>
					<th>Pracownik przyjmujący dostawę</th>
				</thead>
				<tbody>
					{supplies.map((it) => (
						<tr
							onClick={() => {
								setChosenSupply(it);
							}}
						>
							<td>{it.supply_id}</td>
							<td>{it.supply_date}</td>
							<td>{it.product_count}</td>
							<td>
								{
									employees.find((e) => e.employee_id === it.employee_id)
										.employee_name
								}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Supplies;
