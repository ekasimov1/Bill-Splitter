import { useEffect, useState } from "react";
import TipButton from "./TipButton";

const tips = [
  { id: 1, number: 15 },
  { id: 2, number: 18 },
  { id: 3, number: 20 },
  { id: 4, number: 25 },
  { id: 5, number: 30 },
];

export default function Splitter() {
  const [buttonStates, setButtonStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [billAmount, setBillAmount] = useState("");
  const [numberPeople, setNumberPeople] = useState("");
  const [tipAmountPerson, setTipAmountPerson] = useState(0);
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState("");
  const [totalAmountPerson, setTotalAmountPerson] = useState(0);

  const handleReset = () => {
    setButtonStates([false, false, false, false, false]);
    setBillAmount("");
    setNumberPeople("");
    setTipAmountPerson("0.00");
    setCustomTip("");
    setTip(0);
    setTotalAmountPerson("0.00");
  };

  useEffect(() => {
    if (numberPeople !== "0") {
      setTotalAmountPerson(
        numberPeople !== ""
          ? ((billAmount * (tip + 1)) / numberPeople).toFixed(2)
          : "0.00"
      );
    }
  }, [billAmount, numberPeople, tip]);

  useEffect(() => {
    if (numberPeople !== "0") {
      setTipAmountPerson(
        numberPeople !== ""
          ? ((billAmount * tip) / numberPeople).toFixed(2)
          : "0.00"
      );
    }
  }, [billAmount, numberPeople, tip]);

  const handleBillAmount = (e) => {
    e.preventDefault();
    setBillAmount(e.target.value);
  };

  const handleNUmberPeople = (e) => {
    setNumberPeople(e.target.value);
  };

  const handleCustomTip = (e) => {
    setCustomTip(e.target.value);
    setTip(e.target.value / 100);
  };

  return (
    <div className="splitter-container">
      <div className="splitter-item">
        <div className="splitter-item-left">
          <form
            className="input-container"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="label">Bill</label>
            <input
              className="input-field"
              type="text"
              inputMode="decimal"
              id="billAmount"
              autoComplete="off"
              onChange={handleBillAmount}
              value={billAmount}
              placeholder="0"
              maxLength="7"
              onInput={(e) =>
                (e.target.value = e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*)\./g, "$1"))
              }
            />
            <img className="dollar-icon" src="/images/icon-dollar.svg" />
          </form>
          <div className="tips">Select Tip %</div>
          <div className="tips-button-container">
            {tips.map((item) => (
              <TipButton
                key={item.id}
                button={item.number}
                id={item.id}
                number={item.number}
                tips={tips}
                tip={tip}
                setTip={setTip}
                buttonStates={buttonStates}
                setButtonStates={setButtonStates}
                setCustomTip={setCustomTip}
              />
            ))}
            <input
              className={
                customTip !== "" ? "tip-input tip-input-active" : "tip-input"
              }
              placeholder="Custom"
              type="text"
              inputMode="decimal"
              maxLength="3"
              autoComplete="off"
              value={customTip}
              onFocus={() => {
                setButtonStates([false, false, false, false, false]);
                setTip(0);
              }}
              onChange={handleCustomTip}
              onInput={(e) =>
                (e.target.value = e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*)\./g, "$1"))
              }
            />
          </div>
          <div className="number-of-people">
            <form
              className="input-container"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="labels">
                <label className="label">Number of People</label>
                {numberPeople === "0" ? (
                  <label className="red-label">Can't be zero</label>
                ) : null}
              </div>
              <input
                className={
                  numberPeople === "0" ? "input-field-red" : "input-field"
                }
                type="text"
                inputMode="numeric"
                maxLength="3"
                placeholder="0"
                onChange={handleNUmberPeople}
                value={numberPeople}
                autoComplete="off"
                onInput={(e) =>
                  (e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1"))
                }
              />
              <img className="person-icon" src="/images/icon-person.svg" />
            </form>
          </div>
        </div>
      </div>
      {/* Left side of App */}
      <div className="splitter-item right">
        <div className="top-right-container">
          <div className="left-of-right">
            <div className="tip-amount-total-title">Tip Amount</div>
            <div>/ person</div>
          </div>
          <div className="tip-amount-total">${tipAmountPerson}</div>
        </div>
        <div className="top-right-container">
          <div className="left-of-right">
            <div className="tip-amount-total-title">Total</div>
            <div>/ person</div>
          </div>
          <div className="tip-amount-total">${totalAmountPerson}</div>
        </div>
        <div className="top-right-container">
          <button
            className={
              billAmount == "" &&
              numberPeople == "" &&
              JSON.stringify(buttonStates) ==
                JSON.stringify([false, false, false, false, false]) &&
              customTip == ""
                ? "reset-button disabled"
                : "reset-button"
            }
            onClick={handleReset}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
