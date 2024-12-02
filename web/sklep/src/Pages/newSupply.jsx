import ProductItem from "../Components/productItem.jsx";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../Services/apiService.js";
import axios from "axios";
import "../Services/dateExtentions.jsx";
import { Button, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const NewSupply = () => {
	const [items, setItems] = useState([]);
	const [modalIsOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setPickedProduct();
		setIsPicked(false);
		setCount(0);
		setIsOpen(false);
	}

	const handleDelete = (id) => {
		setItems(items.filter((e) => e.product_id === id));
	};

	const [count, setCount] = useState();

	const [products, setProducts] = useState([]);

	useEffect(() => {
		let mount = true;
		getProducts().then((res) => {
			console.log("Response from api ", res);
			setProducts(res);
			return () => (mount = false);
		});
	}, [modalIsOpen]);

	const handleAddSupply = async (e) => {
		e.preventDefault();
		const date = new Date(Date.now());
		const supplyMain = {
			supply_date: date.toJSONDate(),
			product_count: items.length,
			employee_id: Number(1),
		};
		const res = await axios.post("/api/supplies/", supplyMain);
		console.log(res);
		const supplyId = res.data.supply_id;
		items.forEach(async (e) => {
			const res = await axios.post("/api/productsupplies/", {
				count: e.count,
				product_id: e.product_id,
				supply_id: supplyId,
			});
			console.log(res);
		});
	};

	const [query, setQuery] = useState("");

	const handleQuery = (e) => {
		setQuery(e.target.value);
	};

	const [isPicked, setIsPicked] = useState(false);
	const [pickedProduct, setPickedProduct] = useState();

	const handleClickItem = (e) => {
		console.log("Click " + e);
		setIsPicked(true);
		setPickedProduct(e);
		setCount(0);
	};

	const handleAdd = () => {
		const temp = items;
		temp.push({
			product_id: pickedProduct.product_id,
			product_name: pickedProduct.product_name,
			count: count,
			price_no_vat: pickedProduct.price_no_vat,
			price_with_vat: pickedProduct.price_with_vat,
			vat: pickedProduct.vat,
			unit: pickedProduct.unit,
		});
		setItems(temp);
		setPickedProduct();
		setIsPicked(false);
		setIsOpen(false);
	};

	return (
		<div>
			<div class="navbar">
				<Button onClick={openModal}>Dodaj towar</Button>
				<Button onClick={handleAddSupply}>Zapisz</Button>
				<NavLink to="/employee/supplies">
					<Button>Powrót</Button>
				</NavLink>
			</div>
			<Modal show={modalIsOpen} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Dodaj towar</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{isPicked ? (
						<div>
							<div>Wybrany przedmiot</div>
							<div class="product-item">
								<ProductItem element={pickedProduct} />
							</div>
							<label htmlFor="count">Liczba: </label>
							<input
								id="count"
								value={count}
								type="number"
								defaultValue={0}
								onChange={(e) => setCount(e.target.value)}
								min={1}
							></input>
						</div>
					) : null}
					<div>
						<label htmlFor="query">Wyszukaj: </label>
						<input id="query" value={query} onChange={handleQuery}></input>
					</div>
					<Table striped bordered hover>
						<thead>
							<th>Nazwa towaru</th>
							<th />
							<th>Stawka VAT</th>
							<th>Cena 1 szt. bez VAT</th>
							<th>Cena 1 szt. z VAT</th>
						</thead>
						<tbody>
							{products
								.filter((it) => it.product_name.toLowerCase().includes(query))
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
				</Modal.Body>
				<Modal.Footer>
					{isPicked ? <Button onClick={handleAdd}>Dodaj</Button> : null}
					<Button variant="secondary" onClick={closeModal}>
						Zamknij
					</Button>
				</Modal.Footer>
			</Modal>
			<div>{/*Faktura*/}</div>
			<div>{/*Góra listy */}</div>
			<Table striped bordered hover>
				<thead>
					<th />
					<th>Nazwa towaru</th>
					<th />
					<th>Stawka VAT</th>
					<th>Cena 1 szt. bez VAT</th>
					<th>Cena 1 szt. z VAT</th>
				</thead>
				<tbody>
					{items.map((it) => (
						<tr>
							<td>
								<Button onClick={() => handleDelete(it)}>Usuń</Button>
							</td>
							<td>
								{it.product_name} {it.unit}
							</td>
							<td>{it.count} szt.</td>
							<td>{it.vat} %</td>
							<td>{Number(it.price_no_vat).toFixed(2)}</td>
							<td>{Number(it.price_with_vat).toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default NewSupply;
