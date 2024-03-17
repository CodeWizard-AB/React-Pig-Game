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

	const [active, setActive] = useState(1);
	const [image, setImage] = useState(null);
	const random = Math.ceil(Math.random() * 6);
	const [randomInt, setRandomInt] = useState(Math.ceil(Math.random() * 6));
	const [currentScore, setCurrentScore] = useState(0);

	const handleButton = function ({ text }) {
		if (text === "new game") {
			console.log("new game");
		} else if (text === "hold") {
			setActive(active === 1 ? 2 : 1);
			setCurrentScore(0);
		} else {
			setImage(`images/dice-${randomInt}.png`);
			setRandomInt(random);

			if (randomInt === 1) {
				setCurrentScore(0);
				setActive(active === 1 ? 2 : 1);
			} else {
				setCurrentScore(currentScore + randomInt);
			}
		}
	};

	return (
		<main>
			{Array.from({ length: 2 }, (_, i) => (
				<Player
					num={i + 1}
					key={i}
					active={active}
					currentScore={currentScore}
				/>
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

function Player({ num, active, currentScore, score }) {
	const isActive = num === active;
	console.log(currentScore);

	return (
		<div className={`player ${isActive && "player--active"}`}>
			<PlayerNum num={num} />
			<PlayerScore playerScore={score} />
			<CurrentScore current={isActive && currentScore} />
		</div>
	);
}

function PlayerNum({ num }) {
	return <h1 className="name">Player {num}</h1>;
}

function CurrentScore({ current }) {
	return (
		<div className="current">
			<p className="current-label">Current</p>
			<p className="current-score">{current || 0}</p>
		</div>
	);
}

function PlayerScore({ playerScore }) {
	const [score, setScore] = useState(0);
	return (
		<p className="score" onChange={setScore.bind(this, score + playerScore)}>
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
