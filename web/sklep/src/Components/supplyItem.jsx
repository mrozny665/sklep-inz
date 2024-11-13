import { useEffect, useState } from "react";
import { getEmployee } from "../Services/apiService";

const SupplyItem = ({ element }) => {
	const [employee, setEmployee] = useState([]);

	useEffect(() => {
		let mount = true;
		getEmployee(element.employee_id).then((res) => {
			console.log("Response from api ", res);
			setEmployee(res);
			return () => (mount = false);
		});
	}, []);

	return (
		<div class="supply-item">
			<div class="supply-item-part">{element.supply_id}</div>
			<div class="supply-item-part">{element.supply_date}</div>
			<div class="supply-item-part">{employee.employee_name}</div>
		</div>
	);
};

export default SupplyItem;
