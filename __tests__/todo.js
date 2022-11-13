/* eslint-disable no-undef */

const todos = require("../todo.js");

const { all, add, markAsComplete, overdue, dueToday, dueLater } = todos();

const today = new Date();
const oneDay = 60 * 60 * 24 * 1000;
const yesterday = new Date(today.getTime() - 1 * oneDay);
const tomorrow = new Date(today.getTime() + 1 * oneDay);

describe("Milestone test suite:", () => {
  beforeAll(() => {
    add({
      title: "Hit Gym",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false,
    });

    add({
      title: "Complete Lab Work",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false,
    });
  });

  test("A test that checks creating a new todo. ", () => {
    const length = all.length;

    add({
      title: "Homework",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false,
    });

    expect(all.length).toBe(length + 1);
  });

  test("A test that checks marking a todo as completed.", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("A test that checks retrieval of overdue items", () => {
    const overDueCounter = overdue().length;
    add({
      title: "Take online lecture",
      dueDate: yesterday.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(overdue().length).toBe(overDueCounter + 1);
  });

  test("A test that checks retrieval of due today items", () => {
    const dueTodayCounter = dueToday().length;
    add({
      title: "Team Meeting",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(dueToday().length).toBe(dueTodayCounter + 1);
  });

  test("A test that checks retrieval of due later items", () => {
    const dueLaterCounter = dueLater().length;
    add({
      title: "Hit Gym",
      dueDate: tomorrow.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(dueLater().length).toBe(dueLaterCounter + 1);
  });
});
