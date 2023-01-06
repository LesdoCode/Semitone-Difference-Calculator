class JamBuddy {
	constructor() {
		this.notesArray = [{}, {}];
		this.streak = 0;
		this.correctAnswers = 0;
		this.wrongAnswers = 0;
		this.isAnsweredCorrectly = false;
		this.flatSymbol = "♭";
		this.notes = [
			"A",
			"A#",
			"B",
			"C",
			"C#",
			"D",
			"D#",
			"E",
			"F",
			"F#",
			"G",
			"G#",
		];

		this.selectNotes();
	}

	isAlreadyAnswered() {
		return this.isAnsweredCorrectly;
	}
	getStreak() {
		return this.streak;
	}
	getCorrectAnswers() {
		return this.correctAnswers;
	}
	getWrongAnswers() {
		return this.wrongAnswers;
	}

	getAllNotes() {
		const allNotes = new Set();

		this.notes.forEach((note) => {
			allNotes.add(note);
			allNotes.add(this.getFlat(note));
		});
		return [].concat(...allNotes);
	}

	getRandomNumber(maxNumber) {
		return Math.floor(Math.random() * maxNumber);
	}

	getFlat(note) {
		if (note.includes("#")) {
			const nextNoteIndex = (this.notes.indexOf(note) + 1) % this.notes.length;
			nextNoteIndex;
			const nextNote = this.notes[nextNoteIndex];
			return `${nextNote}${this.flatSymbol}`;
		}
		return note;
	}

	isFlat() {
		return this.notes.includes(this.flatSymbol);
	}

	getSharp(note) {
		if (note.includes(this.flatSymbol)) {
			note = note.replace(this.flatSymbol, "");
			note;
			const previousNoteIndex =
				(this.notes.indexOf(note) + this.notes.length - 1) % this.notes.length;
			previousNoteIndex;
			const previousNote = this.notes[previousNoteIndex];
			return previousNote;
		}
		return note;
	}

	selectNotes() {
		this.isAnsweredCorrectly = false;

		let note1 = this.notes[this.getRandomNumber(this.notes.length - 1)];
		let note2 = this.notes[this.getRandomNumber(this.notes.length - 1)];

		if (note1 === note2) {
			note2 = this.notes[this.getRandomNumber(this.notes.length - 1)];
		}
		if (this.getRandomNumber(50) % 2 === 0) note1 = this.getFlat(note1);
		if (this.getRandomNumber(70) % 3 === 0) note2 = this.getFlat(note2);

		return (this.notesArray = [note1, note2]);
	}

	getNoteDifference(firstNoteIndex, secondNoteIndex) {
		return firstNoteIndex > secondNoteIndex
			? (firstNoteIndex - secondNoteIndex - this.notes.length) * -1
			: secondNoteIndex - firstNoteIndex;
	}

	getAnswer() {
		if (this.notesArray.includes(undefined)) return -1;

		const noteIndexes = [
			this.notes.indexOf(this.getSharp(this.notesArray[0])),
			this.notes.indexOf(this.getSharp(this.notesArray[1])),
		];

		return this.getNoteDifference(...noteIndexes);
	}

	checkAnswer(answer) {
		if (!Number.isInteger(answer) || answer < 0)
			throw new Error("Answer must be a positive integer");
		const isCorrect = answer === this.getAnswer();

		if (isCorrect) {
			this.streak++;
			this.correctAnswers++;
			this.isAnsweredCorrectly = isCorrect;
		} else {
			this.streak = 0;
			this.wrongAnswers++;
		}

		return isCorrect;
	}
}

module.exports = { JamBuddy };
