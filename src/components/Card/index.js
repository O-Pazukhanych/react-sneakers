import React from 'react';
import { AppContext } from '../../App';

import styles from './Card.module.scss';

import CardLoading from '../CardLoading';

function Card(props) {
	const {isItemAdded} = React.useContext(AppContext);
	const [isFavorite, setIsFavorite] = React.useState(props.isFavorite);

	const onClickFavorite = () => {
		props.onClickFavorite();
		setIsFavorite(!isFavorite);
	}
	const onClickAdd = () => {
		props.onClickAdd();
	}

	return (
		props.isLoading ?
			<div className={styles.card}>
				<CardLoading />
			</div>
			: <div className={styles.card}>
				<div className={styles.card__favorite}>
					<img src={isFavorite ? "/img/favorite-active.svg" : "/img/favorite-disable.svg"} alt=''
						onClick={onClickFavorite} />
				</div>
				<img width={133} height={112} src={props.imageUrl} alt="" />
				<p>{props.title}</p>
				<div className={styles.card__bottom}>
					<div>
						<span>Цена: </span>
						<b>{props.price} руб.</b>
					</div>
					<img width={32} height={32} src={isItemAdded(props.id) ? "/img/added.svg" : "/img/plus.svg"} alt=""
						onClick={onClickAdd} />
				</div>
			</div>
	);
}

export default Card;