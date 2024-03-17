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
	const [currentScore, setCurrentScore] = useState(0);
	const [randomInt, setRandomInt] = useState(Math.ceil(Math.random() * 6));
	const [player1, setPlayer1] = useState(0);
	const [player2, setPlayer2] = useState(0);

	const gameInit = function () {
		setActive(1);
		setPlayer1(0);
		setPlayer2(0);
		setImage(null);
		setCurrentScore(0);
	};

	const switchPlayer = function () {
		setActive(active === 1 ? 2 : 1);
		setCurrentScore(0);
	};

	const handleButton = function ({ text }) {
		if (text === "new game") gameInit();
		if (!(player1 >= 20 || player2 >= 20)) {
			if (text === "roll dice") {
				setImage(`images/dice-${randomInt}.png`);
				setRandomInt(random);
				randomInt === 1
					? switchPlayer()
					: setCurrentScore(currentScore + randomInt);
			} else if (text === "hold") {
				active === 2
					? setPlayer1(player1 + currentScore)
					: setPlayer2(player2 + currentScore);
				switchPlayer();
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
					score={i === 1 ? player1 : player2}
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
	const winningScore = score >= 20;
	return (
		<div
			className={`player ${
				!winningScore ? isActive && "player--active" : "player--winner"
			}`}
		>
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
	return <p className="score">{playerScore}</p>;
}

function Button({ button, event }) {
	return (
		<button className={`${button.style} btn`} onClick={event}>
			{button.emoji}
			{button.text}
		</button>
	);
}
