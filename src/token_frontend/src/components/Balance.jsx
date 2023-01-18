import React from "react";
import { Principal } from "@dfinity/principal";
import { token_backend } from "../../../declarations/token_backend";

function Balance() {
  
  const [inputValue, setInput] = React.useState("");
  const [balanceResult, setBalance] = React.useState("");
  const [cryptoSymbol, setSymbol] = React.useState("");
  const [isHidden, setHidden] = React.useState(true);

  async function handleClick() {
    setHidden(true);
    const principal = Principal.fromText(inputValue);
    const balance = await token_backend.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setSymbol(await token_backend.getSymbol());
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {cryptoSymbol}.</p>
    </div>
  );
}

export default Balance;
