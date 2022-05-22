import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { questions } from '../util/questions'
const Home: NextPage = () => {
  // properties
  const [showFinalResults, setFinalResults] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  // Helper functions
  function roundUpNearest10(num: number) {
    return Math.round(num / 10) * 10
  }
  function optionClicked(points: number): void {
    console.log(score + points)
    setScore(score + points)
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setFinalResults(true)
    }
  }
  function getResults(points: number) {
    let roundedScore = roundUpNearest10(score)
    if (roundedScore === 0) {
      return <p>test</p>
    }
    if (roundedScore === 10) {
      return "D'Artagnan"
    }
    if (roundedScore === 20) {
      return 'Porthos'
    }
    if (roundedScore === 30) {
      return 'Aramis'
    }
    if (roundedScore === 40) {
      return 'Athos'
    }
  }
  function restartGame(): void {
    setFinalResults(false)
    setScore(0)
    setCurrentQuestion(0)
  }
  return (
    <div className="flex min-h-screen flex-col place-content-evenly  items-center bg-gradient-to-r from-primary to-secondary">
      {/* 1. Header */}
      <h1 className="w-2/3 text-center text-2xl font-extrabold text-light sm:text-3xl md:text-4xl lg:text-5xl">
        Nelja musketäri iseloomutest
      </h1>
      {showFinalResults ? (
        /* 3. Final results */
        <div className="shadow-black color-white h-auto w-1/2 rounded-2xl bg-primary p-16 text-center text-white opacity-75 shadow-2xl">
          <h2 className="text-3xl text-light">Sina oled:</h2>
          <h3 className="pb-12 pt-2 text-5xl font-extrabold text-white">
            {getResults(score)}
          </h3>
          <button
            onClick={() => restartGame()}
            className="text-1xl hover:border-1 rounded-md bg-light px-32 py-3 font-medium text-primary transition duration-300 hover:border-white hover:bg-secondary hover:text-light"
          >
            Alusta uuesti
          </button>
        </div>
      ) : (
        /* 3. Question card */
        <>
          <div className="w-2/3">
            <h2 className="hidden text-base text-white sm:block">
              Milline musketär oled sina? Vasta kõikidele küsimustele ja saa
              teada, kas sa oled nagu: Athos, kaitsja; Aramis, intellektuaal;
              Porthos, iludus; D'Artagnan, juht.
            </h2>
          </div>

          <div className="border-gray-200 shadow-black color-white flex h-auto w-5/6 flex-col rounded-2xl border bg-primary bg-opacity-60 bg-clip-padding p-6 text-center text-white opacity-75 shadow-2xl backdrop-blur-xl backdrop-filter sm:p-16">
            <h2 className="text-2xl">
              {currentQuestion + 1}/{questions.length} küsimus
            </h2>
            <h3 className="p-6 text-xl text-light sm:text-3xl">
              {questions[currentQuestion].text}
            </h3>

            <ul className="list-none text-lg">
              {questions[currentQuestion].options.map((option) => {
                return (
                  <li
                    onClick={() => optionClicked(option.points)}
                    key={option.id}
                    className="mt-2 rounded-xl border-4 border-white bg-secondary p-4"
                  >
                    {option.text}
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
export default Home
