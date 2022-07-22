import { useEffect, useRef, useState } from "react";
import { firestore } from "./utils/firebase.config";
import { addDoc, collection, getDocs } from "@firebase/firestore";

import temple from "./assets/fixed-temple.svg";
import column from "./assets/column.svg";

function App() {
	// On met un point d'ancrage sur l'input pour en récupérer la valeur par la suite
	let argoRef = useRef<HTMLInputElement>(null);
	// On crée les identifiants d'une collection dans Firestore
	const argoCollection = collection(firestore, "argonautes");

	// Fonction à l'envoi du formulaire
	const handleSave = async (e: any) => {
		// On empêche le rechargement de la page
		e.preventDefault();

		// On insère le contenu de l'input dans un objet
		let argonaute = {
			name: argoRef.current?.value,
		};

		//
		try {
			// addDoc permet d'ajouter une ligne à la BDD Firestore
			// On lui donne la référence à la collection dans Firestore
			// On lui donne aussi l'objet créé à partir de l'input
			addDoc(argoCollection, argonaute);
		} catch (e) {
			// S'il y a erreur on affiche cette erreur dans la console
			console.log(e);
		}
		// On clear l'input après l'envoi du formulaire en utilisant un non-null operator
		// Le non-null operator évite une erreur TS et on sait que le champ ne sera pas vide
		argoRef.current!.value = "";
		getArgonautes();
	};

	const [argoList, setArgoList] = useState([]);

	useEffect(() => {
		getArgonautes();
	}, []);

	// Code de test de l'affichage de la collection Firestore
	// useEffect(() => {
	// 	console.log(argoList);
	// }, [argoList]);

	function getArgonautes() {
		getDocs(argoCollection)
			.then((res) => {
				const argos: any = res.docs.map((doc) => ({
					data: doc.data(),
					id: doc.id,
				}));
				setArgoList(argos);
			})
			.catch((error) => console.log(error.message));
	}

	return (
		<>
			<div className="templeContainer">
				<div className="argos">
					<form onSubmit={handleSave}>
						<label htmlFor="name">Ajouter un argonaute :</label>
						<input type="text" ref={argoRef} required />
						<button type="submit">Ajouter</button>
					</form>
					<ul>
						{argoList.map((singleArgonaute: any) => (
							<li key={singleArgonaute.id}>{singleArgonaute.data.name}</li>
						))}
						{argoList.map((singleArgonaute: any) => (
							<li key={singleArgonaute.id}>{singleArgonaute.data.name}</li>
						))}
					</ul>
				</div>
				<img src={temple} alt="Temple" className="temple" />
			</div>
			<img src={column} alt="Colonne" className="column" />
			<img src={column} alt="Colonne" className="column" />
			<div className="floor"></div>
			<footer>
				<p className="footer">
					Made by <a href="https://github.com/Maxime-Cottin">Maxime Cottin</a>
				</p>
			</footer>
		</>
	);
}

export default App;
