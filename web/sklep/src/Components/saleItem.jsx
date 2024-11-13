const SaleItem = ({ element }) => {
	const price1 = Number(element.price_no_vat);
	const price2 = Number(element.price_with_vat);
	const price3 = Number(price1 * element.count);
	const price4 = Number(price2 * element.count);
	return (
		<div class="sale-item-main">
			<div class="sale-item-main-part">
				{element.product_name} {element.unit}
			</div>
			<div class="sale-item-main-part">{element.count} szt.</div>
			<div class="sale-item-main-part">{element.vat}%</div>
			<div class="sale-item-main-part">{price1.toFixed(2)}zł</div>
			<div class="sale-item-main-part">{price2.toFixed(2)}zł</div>
			<div class="sale-item-main-part">{price3.toFixed(2)}zł</div>
			<div class="sale-item-main-part">{price4.toFixed(2)}zł</div>
		</div>
	);
};

export default SaleItem;
