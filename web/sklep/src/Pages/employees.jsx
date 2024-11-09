import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getEmployees } from "../Services/apiService";

const Employees = () => {
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		let mount = true;
		getEmployees().then((res) => {
			console.log("Response from api ", res);
			setEmployees(res);
			return () => (mount = false);
		});
	}, []);

	return (
		<div>
			<div class="navbar">
				<NavLink to="/manager" className="nav-button">
					Powrót
				</NavLink>
			</div>
			<div>
				{employees.map((it) => (
					<div>
						{it.employee_name} {it.is_manager ? "Manager" : "Pracownik"}{" "}
						{it.is_active ? "TAK" : "NIE"}
					</div>
				))}
			</div>
		</div>
	);
};

export default Employees;
