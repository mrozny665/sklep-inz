const SaleListItem = ({ element }) => {
	return (
		<div class="sale-list-item">
			<div>{element.text}</div>
			<div>24-08-2024</div>
			<div>127,21 zł</div>
		</div>
	);
};

export default SaleListItem;
