import levels_points from "../../../../levels_points.json"

const LevelPoints = ({ level }) => {
  if (Array.isArray(level)) {
    return level.reduce((acc, lvl) => acc + LevelPoints({ level: lvl }), 0)
  } else {
    return levels_points[level]
  }
}

export default LevelPoints
