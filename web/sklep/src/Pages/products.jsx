import ProductItem from "../Components/productItem";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../Services/apiService";
import axios from "axios";

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
				<button class="nav-button" onClick={openModal}>
					Nowy towar
				</button>
				<NavLink to="/employee" className="nav-button">
					Powrót
				</NavLink>
			</div>
			<Modal isOpen={modalIsOpen} contentLabel="Test">
				<div>
					<div class="new-product">
						<label htmlFor="name">Nazwa produktu: </label>
						<input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></input>
						<label htmlFor="unit">Jednostka: </label>
						<input
							id="unit"
							value={unit}
							onChange={(e) => setUnit(e.target.value)}
						></input>
						<label htmlFor="vat">Stawka VAT: </label>
						<select
							id="vat"
							value={vat}
							onChange={(e) => setVat(e.target.value)}
						>
							<option value="0">0%</option>
							<option value="5">5%</option>
							<option value="8">8%</option>
							<option value="23">23%</option>
						</select>
						<label htmlFor="price">Cena bez VAT: </label>
						<input
							id="price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							min={0}
							type="number"
							step={0.01}
						></input>
					</div>
					<button onClick={handleAdd}>Zapisz</button>
					<button onClick={closeModal}>Zamknij</button>
				</div>
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
					.filter((it) => it.product_name.includes(query))
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
