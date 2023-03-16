import React from "react";
import axios from "axios";
import { AppContext } from "../App";

import Card from "../components/Card";
import PageInfo from "../components/PageInfo";


function Orders(props) {
	const state = React.useContext(AppContext);

	const [orderItems, setOrderItems] = React.useState([]);

	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get('https://my-json-server.typicode.com/O-Pazukhanych/SneakersServer/orderItems');
				setOrderItems(data.map(obj => obj.cartItems).flat());
			} catch (error) {

			}
		})();
	}, []);

	const renderItems = () => {
		return (state.isLoading
			? [...Array(8)].map((obj, index) => (
				<div key={index + 1} className="cards__column">
					<Card
						isLoading
					/>
				</div>
			))
			: orderItems.map((obj, index) => (
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
				<h1>Мои покупки</h1>
			</div>
			{orderItems.length > 0 ?
				<div className="cards">
					{
						renderItems()
					}
				</div>
				: <PageInfo
					title={'У вас нет заказов'}
					description={'Вы нищеброд?  Оформите хотя бы один заказ.'}
					imageUrl={'/img/cart-empty.png'}
				/>
			}
		</main>
	)
}

export default Orders;