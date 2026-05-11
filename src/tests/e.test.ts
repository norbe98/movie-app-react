import { describe, test, expect } from "vitest"
import { getPosterUrl, getRandomPage } from "../utils/helper"

describe("getPosterUrl", () => {
    test("build url with valid poster_path", () => {
        expect(getPosterUrl("abc123.jpg")).toBe("https://image.tmdb.org/t/p/w500/abc123.jpg")
    })

    test("return null if there is no poster_path", () => {
        expect(getPosterUrl(null)).toBe(null)
        expect(getPosterUrl(undefined)).toBe(null)
        expect(getPosterUrl("")).toBe(null)
    })
})

describe("getRandomPage", () => {
    test("return a random page number between 1 and 20", () => {
        const page = getRandomPage()
        expect(page).toBeGreaterThanOrEqual(1)
        expect(page).toBeLessThanOrEqual(20)
    })

    test("return a random page number between 1 and the specified maxPages", () => {
        const maxPages = 10
        const page = getRandomPage(maxPages)
        expect(page).toBeGreaterThanOrEqual(1)
        expect(page).toBeLessThanOrEqual(maxPages)
    })
})
