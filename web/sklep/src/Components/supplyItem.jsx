const SupplyItem = ({ element }) => {
	return (
		<div class="sale-list-item">
			<div>1</div>
			<div>{element.supply_date}</div>
			<div>{element.employee_id}</div>
		</div>
	);
};

export default SupplyItem;
