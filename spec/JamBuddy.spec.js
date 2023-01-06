const { JamBuddy } = require("../src/JamBuddy");
let buddyObj = new JamBuddy();
const flatSymbol = "♭";
const positiveNumberErrorMessage = "Answer must be a positive integer";

const resetBuddyObject = () => {
	beforeEach(() => {
		buddyOby = new JamBuddy();
		buddyObj.notesArray = ["A", "B"];
	});
	afterEach(() => {
		buddyObj = new JamBuddy();
	});
};
resetBuddyObject();

describe("JamBuddy constructor", () => {
	it("should call the selectNotes function", () => {
		const selectNotesSpy = spyOn(JamBuddy.prototype, "selectNotes");
		new JamBuddy();
		expect(selectNotesSpy).toHaveBeenCalledOnceWith();
	});
});

describe("isAlreadyAnswered method", () => {
	it("should always return a boolean 'false' when object is first initialized", () => {
		expect(buddyObj.isAlreadyAnswered()).toEqual(false);
	});

	it("should return false when an answer is answered incorrectly", () => {
		buddyObj.selectNotes();
		buddyObj.checkAnswer(buddyObj.getAnswer() + 1);
		expect(buddyObj.isAlreadyAnswered()).toEqual(false);
	});

	it("should return true when an answer is answered correctly", () => {
		buddyObj.selectNotes();
		buddyObj.checkAnswer(buddyObj.getAnswer());
		expect(buddyObj.isAlreadyAnswered()).toEqual(true);
	});

	it("should return false when answer is false after selectNotes() is called", () => {
		buddyObj.selectNotes();

		buddyObj.checkAnswer(buddyObj.getAnswer());
		expect(buddyObj.isAlreadyAnswered()).toEqual(true);

		buddyObj.selectNotes();
		expect(buddyObj.isAlreadyAnswered()).toEqual(false);
	});

	it("should directly reflect the value of isAnsweredCorrectly", () => {
		buddyObj.isAnsweredCorrectly = true;
		expect(buddyObj.isAlreadyAnswered()).toEqual(true);

		buddyObj.isAnsweredCorrectly = false;
		expect(buddyObj.isAlreadyAnswered()).toEqual(false);

		buddyObj.isAnsweredCorrectly = 25;
		expect(buddyObj.isAlreadyAnswered()).toEqual(25);
	});

	it("should always return false when selectNotes() is called multiple times", () => {
		expect(buddyObj.isAlreadyAnswered()).toBe(false);

		buddyObj.selectNotes();
		expect(buddyObj.isAlreadyAnswered()).toBe(false);

		buddyObj.selectNotes();
		expect(buddyObj.isAlreadyAnswered()).toBe(false);
	});
});
describe("getAnswer method", () => {
	it("should return a number", () => {
		expect(typeof buddyObj.getAnswer()).toBe("number");
	});
	it("should return 0 for notes A, A", () => {
		buddyObj.notesArray = ["A", "A"];
		expect(buddyObj.getAnswer()).toEqual(0);
	});
	it("should return 1 for notes A, B", () => {
		buddyObj.notesArray = ["A", "B"];
		expect(buddyObj.getAnswer()).toEqual(2);
	});
	it("should return 1 for notes G#, A", () => {
		buddyObj.notesArray = ["G#", "A"];
		expect(buddyObj.getAnswer()).toEqual(1);
	});
});

describe("getWrongAnswers method", () => {
	resetBuddyObject();
	it("should be initialized with 0 when the game starts", () => {
		expect(buddyObj.wrongAnswers).toEqual(0);
	});
	it("should return the number of wrong answers", () => {
		buddyObj.wrongAnswers = 5;
		expect(buddyObj.getWrongAnswers()).toEqual(5);
	});
	it("should increment wrongAnswers variable by 1 on each correct answer", () => {
		buddyObj.checkAnswer(7);
		expect(buddyObj.wrongAnswers).toEqual(1);
	});

	it("should keep wrongAnswers variable the same when correct answers are entered", () => {
		buddyObj.checkAnswer(2);
		buddyObj.checkAnswer(2);
		expect(buddyObj.wrongAnswers).toEqual(0);
	});
});
describe("getCorrectAnswers method", () => {
	it("should be initialized to 0 when the game starts", () => {
		expect(buddyObj.getCorrectAnswers()).toEqual(0);
	});
	it("shouldn't increase or decrease when answer is wrong", () => {
		buddyObj.checkAnswer(9);
		buddyObj.checkAnswer(2);
		buddyObj.checkAnswer(1);
		expect(buddyObj.getCorrectAnswers()).toEqual(1);
	});
	it("should increase by 1 when answer is correct", () => {
		buddyObj.checkAnswer(2);
		expect(buddyObj.getCorrectAnswers()).toEqual(1);
	});
	it("should return a number", () => {
		expect(typeof buddyObj.getCorrectAnswers()).toBe("number");
	});
});

describe("getAllNotes method", () => {
	it("should return an array of all notes including sharps and flats", () => {
		const allNotes = buddyObj.getAllNotes();
		expect(allNotes).toEqual([
			"A",
			"A#",
			`B${flatSymbol}`,
			"B",
			"C",
			"C#",
			`D${flatSymbol}`,
			"D",
			"D#",
			`E${flatSymbol}`,
			"E",
			"F",
			"F#",
			`G${flatSymbol}`,
			"G",
			"G#",
			`A${flatSymbol}`,
		]);
	});
});
describe("selectNotes method", () => {
	it("should return an array", () => {
		expect(Array.isArray(buddyObj.selectNotes())).toBe(true);
	});

	it("should return a non-empty array", () => {
		expect(buddyObj.selectNotes().length).toEqual(2);
	});

	it("should return an array of strings", () => {
		for (let item of buddyObj.selectNotes()) {
			expect(typeof item).toEqual("string");
		}
	});
});

describe("checkAnswer method", () => {
	it("should set the value of isAnsweredCorrectly to  true if the answer is correct", () => {
		expect(buddyObj.isAnsweredCorrectly).toBe(false);
		buddyObj.checkAnswer(2);
		expect(buddyObj.isAnsweredCorrectly).toBe(true);
	});
	it("should not change the value of isAnsweredCorrectly when the answer is incorrect", () => {
		expect(buddyObj.isAnsweredCorrectly).toBe(false);
		buddyObj.checkAnswer(9);
		expect(buddyObj.isAnsweredCorrectly).toBe(false);
	});
	it("should return a boolean when passed a positive number as a parameter", () => {
		for (let i = 0; i < 20; i++)
			expect(typeof buddyObj.checkAnswer(i)).toEqual("boolean");
	});
	it("should throw an error when a negative number as a parameter", () => {
		for (let i = -1; i > -20; i--)
			expect(() => buddyObj.checkAnswer(i)).toThrow(
				new Error(positiveNumberErrorMessage)
			);
	});
	it("should throw an error when a non numerical parameter is passed", () => {
		expect(() => buddyObj.checkAnswer("abc")).toThrow(
			new Error(positiveNumberErrorMessage)
		);
	});
	it(`should return true for distance 1 between notes A and B${flatSymbol}`, () => {
		buddyObj.notesArray = ["A", `B${flatSymbol}`];
		expect(buddyObj.checkAnswer(1)).toBe(true);
	});
	it("Should return true for distance 1 between notes A and A#", () => {
		buddyObj.notesArray = ["A", "A#"];
		expect(buddyObj.checkAnswer(1)).toEqual(true);
	});
	it(`Should return true for distance 3 between notes B${flatSymbol} and D${flatSymbol}`, () => {
		buddyObj.notesArray = [`B${flatSymbol}`, `D${flatSymbol}`];
		expect(buddyObj.checkAnswer(3)).toEqual(true);
	});
	it("Should return true for distance 3 between notes A# and C#", () => {
		buddyObj.notesArray = ["A#", "C#"];
		expect(buddyObj.checkAnswer(3)).toEqual(true);
	});
	it("Should return true for distance 1 between notes G# and A", () => {
		buddyObj.notesArray = ["G#", "A"];
		expect(buddyObj.checkAnswer(1)).toEqual(true);
	});
	it(`Should return true for distance 0 between notes B${flatSymbol} and B${flatSymbol}`, () => {
		buddyObj.notesArray = [`B${flatSymbol}`, `B${flatSymbol}`];
		expect(buddyObj.checkAnswer(0)).toEqual(true);
	});
	it("Should return true for distance 0 between notes F and F", () => {
		buddyObj.notesArray = ["F", "F"];
		expect(buddyObj.checkAnswer(0)).toEqual(true);
	});

	it("Should return true for distance 2 between notes A and B and false for distance 0, 1, 97, 2", () => {
		buddyObj.notesArray = ["A", "B"];
		expect(buddyObj.checkAnswer(0)).toEqual(false);
		expect(buddyObj.checkAnswer(1)).toEqual(false);
		expect(buddyObj.checkAnswer(97)).toEqual(false);
		expect(buddyObj.checkAnswer(2)).toEqual(true);
	});

	it("should true only when passed 2 for notes A and B, else return false", () => {
		const note1 = "G",
			note2 = "A",
			correctAnswer = 2;
		buddyObj.notesArray = [note1, note2];
		expect(buddyObj.checkAnswer(correctAnswer)).toEqual(true);
	});

	it("should true only when passed 4 for notes G and B, else return false", () => {
		const note1 = "G",
			note2 = "B",
			answer = 4;
		buddyObj.notesArray = [note1, note2];
		expect(buddyObj.checkAnswer(answer)).toEqual(true);
	});

	it(`should simulate a circle in that notes can only be calculated clockwise. A - A${flatSymbol} has distance 11 but not 1 or -1`, () => {
		const note1 = "A",
			note2 = `A${flatSymbol}`,
			answer = 11;
		buddyObj.notesArray = [note1, note2];
		expect(buddyObj.checkAnswer(answer)).toEqual(true);
		expect(buddyObj.checkAnswer(1)).toEqual(false);
		expect(() => buddyObj.checkAnswer(-1)).toThrow(
			new Error(positiveNumberErrorMessage)
		);
	});

	it("should simulate a circle in that notes can only be calculated clockwise. A - G# has distance 11 but not 1 or -1", () => {
		const note1 = "A",
			note2 = "G#",
			answer = 11;
		buddyObj.notesArray = [note1, note2];
		expect(buddyObj.checkAnswer(answer)).toEqual(true);
		expect(buddyObj.checkAnswer(1)).toEqual(false);
		expect(() => buddyObj.checkAnswer(-1)).toThrow(
			new Error(positiveNumberErrorMessage)
		);
	});
});
