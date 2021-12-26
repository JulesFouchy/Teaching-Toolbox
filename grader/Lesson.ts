type Mark = 1 | 2 | 3 | 4 | 5

interface Lesson {
  title: string
  link: string
  easiness: Mark
  benefit: Mark
  order: Mark
  tags: string[]
}

export type { Lesson, Mark }
