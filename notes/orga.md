## One or many repo.s ?

### Many

Each class has it's own repo, and then all classes are put together as submodules of one IMAC repo.

- Reduces coupling between a given class and the IMAC formation (allows teacher to own their class which they can teach in different schools + no need to move existing classes to the IMAC repo)
- Allows each teacher to choose the visibility (public/private) of his class material

### One

- no sync problems across repos. The changes done in a repo don't need to be pulled on the main IMAC repo
- easier to make links across classes
- easier to have a consistent style across repos (same layout etc.)

## Folder architecture

All classes are a folder at the root level, and there is no intermediate sorting (by semester, topic, etc.)

- Easier to maintain (no hard decision like : is this a programming or art class (tough for some topics that touch on both), no need to move anything when we move something from semester 2 to 3(and not moving files means not taking the risk of breaking existing links))
- The organisation can be done through a ReadMe on the repo and/or the website that uses these markdown classes.

## Changes

Don't modify the repo in the middle of the semester, especially the *expectations* part (bug fixes and improvements to the lessons are acceptable). Put your changes on a branch for the following year. The repo should be a promise made to students at the beginning of the semester about all the things that will be expected from them.

## Evaluation v1

### Process

We list *beforehead* all the skills that are supposed to be mastered at the end of the class. Each can be graded with :
- **S** above expectations
- **A** mastered, nothing to add
- **B** pretty good, a few things to improve
- **C** insufficient
- **D** wtf ?

I don't expect to give many (if any) **S**, but it is nice to reserves a place for surprise and reward investment and impressive achievements.

I don't expect to give any **D** either.

Someone with **A** everywhere will get the maximal grade of 20/20. An **S** will compensate a **B**.

More precisely : **D** = 0, **C** = 1, **B** = 2, **A** = 3 and **S** = 4. The grades of all the skills are averaged, and the final note is then remapped into a reasonnable interval ( [0, 3] -> [0, 20], not necessarily linearly (the exact formula is still to be determined))

TODO :
- should **D** be called **Z** ? Since it is a note that isn't supposed to really happen (unlike **A**, **B** or **C**). **Z** would denote something unexpected, like **S**.

### Rationale

The main goal is the minimize the stress caused by the evaluation. We expect to achieve this by giving students a clear view on the grading process, their current grade at all time, and by giving them the possibility to improve their grades at any time by submitting additional exercises.

Also, we believe that having a clear list of expectations will help students to study.

Also, evaluating skills instead of a specific set of exercises means that we can propose different ways of getting evaluated to students. For example if some of them want to do a project instead (which will definitely be more enriching (and require more investment)) it is totally possible.

### Repeated evaluation

Skills should not be assessed only once. There should be many occasions where they are required (and therefore evaluated) : it encourages real learning instead of relying on short-term memory for a given exercise / test. (https://www.psypost.org/2021/07/spacing-math-practice-across-multiple-sessions-improves-students-test-scores-and-helps-them-accurately-judge-their-learning-61606)


## Evaluation v2

### Process

At the beginning of the semester, students self-evaluate themselves by checking the skills in the list that they already master. Then the evaluation will be based on the new skills they have learned during this semester.

### Rationale

The students have very different levels at the beginning of the semester, so they can't be expected to have the same level at the end of the semester. What matters is to improve, and to do so successfully everybody must learn at their own pace, starting from where they are right now.

### Details

You need to validate a skill twice[^1] to get the full grade (otherwise you only get half of the points). Because you learn by repeating, and because I don't want you to do it once and then ignore it during the other exercises.

We expect the students to acquire some number of skills (or more precisely we will look at the cumulated difficulties of the acquired skills, because some take way more time than others to master). Each skill acquired over the course of the semester grants you some points (aka we don't count the skills you already had prior to the class). To avoid everybody reaching 20/20 very fast, we apply a compressing function like an arctan to that score.

We also need to reward to total time invested in the class. We can do that by tweaking the compressing function based on the invested time, so that it is more forgiving for people who dedicated a lot of time to the class.

[^1]: Aka submit two exercises where you demonstrate that skill (are one big project where it is applied consistently)

### Cheating

Obviously people can lie while self-evaluating, but this is no big deal in my opinion. Because the other method of grading them based on a project or exercises makes it equally easy for them to pretend they contributed to the code more than they actually did.
With self-evaluation even though they can overemphasize their work a bit – which is okay to me – they cannot lie completely because it would be obvious.

Also, I believe that we can trust IMAC students.

Overall I think this is a better compromise between the ease of cheating and the incentive it gives students to make some efforts and be somewhat honest about the time they invested in the class. (This is also favored by a less oppressing way of grading which looks at the investment rather than the final product).

## 1 hour vs 2 hour sessions (vs something else ?)

Shorter sessions allow us to have more of them, and therefore repeat more the same topics ((https://www.psypost.org/2021/07/spacing-math-practice-across-multiple-sessions-improves-students-test-scores-and-helps-them-accurately-judge-their-learning-61606)), or cover more topics. Also, it is well know that concentration falls off rapidly, and 45 min is a recommended duration. (At least if we do 2 hours we must have a break in the middle)

## Language : english