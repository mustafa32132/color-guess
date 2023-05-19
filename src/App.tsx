import { useEffect, useState } from "react"

const getRandomColorString = () => {
  const digits = "0123456789ABCDEF"
  let color = ""
  for (let i = 0; i < 6; i++) {
    color += digits[Math.floor(Math.random() * 16)]
  }
  return "#" + color
}

enum Result {
  Correct,
  Wrong,
}

function App() {
  const [color, setColor] = useState("")
  const [borderColor, setBorderColor] = useState("")
  const [answers, setAnswers] = useState<string[]>([])
  const [answersB, setAnswersB] = useState<string[]>([])
  const [result, setResult] = useState<Result | undefined>(undefined)
  const [resultBorder, setResultBorder] = useState<Result | undefined>(
    undefined
  )

  function getRandomColor() {
    const actualColor = getRandomColorString()
    const actualBorderColor = getRandomColorString()
    setColor(actualColor)
    setBorderColor(actualBorderColor)
    setAnswers(
      [actualColor, getRandomColorString(), getRandomColorString()].sort(
        () => Math.random() - 0.5
      )
    )
    setAnswersB(
      [actualBorderColor, getRandomColorString(), getRandomColorString()].sort(
        () => Math.random() - 0.5
      )
    )
  }

  useEffect(() => {
    getRandomColor()
  }, [])

  function handelAnswerClicked(answer: string) {
    if (answer === color) {
      // guessed correctly
      setResult(Result.Correct)
    } else {
      // guessed wrong
      setResult(Result.Wrong)
    }
  }

  function handelAnswerBorderClicked(answerB: string) {
    if (answerB === borderColor) {
      // guessed correctly
      setResultBorder(Result.Correct)
      getRandomColor()
    } else {
      // guessed wrong
      setResultBorder(Result.Wrong)
    }
  }

  return (
    <>
      <div
        id="App"
        className=" flex place-content-center h-screen gap-4 mt-20 mb-4"
      >
        <div className="flex flex-col gap-4">
          <div
            id="guess-me"
            className="w-[200px] h-[200px]"
            style={{
              background: color,
              border: `12px solid ${borderColor || "black"}`,
            }}
          ></div>
          <div className="pb-3 mb-3">
            <div className="mb-2 p-2">
              Backgrund Color <br />
              {answers.map((answer) => (
                <button
                  onClick={() => handelAnswerClicked(answer)}
                  key={answer}
                  className="border-solid border-black border-2 mr-2"
                >
                  {answer}
                </button>
              ))}
              {result === Result.Wrong && (
                <div className=" text-red-700">Wrong Answer</div>
              )}
              {result === Result.Correct && (
                <div className=" text-green-700">Correct Answer!</div>
              )}
            </div>
            <div className=" p-2">
              Border Color <br />
              {answersB.map((answerB) => (
                <button
                  onClick={() => handelAnswerBorderClicked(answerB)}
                  key={answerB}
                  className="border-solid border-black border-2 mr-2"
                >
                  {answerB}
                </button>
              ))}
              {resultBorder === Result.Wrong && (
                <div className=" text-red-700">Wrong Answer</div>
              )}
              {resultBorder === Result.Correct && (
                <div className=" text-green-700">Correct Answer!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
