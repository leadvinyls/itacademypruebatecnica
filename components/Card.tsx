'use client';
import styles from './Card.module.css';

export default function Card(props) {
	return (
		<article className={styles.Card}>
			<img src={props.image} alt={props.name} />
			<section>
				<h2>{props.name}</h2>
				<p>{props.species}</p>
				<p>{props.gender}</p>
			</section>
			<span>{props.status}</span>
		</article>
	);
}
