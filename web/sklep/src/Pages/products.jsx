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
				<NavLink to="/employee" className="nav-button">
					Powrót
				</NavLink>
				<button onClick={openModal}>Nowy towar</button>
			</div>
			<Modal isOpen={modalIsOpen} contentLabel="Test">
				<input
					name="name"
					placeholder="Nazwa produktu"
					value={name}
					onChange={(e) => setName(e.target.value)}
				></input>
				<input
					name="unit"
					placeholder="Jednostka"
					value={unit}
					onChange={(e) => setUnit(e.target.value)}
				></input>
				<select value={vat} onChange={(e) => setVat(e.target.value)}>
					<option value="0">0%</option>
					<option value="5">5%</option>
					<option value="8">8%</option>
					<option value="23">23%</option>
				</select>
				<input
					name="price"
					placeholder="Cena bez VAT"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					min={0}
					type="number"
					step={0.01}
				></input>
				<button onClick={handleAdd}>Zapisz</button>
				<button onClick={closeModal}>Zamknij</button>
			</Modal>
			<div>{/*Faktura*/}</div>
			<div>
				<input value={query} onChange={handleQuery}></input>
			</div>
			<div>{/*Góra listy */}</div>
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
						<div>
							<button onClick={() => handleDelete(it.product_id)}>Usuń</button>
							<ProductItem key={it.id} element={it} />
						</div>
					))}
			</div>
		</div>
	);
};

export default Products;
