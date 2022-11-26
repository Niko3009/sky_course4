// ---------- СПИСОК ОКОН ----------

let list = {}

import { difficultySelection } from './modalsList/difficultySelection/difficultySelection.js'
list['difficulty selection'] = difficultySelection

import { gameResult } from './modalsList/gameResult/gameResult.js'
list['game result'] = gameResult

export { list }
