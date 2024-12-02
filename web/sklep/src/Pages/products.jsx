import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../Services/apiService";
import axios from "axios";
import {
	Form,
	Button,
	Table,
	Row,
	Col,
	Toast,
	ToastContainer,
} from "react-bootstrap";
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

	const [deleted, setDeleted] = useState();
	const [deletedAmount, setDeletedAmount] = useState(0);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const closeDeleteModal = () => {
		setDeleted(null);
		setDeletedAmount(0);
		setOpenDeleteModal(false);
	};

	const addAmount = () => {
		if (1 + deletedAmount >= deleted.count) {
			setDeletedAmount(deleted.count);
		} else {
			setDeletedAmount(deletedAmount + 1);
		}
	};

	const subtractAmount = () => {
		if (deletedAmount <= 0) {
			setDeletedAmount(0);
		} else {
			setDeletedAmount(deletedAmount - 1);
		}
	};

	const handleDelete = async () => {
		const newCount = deleted.count - deletedAmount;
		const form = {
			count: newCount,
		};
		const res = await axios.patch(
			"/api/products/" + deleted.product_id + "/",
			form
		);
		const i = products.findIndex((it) => it === deleted);
		products[i].count = newCount;
		setDeleted(null);
		setDeletedAmount(0);
		setOpenDeleteModal(false);
		setShowDeleteToast(true);
	};

	const [showDeleteToast, setShowDeleteToast] = useState(false);
	const [showAddToast, setShowAddToast] = useState(false);

	return (
		<div>
			<div class="navbar">
				<Button onClick={openModal}>Nowy towar</Button>
				<NavLink to="/employee">
					<Button>Powrót</Button>
				</NavLink>
			</div>
			<ToastContainer position="bottom-end">
				<Toast
					onClose={() => setShowDeleteToast(false)}
					show={showDeleteToast}
					className="d-inline-block m-1"
					bg="success"
					delay={3000}
					autohide
				>
					<Toast.Header>
						<strong className="me-auto">Sukces!</strong>
					</Toast.Header>
					<Toast.Body>Usunięto towar!</Toast.Body>
				</Toast>
				<Toast
					onClose={() => setShowAddToast(false)}
					show={showAddToast}
					className="d-inline-block m-1"
					bg="success"
					delay={3000}
					autohide
				>
					<Toast.Header>
						<strong className="me-auto">Sukces!</strong>
					</Toast.Header>
					<Toast.Body>Dodano towar!</Toast.Body>
				</Toast>
			</ToastContainer>
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
			<Modal show={openDeleteModal} onHide={closeDeleteModal}>
				<Modal.Header closeButton>
					<Modal.Title>Usuń towar</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Ile sztuk towaru usunąć?</p>
					<Form>
						<Row>
							<Col md="auto">
								<Button onClick={subtractAmount}>-</Button>
							</Col>
							<Col>
								<Form.Control
									value={deletedAmount}
									onChange={(e) => setDeletedAmount(e.target.value)}
									type="number"
									min={0}
									max={deleted ? deleted.count : 10}
								></Form.Control>
							</Col>
							<Col md="auto">
								<Button onClick={addAmount}>+</Button>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary">Anuluj</Button>
					<Button type="submit" onClick={handleDelete}>
						Usuń
					</Button>
				</Modal.Footer>
			</Modal>
			<div>{/*Faktura*/}</div>
			<div>
				<label htmlFor="query">Wyszukaj: </label>
				<input id="query" value={query} onChange={handleQuery}></input>
			</div>
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
					{products
						.filter((it) => it.product_name.toLowerCase().includes(query))
						.map((it) => (
							<tr>
								<td>
									<Button
										onClick={() => {
											setDeleted(it);
											setOpenDeleteModal(true);
											// handleDelete(it);
										}}
									>
										Usuń
									</Button>
								</td>
								<td>
									{it.product_name} {it.unit}
								</td>
								<td>{it.count} szt.</td>
								<td>{it.vat} %</td>
								<td>{Number(it.price_no_vat).toFixed(2)} zł</td>
								<td>{Number(it.price_with_vat).toFixed(2)} zł</td>
							</tr>
						))}
				</tbody>
			</Table>
		</div>
	);
};

export default Products;
