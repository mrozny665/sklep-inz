import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getSupplies, getProducts, getEmployees } from "../Services/apiService";
import Modal from "react-modal";
import ProductItem from "../Components/productItem";
import axios from "axios";
import "../Services/dateExtentions.jsx";
import { Button, Table } from "react-bootstrap";

const Supplies = () => {
	const [supplies, setSupplies] = useState([]);
	const [modalIsOpen, setModalOpen] = useState(false);
	const [products, setProducts] = useState([]);
	const [count, setCount] = useState(0);
	const [query, setQuery] = useState("");
	const [isPicked, setIsPicked] = useState(false);
	const [pickedProduct, setPickedProduct] = useState();
	const [employees, setEmployees] = useState([]);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setPickedProduct();
		setIsPicked(false);
		setModalOpen(false);
	};

	const handleQuery = (e) => {
		setQuery(e.target.value);
	};

	const handleClickItem = (e) => {
		console.log("Click " + e);
		setIsPicked(true);
		setPickedProduct(e);
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		const date = new Date(Date.now());
		const res = await axios.post("/api/supplies/", {
			supply_date: date.toJSONDate(),
			count: count,
			product_id: pickedProduct.product_id,
			employee_id: 1,
		});
		setPickedProduct();
		setIsPicked(false);
		closeModal();
	};

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

	useEffect(() => {
		let mount = true;
		getProducts().then((res) => {
			console.log("Response from api ", res);
			setProducts(res);
			return () => (mount = false);
		});
	}, [modalIsOpen]);

	return (
		<div>
			<div class="navbar">
				<Button onClick={openModal}>Dodaj dostawę</Button>
				<NavLink to="/employee">
					<Button>Powrót</Button>
				</NavLink>
			</div>
			<Modal isOpen={modalIsOpen} contentLabel="Test">
				<Button onClick={closeModal}>Zamknij</Button>
				{isPicked ? (
					<div>
						<div class="product-item">
							<ProductItem element={pickedProduct} />
						</div>
						<label htmlFor="count">Liczba</label>
						<input
							id="count"
							value={count}
							type="number"
							onChange={(e) => setCount(e.target.value)}
							min={1}
						></input>
						<button onClick={handleAdd}>Dodaj</button>
					</div>
				) : null}
				<div>
					<label htmlFor="query">Wyszukaj: </label>
					<input id="query" value={query} onChange={handleQuery}></input>
				</div>

				<Table striped bordered hover>
					<thead>
						<th>Nazwa towaru</th>
						<th></th>
						<th>Stawka VAT</th>
						<th>Cena 1 szt. bez VAT</th>
						<th>Cena 1 szt. z VAT</th>
					</thead>
					<tbody>
						{products
							.filter((it) => it.product_name.includes(query))
							.map((it) => (
								<tr onClick={() => handleClickItem(it)}>
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
			</Modal>

			<Table striped bordered hover>
				<thead>
					<th>#</th>
					<th>Data dostawy</th>
					<th>Pracownik przyjmujący dostawę</th>
				</thead>
				<tbody>
					{supplies.map((it) => (
						<tr>
							<td>{it.supply_id}</td>
							<td>{it.supply_date}</td>
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
