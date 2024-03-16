import { useState } from "react";

export default function App() {
	class ButtonObj {
		constructor(text, style, emoji) {
			this.text = text;
			this.style = style;
			this.emoji = emoji;
		}
	}

	const buttons = [
		new ButtonObj("new game", "btn--new", "🔄"),
		new ButtonObj("hold", "btn--hold", "📥"),
		new ButtonObj("roll dice", "btn--roll", "🎲"),
	];

	const random = Math.ceil(Math.random() * 6);
	const [image, setImage] = useState(null);
	const [randomInt, setRandomInt] = useState(Math.ceil(Math.random() * 6));

	const handleButton = function ({ text }) {
		if (text === "new game") {
			console.log("new game");
		} else if (text === "hold") {
			console.log("hold");
		} else {
			setImage(`images/dice-${randomInt}.png`);
			setRandomInt(random);
		}
	};

	return (
		<main>
			{Array.from({ length: 2 }, (_, i) => (
				<Player num={i + 1} key={i} />
			))}

			<figure>
				<img src={image} className="dice" />
			</figure>

			{buttons.map((button, i) => (
				<Button
					key={i}
					button={button}
					event={handleButton.bind(this, button)}
				/>
			))}
		</main>
	);
}

function Player({ num }) {
	const [active, setActive] = useState(false);
	const [currentScore, setCurrentScore] = useState(0);

	return (
		<div className="player">
			<PlayerNum num={num} />
			<PlayerScore currentScore={currentScore} />
			<CurrentScore current={currentScore} setCurrent={setCurrentScore} />
		</div>
	);
}

function PlayerNum({ num }) {
	return <h1 className="name">Player {num}</h1>;
}

function CurrentScore({ current, setCurrent }) {
	return (
		<div className="current">
			<p className="current-label">Current</p>
			<p className="current-score">{current}</p>
		</div>
	);
}

function PlayerScore({ currentScore }) {
	const [score, setScore] = useState(0);
	return (
		<p className="score" onChange={setScore.bind(this, score + currentScore)}>
			{score}
		</p>
	);
}

function Button({ button, event }) {
	return (
		<button className={`${button.style} btn`} onClick={event}>
			{button.emoji}
			{button.text}
		</button>
	);
}
