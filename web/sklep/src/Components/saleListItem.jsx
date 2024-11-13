const SaleListItem = ({ element }) => {
	const price1 = Number(element.price_no_vat);
	const price2 = Number(element.price_with_vat);
	return (
		<div class="sale-list-item">
			<div class="sale-list-item-part">{element.bill_id}</div>
			<div class="sale-list-item-part">{element.issue_date}</div>
			<div class="sale-list-item-part">{price1.toFixed(2)} zł</div>
			<div class="sale-list-item-part">{price2.toFixed(2)} zł</div>
		</div>
	);
};

export default SaleListItem;
