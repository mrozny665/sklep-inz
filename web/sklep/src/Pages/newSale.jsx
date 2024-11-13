import SaleItem from "../Components/saleItem";
import ProductItem from "../Components/productItem";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { getProducts } from "../Services/apiService";
import axios from "axios";
import "../Services/dateExtentions.jsx";

const NewSale = () => {
	const [items, setItems] = useState([]);
	const [modalIsOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const handleDelete = (id) => {
		setItems(items.filter((e) => e.product_id === id));
	};

	const list = items.map((it) => (
		<div>
			<div class="sale-item">
				<div class="sale-item-part">
					<button onClick={() => handleDelete(it.id)}>Usuń</button>
				</div>
				<SaleItem key={it.id} element={it} />
			</div>
		</div>
	));

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

	const handleAddBill = async (e) => {
		e.preventDefault();
		console.log(items);
		let sum_no_vat = 0;
		let sum_with_vat = 0;
		items.forEach((it) => {
			sum_no_vat += it.price_no_vat * it.count;
			sum_with_vat += it.price_with_vat * it.count;
		});
		const date = new Date(Date.now());
		const bill = {
			issue_date: date.toJSONDate(),
			products_count: items.length,
			price_no_vat: sum_no_vat,
			price_with_vat: sum_with_vat,
			employee_id: Number(1),
		};
		console.log(bill);
		const res = await axios.post("/api/bills/", bill);
		console.log(res);
		const bill_id = res.data.bill_id;
		items.forEach(async (e) => {
			const res = await axios.post("/api/sales/", {
				count: e.count,
				price_no_vat: e.price_no_vat,
				price_with_vat: e.price_with_vat,
				product_id: e.product_id,
				bill_id: bill_id,
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
				<button class="nav-button" onClick={openModal}>
					Dodaj towar
				</button>
				<button class="nav-button" onClick={handleAddBill}>
					Zapisz
				</button>
				<NavLink to="/employee/sales" className="nav-button">
					Powrót
				</NavLink>
			</div>
			<Modal isOpen={modalIsOpen} contentLabel="Test">
				<button className="nav-button" onClick={closeModal}>
					Zamknij
				</button>
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
							max={pickedProduct.count}
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
						.filter((it) => it.count > 0)
						.filter((it) => it.product_name.includes(query))
						.map((it) => (
							<div key={it.id} onClick={() => handleClickItem(it)}>
								<div class="product-item">
									<ProductItem key={it.id} element={it} />
								</div>
							</div>
						))}
				</div>
			</Modal>
			<div>{/*Faktura*/}</div>
			<div>{/*Góra listy */}</div>
			<div class="sale-list">
				<div class="sale-item-main" style={{ paddingLeft: "130px" }}>
					<div class="sale-item-main-part">Nazwa towaru</div>
					<div></div>
					<div class="sale-item-main-part">Stawka VAT</div>
					<div class="sale-item-main-part">Cena 1 szt. bez VAT</div>
					<div class="sale-item-main-part">Cena 1 szt. z VAT</div>
					<div class="sale-item-main-part">Cena łączna bez VAT</div>
					<div class="sale-item-main-part">Cena łączna z VAT</div>
				</div>
				{list}
			</div>
		</div>
	);
};

export default NewSale;
