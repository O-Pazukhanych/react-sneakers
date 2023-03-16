import React from "react";
import { Link } from "react-router-dom";

import styles from './PageInfo.module.scss';

function PageInfo({ title, description, imageUrl }) {
	return (
		<div className={styles.canvas}>
			<img src={imageUrl} alt='' />
			<h2>{title}</h2>
			<p>{description}</p>
			<Link to={'/'}>
				<button className="btn btn_return">
					<span>Вернуться назад</span>
					<img src="./img/btn-arrow.svg" alt="" />
				</button>
			</Link>
		</div>
	)
}

export default PageInfo;