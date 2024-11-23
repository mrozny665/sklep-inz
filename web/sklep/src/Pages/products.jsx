import ProductItem from "../Components/productItem";
import { NavLink } from "react-router-dom";
// import Modal from "react-modal";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../Services/apiService";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const Products = () => {
	const [products, setProducts] = useState([]);

	const [modalIsOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const [name, setName] = useState("");
	const [unit, setUnit] = useState("");
	const [vat, setVat] = useState("23");
	const [price, setPrice] = useState(0);

	const handleAdd = async (e) => {
		e.preventDefault();
		const item = {
			product_name: name,
			count: Number(0),
			vat: Number(vat),
			price_no_vat: Number(price),
			price_with_vat: Number(price) + (price * vat) / 100,
			unit: unit,
		};
		console.log(item);
		const res = await axios.post("/api/products/", item);
		const temp = products;
		temp.push(item);
		setProducts(temp);
		closeModal();
	};

	useEffect(() => {
		let mount = true;
		getProducts().then((res) => {
			console.log("Response from api ", res);
			setProducts(res);
			return () => (mount = false);
		});
	}, []);

	const [query, setQuery] = useState("");

	const handleQuery = (e) => {
		setQuery(e.target.value);
	};

	const handleDelete = (id) => {
		deleteProduct(id).then(() =>
			setProducts(products.filter((p) => p.product_id !== id))
		);
	};

	return (
		<div>
			<div class="navbar">
				<div class="nav-button" onClick={openModal}>
					Nowy towar
				</div>
				<NavLink to="/employee" className="nav-button">
					Powrót
				</NavLink>
			</div>
			<Modal show={modalIsOpen} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Dodaj nowy towar</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Nazwa produktu: </Form.Label>
							<Form.Control
								as="input"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Jednostka: </Form.Label>
							<Form.Control
								onChange={(e) => {
									e.preventDefault();
									setUnit(e.target.value);
								}}
								value={unit}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Stawka VAT: </Form.Label>
							<Form.Select onChange={(e) => setVat(e.target.value)} value={vat}>
								<option value="0">0%</option>
								<option value="5">5%</option>
								<option value="8">8%</option>
								<option value="23">23%</option>
							</Form.Select>
						</Form.Group>

						<Form.Group>
							<Form.Label>Cena bez VAT: </Form.Label>
							<Form.Control
								onChange={(e) => setPrice(e.target.value)}
								value={price}
								type="number"
								step="0.01"
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeModal}>
						Zamknij
					</Button>
					<Button varian="primary" onClick={handleAdd}>
						Dodaj towar
					</Button>
				</Modal.Footer>
			</Modal>
			<div>{/*Faktura*/}</div>
			<div>
				<label htmlFor="query">Wyszukaj: </label>
				<input id="query" value={query} onChange={handleQuery}></input>
			</div>
			<div>{/*Góra listy */}</div>
			<div class="sale-list">
				<div class="product-item-main" style={{ paddingLeft: "130px" }}>
					<div class="product-item-main-part">Nazwa towaru</div>
					<div></div>
					<div class="product-item-main-part">Stawka VAT</div>
					<div class="product-item-main-part">Cena 1 szt. bez VAT</div>
					<div class="product-item-main-part">Cena 1 szt. z VAT</div>
				</div>
				{products
					.filter((it) => it.product_name.toLowerCase().includes(query))
					.map((it) => (
						<div class="product-item">
							<div class="product-item-part">
								<button onClick={() => handleDelete(it.product_id)}>
									Usuń
								</button>
							</div>
							<ProductItem key={it.id} element={it} />
						</div>
					))}
			</div>
		</div>
	);
};

export default Products;
