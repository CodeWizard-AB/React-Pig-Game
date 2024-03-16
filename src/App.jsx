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
		new ButtonObj("roll dice", "btn--roll", "🎲"),
		new ButtonObj("hold", "btn--hold", "📥"),
	];

	let randomInt;

	return (
		<main>
			<Player />
			<Player />
			<figure>
				<img src="../public/images/dice-1.png" className="dice" />
			</figure>
			{buttons.map((button, i) => (
				<Button key={i} button={button} />
			))}
		</main>
	);
}

function Player() {
	const [active, setActive] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
	return (
		<div className="player">
			<h1 className="name">Player 1</h1>
			<PlayerScore />
			<CurrentScore current={currentScore} setCurrent={setCurrentScore}/>
		</div>
	);
}

function CurrentScore({current, setCurrent}) {
	return (
		<div className="current">
			<p className="current-label">Current</p>
			<p className="current-score">{current}</p>
		</div>
	);
}

function PlayerScore() {
	const [score, setScore] = useState(0);
	return <p className="score">{score}</p>;
}

function Button({ button }) {
	return (
		<button className={`${button.style} btn`}>
			{button.emoji}
			{button.text}
		</button>
	);
}
