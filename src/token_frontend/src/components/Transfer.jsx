import React from "react";
import { Principal } from "@dfinity/principal";
import { AuthClient } from '@dfinity/auth-client';
import { canisterId, createActor } from "../../../declarations/token_backend";

function Transfer() {
  
  const [isStuck, setStuck] = React.useState(true)
  const [isDisabled, setDisabled] = React.useState(false);
  const [recipientId, setId] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [buttonText, setText] = React.useState("Transfer");

  async function handleClick() {
    setDisabled(true);
    
    setTimeout(function () {
      if(isStuck === true) {
        setText("Check Account ID");
        setDisabled(false);
      };
    }, 20000);

    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    let result = await authenticatedCanister.transfer(recipient, amountToTransfer);

    setTimeout(function () {
      setText("Transfer");
    }, 14000);

    if(result == "Success") {
      setText("Successfully Sent");
      setDisabled(false);
      setStuck(false);
    } else if (result == "Insufficent Funds") {
      setText("Insufficent Funds");
      setDisabled(false);
      setStuck(false);
    }

  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            {buttonText}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
