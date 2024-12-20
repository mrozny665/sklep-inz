import axios from "axios";

export function getBills() {
	return axios.get("/api/bills").then((res) => res.data);
}

export function getSales() {
	return axios.get("/api/sales").then((res) => res.data);
}

export function getProducts() {
	return axios.get("/api/products").then((res) => res.data);
}

export function getSupplies() {
	return axios.get("/api/supplies").then((res) => res.data);
}

export function getEmployees() {
	return axios.get("/api/employees").then((res) => res.data);
}

export function getEmployee(id) {
	return axios.get("/api/employees/" + id + "/").then((res) => res.data);
}

export function deleteProduct(id) {
	return axios.delete("/api/products/" + id + "/").then((res) => res.data);
}

export function getProductSupplies() {
	return axios.get("/api/productsupplies").then((res) => res.data);
}
