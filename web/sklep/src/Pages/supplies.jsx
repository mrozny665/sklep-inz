import { useEffect, useState } from "react";
import SupplyItem from "../Components/supplyItem";
import { NavLink } from "react-router-dom";
import { getSupplies, getProducts } from "../Services/apiService";
import Modal from "react-modal";
import ProductItem from "../Components/productItem";
import axios from "axios";
import "../Services/dateExtentions.jsx";

const Supplies = () => {
	const [supplies, setSupplies] = useState([]);
	const [modalIsOpen, setModalOpen] = useState(false);
	const [products, setProducts] = useState([]);
	const [count, setCount] = useState(0);
	const [query, setQuery] = useState("");
	const [isPicked, setIsPicked] = useState(false);
	const [pickedProduct, setPickedProduct] = useState();

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
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
		setModalOpen(false);
	};

	useEffect(() => {
		let mount = true;
		getSupplies().then((res) => {
			console.log("Response from api ", res);
			setSupplies(res);
			return () => (mount = false);
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
				<button onClick={openModal}>Dodaj dostawę</button>
				<NavLink to="/employee" className="nav-button">
					Powrót
				</NavLink>
			</div>
			<Modal isOpen={modalIsOpen} contentLabel="Test">
				<button onClick={closeModal}>Zamknij</button>
				<div>
					<input value={query} onChange={handleQuery}></input>
				</div>
				<div>{/*Góra listy */}</div>
				{isPicked ? (
					<div>
						<ProductItem element={pickedProduct} />
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
				<div class="sale-list">
					<div class="sale-list-item" style={{ backgroundColor: "white" }}>
						<div>Nazwa towaru</div>
						<div class="sale-item-right">
							<div>Stawka VAT</div>
							<div>Cena 1 szt. bez VAT</div>
							<div>Cena 1 szt. z VAT</div>
						</div>
					</div>
					{products
						.filter((it) => it.product_name.includes(query))
						.map((it) => (
							<div key={it.id} onClick={() => handleClickItem(it)}>
								<ProductItem key={it.id} element={it} />
							</div>
						))}
				</div>
			</Modal>
			<div class="sale-list">
				<div>Dostawy</div>
				{supplies.map((it) => (
					<SupplyItem key={it.id_rachunku} element={it} />
				))}
			</div>
		</div>
	);
};

export default Supplies;
