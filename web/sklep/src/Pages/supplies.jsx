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
				<button class="nav-button" onClick={openModal}>
					Dodaj dostawę
				</button>
				<NavLink to="/employee" className="nav-button">
					Powrót
				</NavLink>
			</div>
			<Modal isOpen={modalIsOpen} contentLabel="Test">
				<button onClick={closeModal}>Zamknij</button>
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
				<div class="sale-list">
					<div class="product-item-main" style={{ paddingLeft: "120px" }}>
						<div class="product-item-main-part">Nazwa towaru</div>
						<div></div>
						<div class="product-item-main-part">Stawka VAT</div>
						<div class="product-item-main-part">Cena 1 szt. bez VAT</div>
						<div class="product-item-main-part">Cena 1 szt. z VAT</div>
					</div>
					{products
						.filter((it) => it.product_name.includes(query))
						.map((it) => (
							<div
								class="product-item"
								key={it.id}
								onClick={() => handleClickItem(it)}
							>
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
