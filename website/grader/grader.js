const compression_curve = x => {
    // // https://www.desmos.com/calculator/yfd9yjnxvw
    // const a = 0.05
    // return 20 * Math.sqrt(a * x) / (Math.sqrt(1 + a * x))

    // https://www.desmos.com/calculator/6gmdt6tfmf
    return 20 - 10 / (Math.pow(2, x / 10 - 1))
}

export default (all_skills, new_skills) => {
    const scores = new_skills.map(skill_slug => {
        const skill = all_skills.find(skill => skill.slug === skill_slug)
        console.assert(skill !== undefined)
        return 6 - skill.easiness
    })
    const sum = scores.reduce((a, b) => a + b, 0)
    return compression_curve(sum)
}