import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const Login = ({
	isLoggedIn,
	setIsLoggedIn,
	isManager,
	setIsManager,
	id,
	setId,
}) => {
	let navigate = useNavigate();
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		if (isLoggedIn) {
			if (isManager) navigate("/hub");
			else navigate("/employee");
		}
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		const formData = { login: login, password: password };
		const res = await axios.post("/api/login/", formData);
		const data = res.data;
		if (data.success === true) {
			setIsLoggedIn(true);
			setIsManager(true);
			setId(1);
			if (isManager) navigate("/hub");
			else navigate("/employee");
		} else setShowAlert(true);
	};

	return (
		<div>
			<Alert
				show={showAlert}
				variant="danger"
				onClose={() => setShowAlert(false)}
				dismissible
			>
				Niepoprawne dane logowania!
			</Alert>
			<main class="login">
				<div class="login-container">
					<text>Sklep</text>
					<Form onSubmit={handleLogin}>
						<Form.Group className="mb-3">
							<Form.Label>Nazwa użytkownika</Form.Label>
							<Form.Control
								onChange={(e) => setLogin(e.target.value)}
								value={login}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Hasło</Form.Label>
							<Form.Control
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								type="password"
							/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Zaloguj się
						</Button>
					</Form>
				</div>
			</main>
		</div>
	);
};

export default Login;
