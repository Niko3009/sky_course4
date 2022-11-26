;(() => {
    'use strict'
    var e = {}
    ;(e.g = (function () {
        if ('object' == typeof globalThis) return globalThis
        try {
            return this || new Function('return this')()
        } catch (e) {
            if ('object' == typeof window) return window
        }
    })()),
        (() => {
            var t
            e.g.importScripts && (t = e.g.location + '')
            var n = e.g.document
            if (!t && n && (n.currentScript && (t = n.currentScript.src), !t)) {
                var o = n.getElementsByTagName('script')
                o.length && (t = o[o.length - 1].src)
            }
            if (!t)
                throw new Error(
                    'Automatic publicPath is not supported in this browser'
                )
            ;(t = t
                .replace(/#.*$/, '')
                .replace(/\?.*$/, '')
                .replace(/\/[^\/]+$/, '/')),
                (e.p = t)
        })(),
        e.p
    let t = document.querySelector('#app')
    t ||
        (t = (function () {
            const e = document.body,
                t = document.createElement('main')
            e.appendChild(t)
            const n = document.createElement('div')
            return t.appendChild(n), n.classList.add('app'), (n.id = 'app'), n
        })())
    const n = {
            state: {
                globalState: null,
                screen: null,
                modal: null,
                globalStateNumber: 0,
                screenNumber: 0,
                modalNumber: 0,
                isAnimationInProgress: !1,
                isScreenTransitionInProgress: !1,
                isModalTransitionInProgress: !1,
            },
            game: {
                difficulty: 0,
                time: {
                    secondsAll: 0,
                    seconds: 0,
                    minutes: 0,
                    summary: '0m 0s',
                    updateTheData(e) {
                        const t = window.app.data.game.time,
                            n = Math.floor(e / 60),
                            o = e - 60 * n
                        ;(t.secondsAll = e),
                            (t.minutes = n),
                            (t.seconds = o),
                            (t.summary = `${t.minutes}m ${t.seconds}s`)
                    },
                },
                cards: { involved: new Array(), founded: new Array() },
                gameFieldData: { openedCards: null, closedCards: null },
                resetDataToDefault() {
                    const e = window.app.data.game
                    ;(e.difficulty = 0),
                        (e.time.secondsAll = 0),
                        (e.time.seconds = 0),
                        (e.time.minutes = 0),
                        (e.cards.involved = null),
                        (e.cards.founded = null),
                        (e.gameFieldData.openedCards = null),
                        (e.gameFieldData.closedCards = null)
                },
            },
            getInfo() {
                const e = window.app.data,
                    t = e.game
                let n = {
                    globalState: e.state.globalState,
                    difficulty: t.difficulty,
                    time: t.time.summary,
                    cards: t.cards,
                }
                return console.log(n), n
            },
        },
        o = e.p + '34f9007d93b852373b19.png',
        s = e.p + 'ca8e8ae9963e3f92d705.png',
        i = e.p + '2a29f57cff6d7fe289c9.png',
        a = e.p + '5416fec8a3351abfb29c.png',
        l = e.p + '159a6a9ee32724b000bb.png',
        c = e.p + '21fdc2ea9c4b7504f6c4.png',
        r = e.p + '55b60194e1d8bc42213a.png',
        d = e.p + '1461858438121325c8f8.png',
        p = e.p + '3fc83e56d22545c95ac4.png',
        m = e.p + 'df0ee8276fb76349d049.png',
        f = e.p + 'ff24f295be60c192d8b4.png',
        u = e.p + '1f68b15442a81645dbff.png',
        g = e.p + '30993c6b1dfadb442828.png',
        b = e.p + '2cbbd0da260e5aa055f8.png',
        y = e.p + '450f95b406200f69c3a5.png',
        w = e.p + 'b96fff89793e38ddfc04.png',
        h = e.p + 'dba592e53d00f917a35e.png',
        T = e.p + '3841d07c8018c1287293.png',
        v = e.p + '8056f9d4274b222f809b.png',
        C = e.p + '3f258a15a34217d1a677.png',
        L = e.p + '21a5673a23e6e117683c.png',
        k = e.p + 'ff37038e1ac7dc7529de.png',
        x = e.p + '9ee9af979f52faecb15d.png',
        B = e.p + 'ce37176cf1d8ac97ef87.png',
        _ = e.p + '67a018262659cbec3dfd.png',
        S = e.p + 'e4e5e4068a3cfc6baa13.png',
        $ = e.p + '99eef8bb46d129dabfdc.png',
        P = e.p + 'a20ddcd21854494ef005.png',
        E = e.p + '9499d350905b4240c624.png',
        A = e.p + 'bad51eb215cecfef77b4.png',
        M = e.p + 'fe6edb25a1d1e892deeb.png',
        O = e.p + '9f2aba4a21ac3181a934.png',
        I = e.p + 'b610a2b7416a2fc919a0.png',
        D = e.p + 'b597e08b67c528716014.png',
        N = e.p + 'e4423de1fcae886d38f3.png',
        F = e.p + '2b0b076203aca54204ee.png',
        H = e.p + '96e27b851cae90c8bb1d.png'
    let q = {}
    ;(q['6_spades'] = o),
        (q['7_spades'] = s),
        (q['8_spades'] = i),
        (q['9_spades'] = a),
        (q['10_spades'] = l),
        (q.J_spades = c),
        (q.Q_spades = r),
        (q.K_spades = d),
        (q.A_spades = p),
        (q['6_diamonds'] = m),
        (q['7_diamonds'] = f),
        (q['8_diamonds'] = u),
        (q['9_diamonds'] = g),
        (q['10_diamonds'] = b),
        (q.J_diamonds = y),
        (q.Q_diamonds = w),
        (q.K_diamonds = h),
        (q.A_diamonds = T),
        (q['6_hearts'] = v),
        (q['7_hearts'] = C),
        (q['8_hearts'] = L),
        (q['9_hearts'] = k),
        (q['10_hearts'] = x),
        (q.J_hearts = B),
        (q.Q_hearts = _),
        (q.K_hearts = S),
        (q.A_hearts = $),
        (q['6_clubs'] = P),
        (q['7_clubs'] = E),
        (q['8_clubs'] = A),
        (q['9_clubs'] = M),
        (q['10_clubs'] = O),
        (q.J_clubs = I),
        (q.Q_clubs = D),
        (q.K_clubs = N),
        (q.A_clubs = F),
        (q.back = H)
    let j = {
            game: function () {
                const e = window.app,
                    t = e.components,
                    n = new (0, t.dev.forListFilling.ofComponents)('screen'),
                    o = n.cssPrefixMaking('game'),
                    s = n.renderTheElement,
                    i = n.renderTheBlock,
                    a = n.template.box,
                    l = t.screens.close,
                    c = t.modals.open,
                    r = t.transitions.screenClosingTime,
                    d = e.timeouts.start,
                    p = e.timers.start,
                    m = e.timers.stop,
                    f = e.data.game,
                    u = f.time.updateTheData,
                    g = { 1: 6, 2: 12, 3: 18, 4: 36 },
                    b = Boolean(g[f.difficulty]) ? f.difficulty : 4,
                    y = g[b],
                    w = s('div', a, { classList: [o + 'header'] }),
                    h = i('gameTimer', w),
                    T = i('button', w, { buttonName: 'Начать заново' }),
                    v = s('div', a, { classList: [o + 'gameField'] }),
                    C = document.createElement('div'),
                    L = `gameField_cardsCollectionBox_${b}`
                C.classList.add(o + L), v.appendChild(C)
                let k = []
                for (let e = 1; e <= y; e++) {
                    const e = document.createElement('div')
                    e.classList.add(o + 'gameField_cardBox'), C.appendChild(e)
                    const t = document.createElement('img')
                    ;(t.src = q.back), e.appendChild(t), k.push(e)
                }
                const x = document.createElement('div')
                x.classList.add(o + 'footer'), a.appendChild(x)
                const B = i('button', x, { buttonName: 'Выйти из игры' }),
                    _ = function () {
                        N++, u(N)
                        const e = f.time.seconds,
                            t = f.time.minutes
                        h.updateTime.byTimeData(t, e)
                    },
                    S = function (e) {
                        const t = e.selector,
                            n = t.querySelector('img'),
                            o = e.isCardHidden,
                            s = 'flip-in-ver-left'
                        return (
                            !Boolean(t.style.animation) &&
                            (d(0, () => {
                                ;(t.style.animation =
                                    'flip-in-ver-left 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'),
                                    t.classList.add(s),
                                    d(0.4, () => {
                                        n.src = o ? (n.src = q[e.name]) : q.back
                                    })
                            }),
                            d(0.8, () => {
                                t.classList.remove(s),
                                    t.style.removeProperty('animation'),
                                    (e.isCardHidden = !o)
                            }),
                            !0)
                        )
                    },
                    $ = function (e) {
                        !O ||
                            D > 1 ||
                            (Boolean(e.isCardHidden) &&
                                S(e) &&
                                (D++,
                                d(0.8, () => {
                                    const t = f.time.summary,
                                        n = e.rank + e.suitImg,
                                        o = e.placeNumber
                                    console.log(
                                        `${t}: открыта карта № ${o} ( ${n} )`
                                    ),
                                        I
                                            ? (E(e, I), (I = null), (D = 0))
                                            : (I = e)
                                })))
                    },
                    P = function (e) {
                        Boolean(e.isCardHidden) || S(e)
                    },
                    E = function (e, t) {
                        const n = e.name === t.name
                        if (n) {
                            const n = F.indexOf(e)
                            F.splice(n, 1)
                            const o = F.indexOf(t)
                            F.splice(o, 1), f.cards.founded.push(e.name)
                        } else
                            d(0.8, () => {
                                P(e), P(t)
                            })
                        alert(n ? 'Вы победили!' : 'Вы проиграли!', '\n\n'),
                            0 === F.length && A()
                    },
                    A = function () {
                        const t = f.time.summary
                        alert(`Игра завершена! (${t})`, '\n\n'),
                            m(M),
                            e.data.getInfo()
                    }
                let M,
                    O = !1,
                    I = null,
                    D = 0,
                    N = 0
                B.addEventListener('click', function () {
                    l(),
                        d(r, () => {
                            c('difficulty selection')
                        })
                }),
                    T.addEventListener('click', function () {
                        const e = window.app.data.state.screen
                        e && window.app.components.screens.open(e)
                    })
                const F = (function (e) {
                    let t = []
                    const n = ['spades', 'diamonds', 'hearts', 'clubs'],
                        o = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
                    for (const e of n) for (const n of o) t.push(`${n}_${e}`)
                    let s = new Array()
                    const i = Math.floor(e.length / 2)
                    for (let e = 1; e <= i; e++) {
                        const n = t.length,
                            o = Math.floor(Math.random() * n) + 1,
                            i = t[o - 1]
                        t.splice(o - 1, 1), (s[e - 1] = i)
                    }
                    let a = [].concat(s, s),
                        l = new Array()
                    const c = a.length
                    for (let t = 1; t <= c; t++) {
                        const n = a.length,
                            o = Math.floor(Math.random() * n) + 1,
                            s = a[o - 1]
                        a.splice(o - 1, 1)
                        const i = s.slice(0, s.indexOf('_')),
                            c = s.slice(s.indexOf('_') + 1),
                            r =
                                'spades' === c
                                    ? '♠'
                                    : 'clubs' === c
                                    ? '♣'
                                    : 'hearts' === c
                                    ? '♥'
                                    : '♦',
                            d = {
                                placeNumber: t,
                                selector: e[t - 1],
                                isCardHidden: !0,
                                name: s,
                                rank: i,
                                suit: c,
                                suitImg: r,
                            }
                        l[t - 1] = d
                    }
                    return (
                        (f.gameFieldData.closedCards = l),
                        (f.cards.involved = s),
                        (f.cards.founded = []),
                        l
                    )
                })(k)
                console.log(`Число задействованных карт: ${y}`, '\n\n')
                for (const e of F)
                    e.selector.addEventListener('click', () => {
                        $(e)
                    })
                !(function () {
                    const e = F
                    d(1, () => {
                        for (const t of e) S(t)
                    }),
                        d(6, () => {
                            for (const t of e) S(t)
                            ;(M = p(1, _)),
                                (O = !0),
                                console.log('История игры:', '\n\n')
                        })
                })()
            },
        },
        J = {
            button: function (
                e,
                t = { buttonName: 'Кнопка', buttonClass: 'regular' }
            ) {
                const n = new (0,
                    window.app.components.dev.forListFilling.ofComponentBlocks)(
                        'screen'
                    ),
                    o = n.cssPrefixMaking('button'),
                    s = (0, n.renderTheElement)('button', e, {
                        classList: [o + t.buttonClass],
                    }),
                    i = t.buttonName
                return (
                    'string' == typeof i
                        ? (s.innerHTML = i)
                        : console.log('Название кнопки не передано!'),
                    s
                )
            },
            popUpMessage: function (e, t = { message: 'Сообщение' }) {
                const n = new (0,
                    window.app.components.dev.forListFilling.ofComponentBlocks)(
                        'screen'
                    ),
                    o = n.cssPrefixMaking('popUpMessage'),
                    s = (0, n.renderTheElement)('div', e, {
                        classList: [o + 'msgDisplay'],
                    }),
                    i = document.createElement('div')
                i.classList.add(o + 'msgBox'), s.appendChild(i)
                const a = document.createElement('p')
                i.appendChild(a)
                const l = t.message
                return (
                    'string' == typeof l
                        ? (a.innerHTML = l)
                        : console.log('Сообщение не передано!'),
                    s
                )
            },
            gameTimer: function (e) {
                const t = new (0,
                    window.app.components.dev.forListFilling.ofComponentBlocks)(
                        'screen'
                    ),
                    n = t.cssPrefixMaking('gameTimer'),
                    o = (0, t.renderTheElement)('div', e, {
                        classList: [n + 'Box'],
                    }),
                    s = document.createElement('div')
                s.classList.add(n + 'SubBox'), o.appendChild(s)
                const i = document.createElement('div')
                i.classList.add(n + 'SubBox'), o.appendChild(i)
                const a = document.createElement('p')
                ;(a.textContent = 'min'), s.appendChild(a)
                const l = document.createElement('p')
                ;(l.textContent = 'sec'), i.appendChild(l)
                const c = document.createElement('h1')
                ;(c.textContent = '00'), s.appendChild(c)
                const r = document.createElement('h1')
                ;(r.textContent = '.00'), i.appendChild(r)
                let d = {}
                return (
                    (d.selectorOfMinutes = c),
                    (d.selectorOfSeconds = r),
                    (d.updateTime = {}),
                    (d.updateTime.byTimeData = function (e, t) {
                        ;(c.textContent = e < 10 ? '0' + e : e),
                            (r.textContent = t < 10 ? '.0' + t : '.' + t)
                    }),
                    (d.updateTime.bySecondsData = function (e) {
                        const t = Math.floor(e / 60),
                            n = e - 60 * t
                        ;(c.textContent = t < 10 ? '0' + t : t),
                            (r.textContent = n < 10 ? '.0' + n : '.' + n)
                    }),
                    d
                )
            },
        }
    const K = class {
        constructor(e) {
            const n = document.createElement('div')
            n.classList.add(`${e}Display`),
                (n.style.display = 'none'),
                (n.style.opacity = '0'),
                t.appendChild(n)
            const o = document.createElement('div')
            o.classList.add(`${e}Box`), n.appendChild(o)
            const s = document.createElement('div')
            s.classList.add(`${e}CoverLayer`),
                (s.style.display = 'none'),
                n.appendChild(s),
                (this.box = o),
                (this.display = n),
                (this.cover = s)
        }
    }
    let Q = {
        box: t.querySelector('.screenBox'),
        display: t.querySelector('.screenDisplay'),
        coverLayer: t.querySelector('.screenCoverLayer'),
    }
    Q.box || (Q = new K('screen'))
    const U = {
        list: j,
        open: function (e) {
            const t = window.app,
                n = t.data,
                o = t.components,
                s = o.screens.template.box,
                i = o.screens.template.display,
                a = o.screens.template.cover,
                l = o.screens.list[e],
                c = o.blockVisibility.Off,
                r = o.transitions.screenAnimationTime,
                d = o.dev.makeDelay,
                p = o.transitions.modalClosingTime,
                m = o.transitions.screenOpeningTime,
                f = o.transitions.delayBetweenTransitions
            if (!Boolean(l)) {
                const t = `Экрана «${e}» в window.app.components.screens.list нет`
                return void console.log('❗', t)
            }
            if (n.state.isScreenTransitionInProgress) {
                const t = `Открыть экран «${e}» сейчас нельзя:\n переход уже запущен`
                return void console.log('❗', t)
            }
            const u = o.screens.close
            let g = 0
            const b = n.state.screen
            Boolean(b) && (g += p + f),
                u(),
                d(g, () => {
                    ;(n.state.isScreenTransitionInProgress = !0),
                        (a.style.display = 'block')
                    const t = `―――――――――――――――――― ЭКРАН «${e.toUpperCase()}» ――――――――――――――――――`
                    console.log('\n', t, '\n\n')
                    const o = `${e} (screen)`
                    ;(n.state.globalState = o),
                        n.state.globalStateNumber++,
                        (n.state.screen = e),
                        n.state.screenNumber++,
                        l(s),
                        c(i, r),
                        d(m, () => {
                            ;(n.state.isScreenTransitionInProgress = !1),
                                a.style.removeProperty('display')
                        })
                })
        },
        close: function () {
            const e = window.app,
                t = e.data,
                n = e.components,
                o = n.screens.template.box,
                s = n.screens.template.display,
                i = n.screens.template.cover,
                a = n.blockVisibility.On,
                l = n.transitions.screenAnimationTime,
                c = n.dev.makeDelay,
                r = n.transitions.screenClosingTime,
                d = t.state.screen
            if (Boolean(d))
                if (t.state.isScreenTransitionInProgress) {
                    const e = `Закрыть экран «${d}» сейчас нельзя:\n переход уже запущен`
                    console.log('❗', e)
                } else
                    (t.state.isScreenTransitionInProgress = !0),
                        (i.style.display = 'block'),
                        a(s, l),
                        c(r, () => {
                            ;(o.innerHTML = ''),
                                (o.classList = o.classList[0]),
                                (t.state.globalState = null),
                                t.state.globalStateNumber++,
                                (t.state.screen = null)
                            const e = `Экран «${d}» закрыт    ――――――――――――――――――――――――――――――――――――――――――――――`
                            console.log('\n', e, '\n\n'),
                                console.log('\n\n\n'),
                                (t.state.isScreenTransitionInProgress = !1),
                                i.style.removeProperty('display')
                        })
        },
        blocks: {
            list: J,
            render: function (
                e,
                t = window.app.components.screens.template.box,
                n = {}
            ) {
                const o = window.app.components.screens.blocks
                if (void 0 === o.list[e]) {
                    const t = `Блока ${e} в components.screens.blocks.list нет`
                    return void console.log('❗', t)
                }
                if (null === t) {
                    const t = `В body нет поля (контейнера), введенного для ${e}`
                    return void console.log('❗', t)
                }
                const s = o.list[e](t, n)
                if (void 0 !== s) return s
            },
        },
        template: Q,
    }
    let V = {
            'difficulty selection': function () {
                const e = window.app,
                    t = e.components,
                    n = new (0, t.dev.forListFilling.ofComponents)('modal'),
                    o = n.cssPrefixMaking('difficultySelection'),
                    s = n.renderTheElement,
                    i = n.renderTheBlock,
                    a = n.template.box,
                    l = t.screens.open,
                    c = t.modals.close,
                    r = t.transitions.modalClosingTime,
                    d = e.timeouts.start
                i('modalTitle', a, { title: 'Выбери сложность' })
                const p = s('div', a, { classList: [o + 'selectionBlock'] }),
                    m = p.children
                for (let e = 1; e <= 3; e++)
                    i('button', p, { buttonName: String(e) })
                const f = i('button', a, { buttonName: 'Старт' })
                let u = 0
                e.timers.stopAll(),
                    e.timeouts.stopAll(),
                    e.data.game.resetDataToDefault()
                for (const e of m)
                    e.addEventListener('click', () => {
                        u = Number(e.textContent)
                        for (const e of m) e.classList.remove('selectedOption')
                        e.classList.add('selectedOption')
                    })
                f.addEventListener('click', function () {
                    if (void 0 !== u)
                        console.log('Выбрана сложность:', u),
                            (e.data.game.difficulty = u),
                            m[u - 1].classList.add('resultOption'),
                            c(),
                            d(r, () => {
                                l('game')
                            })
                    else {
                        const e = 0.5
                        for (const e of m) e.classList.add('errorOption')
                        d(e, () => {
                            for (const e of m) e.classList.remove('errorOption')
                        })
                    }
                })
            },
        },
        z = {
            modalTitle: function (e, t = { title: 'Заголовок окна' }) {
                const n = new (0,
                    window.app.components.dev.forListFilling.ofComponentBlocks)(
                        'modal'
                    ),
                    o = n.cssPrefixMaking('modalTitle'),
                    s = (0, n.renderTheElement)('h1', e, {
                        classList: [o + 'txt'],
                    }),
                    i = t.title
                return (
                    'string' == typeof i
                        ? (s.innerHTML = i)
                        : console.log('Заголовок окна не передан!'),
                    i
                )
            },
            button: function (e, t = { buttonName: 'Стандартная кнопка' }) {
                const n = new (0,
                    window.app.components.dev.forListFilling.ofComponentBlocks)(
                        'modal'
                    ),
                    o = n.cssPrefixMaking('button'),
                    s = (0, n.renderTheElement)('button', e, {
                        classList: [o + 'button'],
                    }),
                    i = t.buttonName
                return (
                    'string' == typeof i
                        ? (s.innerHTML = i)
                        : console.log('Название кнопки не передано!'),
                    s
                )
            },
        }
    let R = {
        box: t.querySelector('.modalBox'),
        display: t.querySelector('.modalDisplay'),
        coverLayer: t.querySelector('.modalCoverLayer'),
    }
    R.box || (R = new K('modal'))
    const G = {
            list: V,
            open: function (e) {
                const t = window.app,
                    n = t.data,
                    o = t.components,
                    s = o.modals.template.box,
                    i = o.modals.template.display,
                    a = o.modals.template.cover,
                    l = o.modals.list[e],
                    c = o.blockVisibility.Off,
                    r = o.transitions.modalAnimationTime,
                    d = o.dev.makeDelay,
                    p = o.transitions.modalClosingTime,
                    m = o.transitions.modalOpeningTime,
                    f = o.transitions.delayBetweenTransitions
                if (!Boolean(l)) {
                    const t = `Окна «${e}» в window.app.components.modals.list нет`
                    return void console.log('❗', t)
                }
                if (n.state.isModalTransitionInProgress) {
                    const t = `Открыть окно «${e}» сейчас нельзя:\n переход уже запущен`
                    return void console.log('❗', t)
                }
                const u = o.modals.close
                let g = 0
                const b = n.state.modal
                Boolean(b) && (g += p + f),
                    u(),
                    d(g, () => {
                        ;(n.state.isModalTransitionInProgress = !0),
                            (a.style.display = 'block')
                        const t = `··············· Окно «${e}» ···············`
                        console.log('\n', t, '\n\n')
                        const o = `${e} (modal)`
                        ;(n.state.globalState = o),
                            n.state.globalStateNumber++,
                            (n.state.modal = e),
                            n.state.modalNumber++,
                            l(s),
                            c(i, r),
                            d(m, () => {
                                ;(n.state.isModalTransitionInProgress = !1),
                                    a.style.removeProperty('display')
                            })
                    })
            },
            close: function () {
                const e = window.app,
                    t = e.data,
                    n = e.components,
                    o = n.modals.template.box,
                    s = n.modals.template.display,
                    i = n.modals.template.cover,
                    a = n.blockVisibility.On,
                    l = n.transitions.modalAnimationTime,
                    c = n.dev.makeDelay,
                    r = n.transitions.modalClosingTime
                i.style.display = 'block'
                const d = t.state.modal
                if (Boolean(d))
                    if (t.state.isModalTransitionInProgress) {
                        const e = `Закрыть окно «${d}» сейчас нельзя:\n переход уже запущен`
                        console.log('❗', e)
                    } else
                        (t.state.isModalTransitionInProgress = !0),
                            (i.style.display = 'block'),
                            a(s, l),
                            c(r, () => {
                                ;(o.innerHTML = ''),
                                    (o.classList = o.classList[0]),
                                    (t.state.globalState = null),
                                    t.state.globalStateNumber++,
                                    (t.state.modal = null)
                                const e = `Модальное окно «${d}» закрыто    ·······················`
                                console.log('\n', e, '\n\n'),
                                    console.log('\n\n\n'),
                                    (t.state.isModalTransitionInProgress = !1),
                                    i.style.removeProperty('display')
                            })
            },
            blocks: {
                list: z,
                render: function (
                    e,
                    t = window.app.components.modals.template.box,
                    n = {}
                ) {
                    const o = window.app.components.modals.blocks
                    if (void 0 === o.list[e]) {
                        const t = `Блока ${e} в components.modals.blocks.list нет`
                        return void console.log('❗', t)
                    }
                    if (null === t) {
                        const t = `В body нет поля (контейнера), введенного для ${e}`
                        return void console.log('❗', t)
                    }
                    const s = o.list[e](t, n)
                    if (void 0 !== s) return s
                },
            },
            template: R,
        },
        W = {
            screens: U,
            modals: G,
            blockVisibility: {
                On: function (e, t) {
                    const n = window.app.components.dev.makeDelay,
                        o =
                            window.app.components.transitions
                                .delayBeforeComponentHiding
                    ;(window.app.data.state.isAnimationInProgress = !0),
                        n(o, () => {
                            const o = t - 0.1,
                                s = o
                            ;(e.style.transition = `all ${s}s`),
                                n(0.1, () => {
                                    ;(e.style.opacity = '0'),
                                        n(o, () => {
                                            e.style.removeProperty(
                                                'transition'
                                            ),
                                                (e.style.display = 'none'),
                                                (window.app.data.state.isAnimationInProgress =
                                                    !1)
                                        })
                                })
                        })
                },
                Off: function (e, t) {
                    const n = window.app.components.dev.makeDelay,
                        o =
                            window.app.components.transitions
                                .delayBeforeComponentShowing
                    ;(window.app.data.state.isAnimationInProgress = !0),
                        n(o, () => {
                            const o = t - 0.1,
                                s = o
                            ;(e.style.transition = `all ${s}s`),
                                e.style.removeProperty('display'),
                                n(0.1, () => {
                                    e.style.removeProperty('opacity'),
                                        n(o, () => {
                                            e.style.removeProperty(
                                                'transition'
                                            ),
                                                (window.app.data.state.isAnimationInProgress =
                                                    !1)
                                        })
                                })
                        })
                },
            },
            transitions: {
                delayBetweenTransitions: 0.05,
                delayBeforeComponentHiding: 0.4,
                delayBeforeComponentShowing: 0,
                screenAnimationTime: 0.6,
                screenOpeningTime: 0,
                screenClosingTime: 0,
                modalAnimationTime: 0.6,
                modalOpeningTime: 0,
                modalClosingTime: 0,
                preSetting() {
                    const e = window.app.components.transitions
                    ;(window.app.components.transitions.screenOpeningTime =
                        e.screenAnimationTime + e.delayBeforeComponentShowing),
                        (window.app.components.transitions.screenClosingTime =
                            e.screenAnimationTime +
                            e.delayBeforeComponentHiding),
                        (window.app.components.transitions.modalOpeningTime =
                            e.modalAnimationTime +
                            e.delayBeforeComponentShowing),
                        (window.app.components.transitions.modalClosingTime =
                            e.modalAnimationTime + e.delayBeforeComponentHiding)
                },
            },
            dev: {
                makeDelay: function (e, t) {
                    setTimeout(t, 1e3 * e)
                },
                forListFilling: {
                    ofComponents: class {
                        constructor(e, t = '') {
                            const n = window.app.components
                            Boolean(t) || (t = `${e}s`),
                                (this.list = new Object()),
                                (this.listUploadToAppObj = function () {
                                    window.app.components[t].list = this.list
                                }),
                                (this.template = {}),
                                (this.template.box = n[t].template.box),
                                (this.renderTheBlock = n[t].blocks.render),
                                (this.renderTheElement = function (
                                    e,
                                    t,
                                    n = { id: '', classList: [] }
                                ) {
                                    const o = document.createElement(e)
                                    if (
                                        (t.appendChild(o),
                                        n.id && (o.id = n.id),
                                        n.classList && n.classList.length > 0)
                                    )
                                        for (const e of n.classList)
                                            o.classList.add(e)
                                    return o
                                }),
                                (this.cssPrefixOfComponent = e),
                                (this.cssPrefixMaking = function (
                                    o = `${e}Name`
                                ) {
                                    const s = `${e}_${o}`,
                                        i = `${s}_`
                                    return n[t].template.box.classList.add(s), i
                                })
                        }
                    },
                    ofComponentBlocks: class {
                        constructor(e, t = '') {
                            const n = window.app.components
                            Boolean(t) || (t = `${e}s`),
                                (this.list = new Object()),
                                (this.listUploadToAppObj = function () {
                                    window.app.components[t].blocks.list =
                                        this.list
                                }),
                                (this.renderTheElement = function (
                                    e,
                                    t,
                                    n = { id: '', classList: [] }
                                ) {
                                    const o = document.createElement(e)
                                    if (
                                        (t.appendChild(o),
                                        n.id && (o.id = n.id),
                                        n.classList && n.classList.length > 0)
                                    )
                                        for (const e of n.classList)
                                            o.classList.add(e)
                                    return o
                                }),
                                (this.cssPrefixOfBlock = e + 'Block'),
                                (this.cssPrefixMaking = function (
                                    o = `${e}BlockName`
                                ) {
                                    const s = `${e}Block_${o}`,
                                        i = `${s}_`
                                    return n[t].template.box.classList.add(s), i
                                })
                        }
                    },
                },
            },
        },
        X = {
            launch: function () {
                console.log('\n', 'ЗАПУСК ПРИЛОЖЕНИЯ', '\n\n')
                const e = window.app.components.transitions.preSetting
                !(function () {
                    let e = new String()
                    ;(e +=
                        'Для получения текущей информации об игре, нажмите «z»/«я» \n'),
                        console.log('\n', e, '\n'),
                        document.addEventListener('keydown', function (e) {
                            const t = window.app.data.getInfo
                            ;['z', 'я'].includes(e.key) && t()
                        })
                })(),
                    e(),
                    setTimeout(function () {
                        ;(0,
                        window.app.components.modals
                            .open)('difficulty selection')
                    }, 0.5)
            },
            data: n,
            components: W,
            domainData: {
                dataRequest: function () {},
                httpRequest: function () {},
            },
            timers: {
                list: [],
                start(e, t, n, o) {
                    let s = setInterval(() => {
                        t(n, o)
                    }, 1e3 * e)
                    return window.app.timers.list.push(s), s
                },
                stop(e) {
                    clearInterval(e)
                    const t = window.app.timers,
                        n = t.list.indexOf(e)
                    t.list.splice(n, 1)
                },
                stopAll() {
                    window.app.timers.list.forEach((e) => clearInterval(e)),
                        (window.app.timers.list = [])
                },
            },
            timeouts: {
                list: [],
                start(e, t, n, o) {
                    let s = setTimeout(() => {
                        t(n, o)
                    }, 1e3 * e)
                    return window.app.timeouts.list.push(s), s
                },
                stop(e) {
                    clearTimeout(e)
                    const t = window.app.timeouts,
                        n = t.list.indexOf(e)
                    t.list.splice(n, 1)
                },
                stopAll() {
                    window.app.timeouts.list.forEach((e) => clearTimeout(e)),
                        (window.app.timeouts.list = [])
                },
            },
            selectors: {
                container: t,
                tabTitle: document.head.querySelector('title'),
            },
        }
    ;(window.app = X),
        document.addEventListener('DOMContentLoaded', window.app.launch)
})()
