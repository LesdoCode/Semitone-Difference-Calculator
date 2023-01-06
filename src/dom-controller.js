const { JamBuddy } = require("./JamBuddy");

const answerSection = document.querySelector(".controls");
const txtAnswer = document.getElementById("answer");
const explanationDiv = document.getElementById("explanation");
const answerRevealSection = document.querySelector(".answer-reveal-section");
const explanationMessage = document.querySelector(".game-message");
const streakDisplay = document.querySelector("#streak");
const correctAnswersDisplay = document.querySelector("#correct-answers");
const wrongAnswersDisplay = document.querySelector("#wrong-answers");

const gifFilePath = "./gif/";

const buddy = new JamBuddy();

function updateGameStats() {
	const streak = buddy.getStreak();
	streakDisplay.innerHTML = `${
		streak > 2 ? getGifHTML("celebrate.gif") : ""
	}${streak} `;
	correctAnswersDisplay.innerHTML = buddy.getCorrectAnswers();
	wrongAnswersDisplay.innerHTML = buddy.getWrongAnswers();
}
function textInputKeyPress(event) {
	const key = event.key;
	if (event.key === "Enter") btnSubmitAnswerClick();
	if (!RegExp("^[0-9]$").test(key) || txtAnswer.value.length > 1)
		return event.preventDefault();
}

function setNotes(notesArray) {
	const firstNote = global.document.querySelector(".first-note");
	const secondNote = global.document.querySelector(".second-note");

	firstNote.innerHTML = notesArray[0];
	secondNote.innerHTML = notesArray[1];
}

function getGifHTML(fileName) {
	return `<img class="gif" src="${gifFilePath}${fileName}">`;
}
function btnSubmitAnswerClick() {
	if (buddy.isAlreadyAnswered())
		return alert("You have already answered this question!");

	let isCorrect = false;

	try {
		const answer = parseInt(txtAnswer.value);
		isCorrect = buddy.checkAnswer(answer);

		if (isCorrect) {
			answerRevealSection.classList.remove("hidden");
			const streak = buddy.getStreak();

			showExplanation(
				`Congratulations, Your answer is correct! ${
					streak > 2 ? getGifHTML("fire.gif") : ""
				}`
			);
		} else alert("Wrong answer! Try again");
	} catch (err) {
		alert(err.message);
	} finally {
		txtAnswer.value = "";
		updateGameStats();
	}
}

function btnGetRandomNotesClick() {
	answerRevealSection.classList.add("hidden");
	const notes = buddy.selectNotes();
	setNotes(notes);
	updateGameStats();
}

function btnRevealAnswerClick() {
	showExplanation();
}

function handleAnswerSectionClick(event) {
	const target = event.target;

	if (target.classList.contains("btn")) {
		switch (target.id) {
			case "get-random-notes":
				btnGetRandomNotesClick();
				break;
			case "submit-answer":
				btnSubmitAnswerClick();
				break;
			case "reveal-answer":
				btnRevealAnswerClick();
				break;
		}
	}
}

function showExplanation(message) {
	explanationDiv.innerHTML = "";
	for (let note of buddy.getAllNotes()) {
		const classList = buddy.notesArray.includes(note) ? "note-highlight" : "";
		explanationDiv.innerHTML += `<span class="note ${classList}">${note}</span>`;
	}
	answerRevealSection.classList.remove("hidden");
	explanationMessage.innerHTML =
		message || `The answer is ${buddy.getAnswer()}`;
}

answerSection.addEventListener("click", handleAnswerSectionClick);
txtAnswer.addEventListener("keypress", textInputKeyPress);

btnGetRandomNotesClick();

module.exports = {
	document,
	setNotes,
	btnGetRandomNotesClick,
	btnSubmitAnswerClick,
	btnRevealAnswerClick,
	buddy,
};
