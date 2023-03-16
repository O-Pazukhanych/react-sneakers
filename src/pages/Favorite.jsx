import React from "react";
import { AppContext } from "../App";

import Card from "../components/Card";
import PageInfo from "../components/PageInfo";

function Favorite(props) {
	const state = React.useContext(AppContext);

	const renderItems = () => {
		return (state.isLoading
			? [...Array(8)].map((obj, index) => (
				<div key={index + 1} className="cards__column">
					<Card
						isLoading
					/>
				</div>
			))
			: state.favoriteItems.map((obj, index) => (
				<div key={index + 1} className="cards__column">
					<Card
						key={obj.id}
						id={obj.id}
						title={obj.label}
						price={obj.price}
						imageUrl={obj.imageUrl}
						onClickAdd={() => state.onAddToCart(obj)}
						onClickFavorite={() => state.onAddToFavorite(obj)}
						isFavorite={state.favoriteItems.some(e => e.id === obj.id)}
						isLoading={false}
					/>
				</div>
			)));
	};

	return (
		<main className="content">
			<div className="top-block">
				<h1>Мои закладки</h1>
			</div>
			{state.favoriteItems.length > 0 ?
				<div className="cards">
					{
						renderItems()
					}
				</div>
				: <PageInfo
					title={'Закладок нет :('}
					description={'Вы ничего не добавляли в закладки'}
					imageUrl={'/img/cart-empty.png'}
				/>
			}
		</main>
	)
}

export default Favorite;