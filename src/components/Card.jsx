"use client";

import React from "react";
import ReactDOM from "react-dom/client";
import styles from "./Card.module.css";

function Card(props) {
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

export default Card;

/*
image
name

    -----Details --- 
species
    gender
    origin
    status
    last know location
*/
