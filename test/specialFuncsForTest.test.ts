import { it, expect, describe } from '@jest/globals'

import {
    twoCardsComparing,
    generateCardsByCardsQty,
} from '../lib/scripts/specialFuncsForTest'

describe('Test of twoCardsComparing()', () => {
    it('should return true because cards are same', () => {
        // Подготовка
        const card1 = '9_hearts'
        const card2 = '9_hearts'
        const expected = true

        // Действие
        const result = twoCardsComparing(card1, card2)

        // Сверка
        expect(result).toBe(expected)
    })

    it('should return false because cards are no same', () => {
        // Подготовка
        const card1 = '6_hearts'
        const card2 = 'Q_spades'
        const expected = false

        // Действие
        const result = twoCardsComparing(card1, card2)

        // Сверка
        expect(result).toBe(expected)
    })

    it('should return undefined because incorrect data was passed to the function', () => {
        // Подготовка
        const card1 = '6hearts'
        const card2 = 'Q_spades'
        const expected = undefined

        // Действие
        const result = twoCardsComparing(card1, card2)

        // Сверка
        expect(result).toBe(expected)
    })
})

describe('Test of generateCardsByCardsQty()', () => {
    it('should return array with 40 elements (20 card pairs) because 40 cards are requested', () => {
        // Подготовка
        const requestedCardsQty = 40
        const expected = 40

        // Действие
        const cardsList = generateCardsByCardsQty(requestedCardsQty)

        // Сверка
        expect(cardsList).toHaveLength(expected)
    })

    it('should return array with 72 elements (36 card pairs) because too much cards are requested', () => {
        // Подготовка
        const requestedCardsQty = 80
        const expected = 72

        // Действие
        const cardsList = generateCardsByCardsQty(requestedCardsQty)

        // Сверка
        expect(cardsList).toHaveLength(expected)
    })
})
