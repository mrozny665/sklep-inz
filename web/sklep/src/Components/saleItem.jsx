const SaleItem = ({ element }) => {
	const price1 = Number(element.price_no_vat);
	const price2 = Number(element.price_with_vat);
	const price3 = Number(price1 * element.count);
	const price4 = Number(price2 * element.count);
	return (
		<div class="sale-list-item">
			<div>
				{element.product_name} {element.unit}
			</div>
			<div class="sale-item-right">
				<div>{element.count} szt.</div>
				<div>{element.vat}%</div>
				<div>{price1.toFixed(2)}zł</div>
				<div>{price2.toFixed(2)}zł</div>
				<div>{price3.toFixed(2)}zł</div>
				<div>{price4.toFixed(2)}zł</div>
			</div>
		</div>
	);
};

export default SaleItem;
