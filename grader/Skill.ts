type Mark = 1 | 2 | 3 | 4 | 5

interface Skill {
    title: string,
    link: string,
    easiness: Mark,
    benefit: Mark,
    order: Mark,
    tags: string[],
}

export type { Skill, Mark }