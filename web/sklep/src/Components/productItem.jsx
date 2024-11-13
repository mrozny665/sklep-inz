import Products from "../Pages/products";
const ProductItem = ({ element }) => {
	const price1 = Number(element.price_no_vat);
	const price2 = Number(element.price_with_vat);

	return (
		<div class="product-item-main">
			<div class="product-item-main-part">
				{element.product_name} {element.unit}
			</div>
			<div class="product-item-main-part">{element.count} szt.</div>
			<div class="product-item-main-part">{element.vat}%</div>
			<div class="product-item-main-part">{price1.toFixed(2)}zł</div>
			<div class="product-item-main-part">{price2.toFixed(2)}zł</div>
		</div>
	);
};

export default ProductItem;
