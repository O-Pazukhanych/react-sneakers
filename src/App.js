import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Orders from "./pages/Orders";

import Drawer from "./components/Drawer";
import Header from "./components/Header";

export const AppContext = React.createContext({});

function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [favoriteItems, setFavoriteItems] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState('');
	const [isCartOpened, setIsCartOpened] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchData() {
			const cartResponse = await axios.get('https://my-json-server.typicode.com/O-Pazukhanych/SneakersServer/cartItems');
			const favoriteResponse = await axios.get('https://my-json-server.typicode.com/O-Pazukhanych/SneakersServer/favoriteItems');
			const itemsResponse = await axios.get('https://my-json-server.typicode.com/O-Pazukhanych/SneakersServer/items');

			setItems(itemsResponse.data);
			setCartItems(cartResponse.data);
			setFavoriteItems(favoriteResponse.data);

			setIsLoading(false);
		}
		fetchData();
	}, [])

	const onAddToCart = (obj) => {
		try {
			if (cartItems.find((e) => e.id === obj.id)) {
				axios.delete(`http://localhost:3001/cartItems/${obj.id}`);
				setCartItems(prev => prev.filter(item => item.id !== obj.id));
			} else {
				axios.post('http://localhost:3001/cartItems', obj);
				setCartItems(prev => [...prev, obj]);
			}
		} catch (error) {

		}
	};

	const onRemoveItem = (obj) => {
		axios.delete(`http://localhost:3001/cartItems/${obj.id}`);
		setCartItems(prev => prev.filter(item => item.id !== obj.id));
	};

	const onAddToFavorite = (obj) => {
		if (favoriteItems.find(el => el.id === obj.id)) {
			axios.delete(`http://localhost:3001/favoriteItems/${obj.id}`, obj);
			setFavoriteItems(prev => prev.filter(item => item.id !== obj.id));
		} else {
			axios.post('http://localhost:3001/favoriteItems', obj);
			setFavoriteItems(prev => [...prev, obj]);
		}
	};

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value);
	};

	const isItemAdded = (id) => {
		return cartItems.some(e => e.id === id)
	}

	return (
		<AppContext.Provider value={{ items, cartItems, favoriteItems, isLoading, onAddToCart, onAddToFavorite, isItemAdded, setCartItems }}>
			<div className="wrapper">
				<Drawer items={cartItems}
					onClose={() => setIsCartOpened(false)}
					onRemoveItem={onRemoveItem}
					isCartOpened={isCartOpened} />
				<Header onClickCart={() => setIsCartOpened(true)} />
				<Routes>
					<Route path="/react-sneakers/" exact element={
						<Home
							searchValue={searchValue}
							onChangeSearchInput={onChangeSearchInput} />
					} />
					<Route path="/favorite" element={
						<Favorite />
					} />
					<Route path="/orders" element={
						<Orders />
					} />
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
