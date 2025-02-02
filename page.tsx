'use client';
import Image from 'next/image'; // Importar Image de next
import logo from './logo.png';
import lens from './magnifying-glass-solid.svg';
import styles from './page.module.css';
import Card from './components/Card';
import { useEffect, useState } from 'react';

export default function Rickandmortyappp() {
	const url = 'https://rickandmortyapi.com/api/character';
	const [endpoint, setEndpoint] = useState(url);
	const [query, setQuery] = useState('');
	const [characters, setCharacters] = useState([]);
	const [data, setData] = useState({});

	function search(event) {
		event.preventDefault();
		setEndpoint(query === '' ? url : `${url}/?name=${query}`);
		getCharacters();
	}

	async function loadMore() {
		const characterList = await getCharactersArray(data);
		setCharacters([...characters, ...characterList]);
	}

	async function getCharactersArray(endp) {
		try {
			const response = await fetch(endp);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const r = await response.json();
			console.log(r);
			setData(r.info.next);
			return r.results ? r.results : []; //? data.results : [];
		} catch (error) {
			console.error(error.message);
		}

		return [];
	}

	async function getCharacters() {
		const characterList = await getCharactersArray(endpoint);
		setCharacters(characterList);
	}

	useEffect(() => {
		getCharacters();
	}, [endpoint]);

	useEffect(() => {
		if (!query) {
			setEndpoint(url);
			getCharacters();
		}
	}, [query]);

	return (
		<div className={styles.App}>
			{/* ########## HEADER ########## */}
			<header className={styles.header}>
				<div className={styles.logoContainer}>
					<Image className={styles.img} src={logo} alt="logo" />
				</div>
			</header>

			<form className={styles.form} onSubmit={search}>
				<div className={styles.searchContainer}>
					<input
						className={styles.search}
						autoComplete="off"
						spellCheck="false"
						placeholder="Busca un personaje"
						type="text"
						name="search"
						id="search"
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
						}}
					/>
					<div className={styles.lensContainer}>
						<input className={styles.lens} type="submit" value="" />
						<div className={styles.lensImageContainer}>
							<Image className={styles.img} src={lens} alt="" />
						</div>
					</div>
				</div>
			</form>
			<main className={styles.main}>
				{characters ? (
					characters.map((character) => (
						<Card
							key={character.id}
							image={character.image}
							name={character.name}
							species={character.species}
							status={character.status}
							gender={character.gender}
						/>
					))
				) : (
					<p>No characters found.</p>
				)}
			</main>

			<footer className={styles.footer}>
				{data ? (
					<button className={styles.button} onClick={loadMore}>
						Cargar mas
					</button>
				) : (
					<></>
				)}
			</footer>
		</div>
	);
}
