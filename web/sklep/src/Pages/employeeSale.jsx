import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getBills, getSales, getProducts } from "../Services/apiService";
import { Table, Button, Modal } from "react-bootstrap";

const EmployeeSale = ({ id }) => {
	const [bills, setBills] = useState([]);
	const [sales, setSales] = useState([]);
	const [products, setProducts] = useState([]);
	const [chosenBill, setChosenBill] = useState();
	const [billProducts, setBillProducts] = useState([]);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		let mount = true;
		getBills().then((res) => {
			console.log("Response from api ", res);
			setBills(res);
			return () => (mount = false);
		});
	}, []);

	const handleGetProducts = async () => {
		getSales()
			.then((res) => {
				console.log("Response from api ", res);
				const temp = res;
				setSales(temp.filter((it) => it.bill_id === chosenBill.bill_id));
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
		setBillProducts([]);
		setChosenBill();
		setSales([]);
	};

	useEffect(() => {
		console.log(chosenBill);
		if (chosenBill) {
			handleGetProducts();
		}
	}, [chosenBill]);

	useEffect(() => {
		console.log(products);
		if (products.length !== 0) {
			sales.forEach((e) => {
				const temp = billProducts;
				console.log(temp);
				const p = products.find((it) => it.product_id === e.product_id);
				console.log(p);
				temp.push(p);
				console.log(temp);
				setBillProducts(temp);
			});
			setOpenModal(true);
		}
	}, [products]);

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
			<Modal show={openModal} onHide={closeModal}>
				<Modal.Header>
					<Modal.Title>
						Rachunek nr {chosenBill ? chosenBill.bill_id : null}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Data dostawy: {chosenBill ? chosenBill.issue_date : null}</p>
					<p>Pracownik przymujący dostawę: Łukasz Mróz</p>
					<p>
						Łączna cena bez VAT:{" "}
						{chosenBill ? Number(chosenBill.price_no_vat).toFixed(2) : null}
					</p>
					<p>
						Łączna cena z VAT:{" "}
						{chosenBill ? Number(chosenBill.price_with_vat).toFixed(2) : null}
					</p>
					<Table striped bordered hover>
						<thead>
							<th>Nazwa towaru</th>
							<th />
							<th>Stawka VAT</th>
							<th>Cena 1 szt. bez VAT</th>
							<th>Cena 1 szt. z VAT</th>
							<th>Łączna cena bez VAT</th>
							<th>Łączna cena z VAT</th>
						</thead>
						<tbody>
							{billProducts.map((it) => (
								<tr>
									<td>
										{it.product_name} {it.unit}
									</td>
									<td>
										{sales.find((e) => e.product_id === it.product_id).count}{" "}
										szt.
									</td>
									<td>{it.vat} %</td>
									<td>{Number(it.price_no_vat).toFixed(2)} zł</td>
									<td>{Number(it.price_with_vat).toFixed(2)} zł</td>
									<td>
										{Number(
											sales.find((e) => e.product_id === it.product_id)
												.price_no_vat
										).toFixed(2)}{" "}
										zł
									</td>
									<td>
										{Number(
											sales.find((e) => e.product_id === it.product_id)
												.price_with_vat
										).toFixed(2)}{" "}
										zł
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Modal.Body>
			</Modal>
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
						{bills
							.filter((it) => it.employee_id === id)
							.map((it) => (
								<tr onClick={() => setChosenBill(it)}>
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
