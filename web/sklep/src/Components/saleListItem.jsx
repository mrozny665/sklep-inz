const SaleListItem = ({ element }) => {
	return (
		<div class="sale-list-item">
			<div>{element.bill_id}</div>
			<div>{element.issue_date}</div>
			<div>{element.price_no_vat} zł</div>
			<div>{element.price_with_vat} zł</div>
		</div>
	);
};

export default SaleListItem;
