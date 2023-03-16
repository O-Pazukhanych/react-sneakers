import React from "react";
import { AppContext } from "../App";

import Card from "../components/Card";

function Home(props) {
	const state = React.useContext(AppContext);

	const renderItems = () => {
		const filteredItems = state.items.filter((item) => item.label.toLowerCase().includes(props.searchValue.toLowerCase()));
		return (state.isLoading
			? [...Array(8)].map((obj, index) => (
				<div key={index + 1} className="cards__column">
					<Card
						isLoading
					/>
				</div>
			))
			: filteredItems.map((obj, index) => (
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
				<h1>{props.searchValue ? `Поиск по запросу: "${props.searchValue}"` : "Все кроссовки"}</h1>
				<div className="search">
					<img width={16} height={16} src="/img/search.svg" alt="" />
					<input placeholder="Поиск..." value={props.searchValue} onChange={props.onChangeSearchInput} />
				</div>
			</div>
			<div className="cards">{renderItems()}</div>

		</main>
	)
}

export default Home;