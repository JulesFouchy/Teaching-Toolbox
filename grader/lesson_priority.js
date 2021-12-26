/// Returns a number between 0 and 1 (maps range_begin to 0 and range_end to 1)
const normalize = (x, range_begin, range_end) => (x - range_begin) / (range_end - range_begin)
/// Expects x in the [0, 1] range and returns a number in [range_begin, range_end] 
const map = (x, range_begin, range_end) => x * (range_end - range_begin) + range_begin

const validate = (name, skill) => {
    const value = skill[name]
    if (![1, 2, 3, 4, 5].includes(value)) {
        console.error(`Invalid '${name}' value : ${value}`)
        return false
    }
    else {
        return true
    }
}

const lesson_priority = (skill) => {
    if (!validate("benefit", skill)  ||
        !validate("easiness", skill) ||
        !validate("order", skill))
    {
        return -1
    }
    const absolute_prio = normalize(skill.benefit * 0.75 + skill.easiness * 0.25, 1, 5)
    const relative_prio = skill.order === 5 ? map(absolute_prio, 0.0, 0.2)
                        : skill.order === 4 ? map(absolute_prio, 0.2, 0.4)
                        : skill.order === 3 ? map(absolute_prio, 0.4, 0.6)
                        : skill.order === 2 ? map(absolute_prio, 0.6, 0.8)
                        : skill.order === 1 ? map(absolute_prio, 0.8, 1.0)
                        : -1
    return relative_prio
}

module.exports = lesson_priority