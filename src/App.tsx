import { useEffect, useState } from "react"

function App() {
  const [color, setColor] = useState("")
  const [borderColor, setBorderColor] = useState("")
  const [answers, setAnswers] = useState<string[]>([])
  const [answersB, setAnswersB] = useState<string[]>([])
  const [isWrongSelection, setIsWrongSelection] = useState<boolean | undefined>(
    undefined
  )
  const [isWrongBorderSelection, setIsWrongBorderSelection] = useState<
    boolean | undefined
  >(undefined)

  const getRandomColor = () => {
    const digits = "0123456789ABCDEF"
    let color = ""
    for (let i = 0; i < 6; i++) {
      color += digits[Math.floor(Math.random() * 16)]
    }
    return "#" + color
  }

  useEffect(() => {
    // Generate random color
    const actualColor = getRandomColor()
    setColor(actualColor)
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => Math.random() - 0.5
      )
    )
  }, [])

  function handelAnswerClicked(answer: string) {
    if (answer === color) {
      // guessed correctly
      setIsWrongSelection(false)
    } else {
      // guessed wrong
      setIsWrongSelection(true)
    }
  }

  const getRandomBorderColor = () => {
    const digits = "0123456789ABCDEF"
    let borderColor = ""
    for (let i = 0; i < 6; i++) {
      borderColor += digits[Math.floor(Math.random() * 16)]
    }
    return "#" + borderColor
  }

  useEffect(() => {
    const actualBorderColor = getRandomBorderColor()
    setBorderColor(actualBorderColor)
    setAnswersB(
      [actualBorderColor, getRandomBorderColor(), getRandomBorderColor()].sort(
        () => Math.random() - 0.5
      )
    )
  }, [])

  function handelAnswerBorderClicked(answerB: string) {
    if (answerB === borderColor) {
      // guessed correctly
      setIsWrongBorderSelection(false)
    } else {
      // guessed wrong
      setIsWrongBorderSelection(true)
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
            style={{ background: color, border: "8px solid borderColor" }}
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
              {isWrongSelection && (
                <div className=" text-red-700">Wrong Answer</div>
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
              {isWrongBorderSelection && (
                <div className=" text-red-700">Wrong Answer</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
