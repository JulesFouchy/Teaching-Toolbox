const compression_curve = (x) => {
  // // https://www.desmos.com/calculator/yfd9yjnxvw
  // const a = 0.05
  // return 20 * Math.sqrt(a * x) / (Math.sqrt(1 + a * x))

  // https://www.desmos.com/calculator/6gmdt6tfmf
  return 20 - 10 / Math.pow(2, x / 10 - 1)
}

export default (all_lessons, new_lessons) => {
  const scores = new_lessons.map((lesson_slug) => {
    const lesson = all_lessons.find((lesson) => lesson.slug === lesson_slug)
    console.assert(lesson !== undefined)
    return 6 - lesson.easiness
  })
  const sum = scores.reduce((a, b) => a + b, 0)
  return compression_curve(sum)
}
