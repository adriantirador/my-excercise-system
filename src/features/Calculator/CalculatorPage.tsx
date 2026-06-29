"use client";

import { useState, useEffect } from "react";
import styles from "./CalculatorPage.module.scss";

type Operator = "+" | "-" | "*" | "/";

const calculate = (left: number, right: number, operator: Operator) => {
  if (operator === "+") return left + right;
  if (operator === "-") return left - right;
  if (operator === "*") return left * right;
  if (operator === "/") return right === 0 ? 0 : left / right;

  return right;
};

export default function CalculatorPage() {
  const [displayValue, setDisplayValue] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
      return;
    }

    setDisplayValue((current) => (current === "0" ? digit : `${current}${digit}`));
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue("0.");
      setWaitingForOperand(false);
      return;
    }

    setDisplayValue((current) => (current.includes(".") ? current : `${current}.`));
  };

  const handleOperator = (nextOperator: Operator) => {
    const inputValue = Number(displayValue);

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (operator) {
      const result = calculate(storedValue, inputValue, operator);
      setStoredValue(result);
      setDisplayValue(String(Number(result.toFixed(8))));
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const handleEquals = () => {

    if (displayValue === "143") {
      setDisplayValue("Need mo nang tanggapin na hindi ka niya mahal 😢😢😢");
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(true);

      return;
    }

    if (operator === null || storedValue === null) return;
    const result = calculate(storedValue, Number(displayValue), operator);
    setDisplayValue(String(Number(result.toFixed(8))));
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    if (displayValue === "143") {
      setDisplayValue("Hanggang ngayon, wala pa rin siyang pakialam sa'yo 😭😭😭");
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      return
    }
    
    setDisplayValue("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        setDisplayValue((prev) => prev + e.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className={styles.calculatorPage} aria-label="Calculator page">
      <section className={styles.calculatorPanel} aria-label="Calculator">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Calculator</p>
          <h2>Quick math</h2>
        </div>

        <output className={styles.calculatorDisplay} aria-live="polite">
          {displayValue}
        </output>

        <div className={styles.calculatorKeys}>
          <button type="button" className={styles.utilityKey} onClick={handleClear}>
            AC
          </button>
          <button
            type="button"
            className={styles.utilityKey}
            onClick={() => setDisplayValue((current) => String(Number(current) * -1))}
          >
            +/-
          </button>
          <button
            type="button"
            className={styles.utilityKey}
            onClick={() => setDisplayValue((current) => String(Number(current) / 100))}
          >
            %
          </button>
          <button
            type="button"
            className={styles.operatorKey}
            onClick={() => handleOperator("/")}
          >
            /
          </button>

          {["7", "8", "9"].map((digit) => (
            <button
              key={digit}
              type="button"
              className={styles.key}
              onClick={() => handleDigit(digit)}
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            className={styles.operatorKey}
            onClick={() => handleOperator("*")}
          >
            x
          </button>

          {["4", "5", "6"].map((digit) => (
            <button
              key={digit}
              type="button"
              className={styles.key}
              onClick={() => handleDigit(digit)}
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            className={styles.operatorKey}
            onClick={() => handleOperator("-")}
          >
            -
          </button>

          {["1", "2", "3"].map((digit) => (
            <button
              key={digit}
              type="button"
              className={styles.key}
              onClick={() => handleDigit(digit)}
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            className={styles.operatorKey}
            onClick={() => handleOperator("+")}
          >
            +
          </button>

          <button
            type="button"
            className={styles.zeroKey}
            onClick={() => handleDigit("0")}
          >
            0
          </button>
          <button type="button" className={styles.key} onClick={handleDecimal}>
            .
          </button>
          <button type="button" className={styles.equalsKey} onClick={handleEquals}>
            =
          </button>
        </div>
      </section>
    </section>
  );
}
