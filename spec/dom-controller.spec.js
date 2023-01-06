let document = require("./jsdom/document");
global.document = document;
global.alert = (message) => console.log(message);

const hidden = "hidden";
const answer = "answer";
const firstNoteClassName = ".first-note";
const secondNoteClassName = ".second-note";
const {
	setNotes,
	btnGetRandomNotesClick,
	btnRevealAnswerClick,
	buddy,
	btnSubmitAnswerClick,
} = require("../src/dom-controller");

describe("DOM", () => {
	beforeEach(() => {
		document = require("./jsdom/document");
		global.document = document;
		btnGetRandomNotesClick();
	});

	describe("btnRevealAnswerClick function", () => {
		it("should populate the explanation div with notes", () => {
			const explanation = document.getElementById("explanation");

			btnRevealAnswerClick();
			expect(explanation.innerHTML).not.toBe("");
		});
		it("should show the answer reveal section", () => {
			const answerRevealSection = document.querySelector(
				".answer-reveal-section"
			);
			expect(answerRevealSection.classList.contains(hidden)).toBe(true);
			btnRevealAnswerClick();
			expect(answerRevealSection.classList.contains(hidden)).toBe(false);
		});
	});

	describe("domController ", () => {
		it("should be called and deferred in the document", () => {
			expect(document.scripts.item(0)).toBeDefined();
			expect(document.scripts.item(0).defer).toBeTruthy();
		});
	});

	describe("document", () => {
		let txtAnswer;
		beforeEach(() => {
			txtAnswer = global.document.getElementById(answer);
		});
		it("should be initialized with random notes", () => {
			const firstNote = global.document.querySelector(firstNoteClassName);
			const secondNote = global.document.querySelector(secondNoteClassName);

			expect(firstNote.innerHTML).not.toBe("");
			expect(secondNote.innerHTML).not.toBe("");
		});
		it("should be initialized with the answer test input being blank", () => {
			const txtAnswer = global.document.getElementById(answer);
			expect(txtAnswer.value).toBe("");
		});
		it("should be initialized with the answer reveal section hidden", () => {
			const answerRevealSection = global.document.querySelector(
				".answer-reveal-section"
			);
			expect(answerRevealSection.classList.contains(hidden)).toBe(true);
		});
		it("should be initialized with 0 for streak", () => {
			const streak = global.document.querySelector("#streak");
			expect(streak.innerHTML.trim()).toBe("0");
		});
		it("should be initialized with 0 for correct answers", () => {
			const correctAnswers = global.document.querySelector("#correct-answers");
			expect(correctAnswers.innerHTML.trim()).toBe("0");
		});
		it("should be initialized with 0 for wrong answers", () => {
			const wrongAnswers = global.document.querySelector("#wrong-answers");
			expect(wrongAnswers.innerHTML.trim()).toBe("0");
		});

		testGameStats();
		it("should call an alert with given message when the wrong answer is given", () => {
			spyOn(global, "alert");

			btnGetRandomNotesClick();

			txtAnswer.value = "15";
			btnSubmitAnswerClick();
			expect(global.alert).toHaveBeenCalledOnceWith("Wrong answer! Try again");
			txtAnswer.value = "Some text";
			btnSubmitAnswerClick();
			expect(global.alert).toHaveBeenCalledWith(
				"Answer must be a positive integer"
			);
		});
	});

	describe("setNotes function", () => {
		const testNote1 = "TestNote1";
		const testNote2 = "TestNote2";

		it("should set the notes in the document", () => {
			const firstNote = document.querySelector(firstNoteClassName);
			const secondNote = document.querySelector(".second-note");

			setNotes([testNote1, testNote2]);
			expect(firstNote.innerHTML).toBe(testNote1);
			expect(secondNote.innerHTML).toBe(testNote2);
		});
	});

	describe("btnGetRandomNotesClick function", () => {
		testGameStats();

		it("should cause isAlreadyAnswered() to return false", () => {
			buddy.isAnsweredCorrectly = true;
			btnGetRandomNotesClick();
			expect(buddy.isAlreadyAnswered()).toBe(false);

			buddy.isAnsweredCorrectly = false;
			btnGetRandomNotesClick();
			expect(buddy.isAlreadyAnswered()).toBe(false);
		});
	});
});

function testGameStats() {
	it("should call the getCorrectAnswers function from JamBuddy object", () => {
		spyOn(buddy, "getCorrectAnswers");

		btnGetRandomNotesClick();
		expect(buddy.getCorrectAnswers).toHaveBeenCalled();
	});

	it("should call the getWrongAnswers function from JamBuddy object", () => {
		spyOn(buddy, "getWrongAnswers");

		btnGetRandomNotesClick();
		expect(buddy.getWrongAnswers).toHaveBeenCalled();
	});

	it("should call the getStreak function from JamBuddy object", () => {
		spyOn(buddy, "getStreak");

		btnGetRandomNotesClick();
		expect(buddy.getStreak).toHaveBeenCalled();
	});
}
