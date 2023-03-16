import styles from './CartItem.module.scss';

function CartItem(props) {
	return (
		<div className={styles.cart_item}>
			<img className={styles.cart_item__content_img} width={70} height={70} src={props.imageUrl} alt="" />
			<div>
				<p>{props.title}</p>
				<b>{props.price} руб.</b>
			</div>
			<img className={styles.cart_item__btn} src="./img/btn-remove.svg" alt=""
				onClick={() => props.onRemoveItem(props)} />
		</div>
	)
}

export default CartItem;