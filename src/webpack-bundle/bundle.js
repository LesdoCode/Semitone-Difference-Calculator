(() => {
	var e = {
			239: (e) => {
				e.exports = {
					JamBuddy: class {
						constructor() {
							(this.notesArray = [{}, {}]),
								(this.streak = 0),
								(this.correctAnswers = 0),
								(this.wrongAnswers = 0),
								(this.isAnsweredCorrectly = !1),
								(this.flatSymbol = "♭"),
								(this.notes = [
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
								]),
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
							const e = new Set();
							return (
								this.notes.forEach((t) => {
									e.add(t), e.add(this.getFlat(t));
								}),
								[].concat(...e)
							);
						}
						getRandomNumber(e) {
							return Math.floor(Math.random() * e);
						}
						getFlat(e) {
							if (e.includes("#")) {
								const t = (this.notes.indexOf(e) + 1) % this.notes.length;
								return `${this.notes[t]}${this.flatSymbol}`;
							}
							return e;
						}
						isFlat() {
							return this.notes.includes(this.flatSymbol);
						}
						getSharp(e) {
							if (e.includes(this.flatSymbol)) {
								e = e.replace(this.flatSymbol, "");
								const t =
									(this.notes.indexOf(e) + this.notes.length - 1) %
									this.notes.length;
								return this.notes[t];
							}
							return e;
						}
						selectNotes() {
							this.isAnsweredCorrectly = !1;
							let e = this.notes[this.getRandomNumber(this.notes.length - 1)],
								t = this.notes[this.getRandomNumber(this.notes.length - 1)];
							return (
								e === t &&
									(t = this.notes[this.getRandomNumber(this.notes.length - 1)]),
								this.getRandomNumber(50) % 2 == 0 && (e = this.getFlat(e)),
								this.getRandomNumber(70) % 3 == 0 && (t = this.getFlat(t)),
								(this.notesArray = [e, t])
							);
						}
						getNoteDifference(e, t) {
							return e > t ? -1 * (e - t - this.notes.length) : t - e;
						}
						getAnswer() {
							if (this.notesArray.includes(void 0)) return -1;
							const e = [
								this.notes.indexOf(this.getSharp(this.notesArray[0])),
								this.notes.indexOf(this.getSharp(this.notesArray[1])),
							];
							return this.getNoteDifference(...e);
						}
						checkAnswer(e) {
							if (!Number.isInteger(e) || e < 0)
								throw new Error("Answer must be a positive integer");
							const t = e === this.getAnswer();
							return (
								t
									? (this.streak++,
									  this.correctAnswers++,
									  (this.isAnsweredCorrectly = t))
									: ((this.streak = 0), this.wrongAnswers++),
								t
							);
						}
					},
				};
			},
			880: (e, t, n) => {
				const { JamBuddy: s } = n(239),
					r = document.querySelector(".controls"),
					o = document.getElementById("answer"),
					i = document.getElementById("explanation"),
					a = document.querySelector(".answer-reveal-section"),
					c = document.querySelector(".game-message"),
					h = document.querySelector("#streak"),
					l = document.querySelector("#correct-answers"),
					u = document.querySelector("#wrong-answers"),
					d = new s();
				function g() {
					const e = d.getStreak();
					(h.innerHTML = `${e > 2 ? w("celebrate.gif") : ""}${e} `),
						(l.innerHTML = d.getCorrectAnswers()),
						(u.innerHTML = d.getWrongAnswers());
				}
				function f(e) {
					const t = n.g.document.querySelector(".first-note"),
						s = n.g.document.querySelector(".second-note");
					(t.innerHTML = e[0]), (s.innerHTML = e[1]);
				}
				function w(e) {
					return `<img class="gif" src="./gif/${e}">`;
				}
				function m() {
					if (d.isAlreadyAnswered())
						return alert("You have already answered this question!");
					let e = !1;
					try {
						const t = parseInt(o.value);
						(e = d.checkAnswer(t)),
							e
								? (a.classList.remove("hidden"),
								  b(
										`Congratulations, Your answer is correct! ${
											d.getStreak() > 2 ? w("fire.gif") : ""
										}`
								  ))
								: alert("Wrong answer! Try again");
					} catch (e) {
						alert(e.message);
					} finally {
						(o.value = ""), g();
					}
				}
				function y() {
					a.classList.add("hidden"), f(d.selectNotes()), g();
				}
				function A() {
					b();
				}
				function b(e) {
					i.innerHTML = "";
					for (let e of d.getAllNotes()) {
						const t = d.notesArray.includes(e) ? "note-highlight" : "";
						i.innerHTML += `<span class="note ${t}">${e}</span>`;
					}
					a.classList.remove("hidden"),
						(c.innerHTML = e || `The answer is ${d.getAnswer()}`);
				}
				r.addEventListener("click", function (e) {
					const t = e.target;
					if (t.classList.contains("btn"))
						switch (t.id) {
							case "get-random-notes":
								y();
								break;
							case "submit-answer":
								m();
								break;
							case "reveal-answer":
								A();
						}
				}),
					o.addEventListener("keypress", function (e) {
						const t = e.key;
						if (
							("Enter" === e.key && m(),
							!RegExp("^[0-9]$").test(t) || o.value.length > 1)
						)
							return e.preventDefault();
					}),
					y(),
					(e.exports = {
						document,
						setNotes: f,
						btnGetRandomNotesClick: y,
						btnSubmitAnswerClick: m,
						btnRevealAnswerClick: A,
						buddy: d,
					});
			},
		},
		t = {};
	function n(s) {
		var r = t[s];
		if (void 0 !== r) return r.exports;
		var o = (t[s] = { exports: {} });
		return e[s](o, o.exports, n), o.exports;
	}
	(n.g = (function () {
		if ("object" == typeof globalThis) return globalThis;
		try {
			return this || new Function("return this")();
		} catch (e) {
			if ("object" == typeof window) return window;
		}
	})()),
		n(880);
})();
