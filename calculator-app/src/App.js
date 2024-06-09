import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [expression, setExpression] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const [output, setOutput] = useState(null);

  const handleButtonClick = (value) => {
    switch (value) {
      case "C":
        setExpression([]);
        setOutput(null);
        break;

      case "=":
        evaluateExpression();
        break;

      default:
        if (
          (expression.length === 0 &&
            typeof value === "string" &&
            (value === "*" || value === "/")) ||
          (expression.length === 1 &&
            typeof value === "string" &&
            (value === "*" || value === "/") &&
            typeof expression[0] === "string")
        )
          return;
        setExpression((prev) => {
          const lastValue = prev[prev.length - 1];
          const updatedExpression = [...prev];

          if (typeof value === "string" && typeof lastValue === "string") {
            updatedExpression.splice(updatedExpression.length - 1, 1, value);
            return [...updatedExpression];
          }
          if (typeof value === "number" && typeof lastValue === "number") {
            updatedExpression.splice(
              updatedExpression.length - 1,
              1,
              lastValue * 10 + value
            );
            return [...updatedExpression];
          }
          return [...updatedExpression, value];
        });
        break;
    }
  };

  const evaluateExpression = () => {
    if (expression.length < 3) {
      setOutput("Error");
      return;
    }
    const expressionArr = [...expression];
    if (expressionArr[0] === "-") {
      expressionArr.shift();
      expressionArr[0] = -1 * expressionArr[0];
    }
    if (typeof expressionArr[expressionArr.length - 1] === "string")
      expressionArr.pop();
    if (typeof expressionArr[0] === "string") expressionArr.shift();

    expressionArr.forEach((item, index) => {
      if (item === "-" && index < expressionArr.length - 1) {
        expressionArr.splice(index, 1, "+");
        expressionArr.splice(index + 1, 1, -1 * expressionArr[index + 1]);
      }
    });

    "BODMAS".split("").forEach((factor) => {
      switch (factor) {
        case "D":
          for (let index = 0; index < expressionArr.length - 1; ) {
            const item = expressionArr[index];
            if (item === "/") {
              const left = expressionArr[index - 1];
              const right = expressionArr[index + 1];
              expressionArr.splice(index - 1, 3, left / right);
            } else index++;
          }
          break;
        case "M":
          for (let index = 0; index < expressionArr.length - 1; ) {
            const item = expressionArr[index];
            if (item === "*") {
              const left = expressionArr[index - 1];
              const right = expressionArr[index + 1];
              expressionArr.splice(index - 1, 3, left * right);
            } else index++;
          }
          break;
        case "A":
          for (let index = 0; index < expressionArr.length - 1; ) {
            const item = expressionArr[index];
            if (item === "+") {
              const left = expressionArr[index - 1];
              const right = expressionArr[index + 1];
              expressionArr.splice(index - 1, 3, left + right);
            } else index++;
          }
          break;
      }
    });
    setOutput(expressionArr[0]);
  };

  useEffect(() => {
    setDisplayText(() => expression.join(""));
  }, [expression]);

  return (
    <section className="container">
      <h1>React Calculator</h1>
      <input type="text" value={displayText} readOnly />
      {output !== undefined || output !== null ? <div>{output}</div> : null}
      <section className="buttons-grid">
        <button className="button" onClick={() => handleButtonClick(7)}>
          7
        </button>
        <button className="button" onClick={() => handleButtonClick(8)}>
          8
        </button>
        <button className="button" onClick={() => handleButtonClick(9)}>
          9
        </button>
        <button className="button" onClick={() => handleButtonClick("+")}>
          +
        </button>
        <button className="button" onClick={() => handleButtonClick(4)}>
          4
        </button>
        <button className="button" onClick={() => handleButtonClick(5)}>
          5
        </button>
        <button className="button" onClick={() => handleButtonClick(6)}>
          6
        </button>
        <button className="button" onClick={() => handleButtonClick("-")}>
          -
        </button>
        <button className="button" onClick={() => handleButtonClick(1)}>
          1
        </button>
        <button className="button" onClick={() => handleButtonClick(2)}>
          2
        </button>
        <button className="button" onClick={() => handleButtonClick(3)}>
          3
        </button>
        <button className="button" onClick={() => handleButtonClick("*")}>
          *
        </button>
        <button className="button" onClick={() => handleButtonClick("C")}>
          C
        </button>
        <button className="button" onClick={() => handleButtonClick(0)}>
          0
        </button>
        <button className="button" onClick={() => handleButtonClick("=")}>
          =
        </button>
        <button className="button" onClick={() => handleButtonClick("/")}>
          /
        </button>
      </section>
    </section>
  );
}

export default App;
