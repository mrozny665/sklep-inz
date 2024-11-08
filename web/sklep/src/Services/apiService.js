import axios from "axios";

export function getBills() {
	return axios.get("/api/bills").then((res) => res.data);
}

export function getProducts() {
	return axios.get("/api/products").then((res) => res.data);
}

export function deleteProduct(id) {
	return axios.delete("/api/products/" + id + "/").then((res) => res.data);
}
