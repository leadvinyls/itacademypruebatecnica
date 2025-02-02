'use client';
import Image from 'next/image'; // Importar Image de next
import styles from './Card.module.css';

export default function Card(props) {
	return (
		<article className={styles.Card}>
			<Image
				className={styles.img}
				src={props.image}
				alt={props.name}
				width={100}
				height={100}
			/>
			<section>
				<h2>{props.name}</h2>
				<p>{props.species}</p>
				<p>{props.gender}</p>
			</section>
			<span className={styles.span}>{props.status}</span>
		</article>
	);
}
