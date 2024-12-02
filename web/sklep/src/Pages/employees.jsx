import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getEmployees } from "../Services/apiService";
import { Table, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const Employees = () => {
	const [employees, setEmployees] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState("");
	const [isAddedModalOpen, setIsAddedModalOpen] = useState(false);
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [fireModalOpen, setFireModalOpen] = useState(false);
	const [toFire, setToFire] = useState();

	useEffect(() => {
		let mount = true;
		getEmployees().then((res) => {
			console.log("Response from api ", res);
			setEmployees(res);
			return () => (mount = false);
		});
	}, []);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const closeAddedModal = () => {
		setIsAddedModalOpen(false);
		setLogin("");
		setPassword("");
	};

	const closeFireModal = () => {
		setToFire(null);
		setFireModalOpen(false);
	};

	const handleHire = async () => {
		const formData = {
			employee_name: name,
			is_manager: false,
			is_active: true,
		};
		const res = await axios.post("/api/hire/", formData);
		const data = res.data;
		if (data.success === true) {
			setLogin(data.login);
			setPassword(data.password);
			setIsAddedModalOpen(true);
			setIsOpen(false);
		}
	};

	const handleFire = async () => {
		const form = {
			is_active: false,
		};
		const res = await axios.patch("/api/employees/" + toFire + "/", form);
		const data = res.data;
		setToFire(null);
		setFireModalOpen(false);
	};

	return (
		<div>
			<div class="navbar">
				<NavLink to="/manager">
					<Button>Powrót</Button>
				</NavLink>
				<Button onClick={openModal}>Zatrudnij pracownika</Button>
			</div>
			<Modal show={isOpen} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Zatrudnij pracownika</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Imię i nazwisko</Form.Label>
							<Form.Control
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeModal}>
						Zamknij
					</Button>
					<Button variant="primary" onClick={handleHire}>
						Zatrudnij
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={isAddedModalOpen} onHide={closeAddedModal}>
				<Modal.Header>
					<Modal.Title>Pracownik zatrudniony!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Imię i nazwisko: {name}</p>
					<p>Login: {login}</p>
					<p>Hasło: {password}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={closeAddedModal}>
						OK
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={fireModalOpen} onHide={closeFireModal}>
				<Modal.Header>
					<Modal.Title>Uwaga!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Czy na pewno chcesz zwolnić pracownika?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeFireModal}>
						Anuluj
					</Button>
					<Button variant="danger" onClick={handleFire}>
						Zwolnij
					</Button>
				</Modal.Footer>
			</Modal>
			<div>
				<Table striped bordered hover>
					<thead>
						<th>#</th>
						<th>Imię i nazwisko</th>
						<th>Stanowisko</th>
						<th>Czy aktywny?</th>
						<th />
					</thead>
					<tbody>
						{employees
							.sort((a, b) => a.employee_id - b.employee_id)
							.map((it) => (
								<tr>
									<td>{it.employee_id}</td>
									<td>{it.employee_name}</td>
									<td>{it.is_manager ? "Manager" : "Pracownik"}</td>
									<td>{it.is_active ? "TAK" : "NIE"}</td>
									<td>
										<Button
											variant="danger"
											onClick={() => {
												setFireModalOpen(true);
												setToFire(it.employee_id);
											}}
										>
											Zwolnij
										</Button>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default Employees;
