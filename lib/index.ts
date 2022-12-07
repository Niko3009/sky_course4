import './styles/fonts/stratosskyengweb-regular.woff'
import './styles/style.css'
import * as _ from 'lodash'

import { app } from './scripts/appObj'

declare global {
    interface Window {
        app: any
    }
}

window.app = app

document.addEventListener(
    'DOMContentLoaded',
    window.app.launch // запуск приложения
)
