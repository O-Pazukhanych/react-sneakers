import React from "react";

import styles from './CartInfo.module.scss';

function CartInfo({ onClose, title, description, imageUrl }) {
	return (
		<div className={styles.cart__empty}>
			<img src={imageUrl} alt='' />
			<h2>{title}</h2>
			<p>{description}</p>
			<button className="btn btn_return" onClick={onClose}>
				<span>Вернуться назад</span>
				<img src="./img/btn-arrow.svg" alt="" />
			</button>
		</div>
	)
}

export default CartInfo;