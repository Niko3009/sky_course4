// ---------- СПИСОК ОКОН ----------

let list: any = new Object()

import { difficultySelection } from './modalsList/difficultySelection/difficultySelection'
list['difficulty selection'] = difficultySelection

import { gameResult } from './modalsList/gameResult/gameResult'
list['game result'] = gameResult

export { list }
