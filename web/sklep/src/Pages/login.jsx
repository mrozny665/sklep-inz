import { NavLink } from "react-router-dom";

const Login = () => {
	return (
		<main class="login">
			<div class="login-container">
				<text>Sklep</text>
				<input class="login-input" />
				<input class="login-input" />
				<NavLink to="/employee">
					<button class="login-button">Zaloguj się</button>
				</NavLink>
			</div>
		</main>
	);
};

export default Login;
