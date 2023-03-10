import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor {

let owner : Principal = Principal.fromText("fxmz7-ofvtd-vtacc-d6u6z-hhudm-ubfnf-4advo-wtky4-qymbo-rx4zp-iae");
let totalSupply : Nat = 100000000000000;
let symbol = "DOU";

private stable var balanceEntries: [(Principal, Nat)] = [];
private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

if (balances.size() <= 0) {
    balances.put(owner, totalSupply);
};

public query func balanceOf(who: Principal) : async Nat {

    let balance : Nat = switch (balances.get(who)) {
        case null 0;
        case (?result) result;
    };

    return balance;

};

public query func getSymbol() : async Text {
    return symbol;
};

public shared(msg) func payOut() : async Text {
    if (balances.get(msg.caller) == null) {
        let amount = 10000;
        let result = await transfer(msg.caller, amount);
        return result;
    } else {
        return "Already Claimed";
    }
};

public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
    
    // Taking users balance to check if he have enought amount to send

    let fromBalance = await balanceOf(msg.caller);
    if (fromBalance >= amount) {

        // Subtracting balance from sender's account

        let newFromBalance : Nat = fromBalance - amount;
        balances.put(msg.caller, newFromBalance);

        // Adding new balance to reciever's account

        let toBalance = await balanceOf(to);
        let newToBalance = toBalance + amount;
        balances.put(to, newToBalance);

        return "Success";
    } else {
        return "Insufficent Funds";
    }
};

system func preupgrade() {
    balanceEntries := Iter.toArray(balances.entries());
};

system func postupgrade() {
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() <= 0) {
        balances.put(owner, totalSupply);
    }
};

};