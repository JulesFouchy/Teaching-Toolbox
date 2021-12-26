import LessonsList from './LessonsList'

Welcome! In this section you will be able to see your progress live, your current grade, and the next skills that you can learn. Each student has their own page which I will update regularly with the lessons that I have validated.

Checked in grey are the lessons you already knew before this semester, in green the ones I validated during this semester, and in blue the ones that you can temporarily check to see what your grade would be if you were to validate those lessons.

## How are the lessons sorted?

They are first sorted by **Order**, which is a rough measure of a logical order that the lessons should be learned in. For example you can't learn about *Git submodules* if you don't even know what *Git* is yet.

Then, for lessons of the same Order, a **Priority** is computed as `0.75 * Benefit + 0.25 * Easiness`, which is then remapped between 100% and 0% according to the Order. **Benefit** measures how much your code or workflow will improve if you learn that lesson, and **Easiness** measures how easy it will be to learn that lessons. The bests lessons are the ones that have a huge impact *and* are easy to learn, and this is the ones that will have the highest Priorities.

## How is my grade calculated?

Each mastered lesson gives you some points based on how long it should have taken you to learn. We sum all those points, and then apply [a compression function](https://www.desmos.com/calculator/6gmdt6tfmf) to map this score between 0 and 20. You can see the exact source code that we use [here](https://github.com/JulesFouchy/Teaching-Toolbox/blob/main/grader/grader.js).

## Self-evaluation

Please tick the lessons that you consider to master already, then export them as json using that big green button and send them to me.

If you have a doubt, don't tick the checkbox; in the worst case this will mean that you will have a lesson that is easy to validate during the semester.

You don't need to check lessons of order 3 or higher if you can't be bothered reading the whole list (which is arguably pretty long).

<LessonsList student_lessons={{
    new: [
    ],
    old: [
    ],
    is_demo: true,
}}/>