import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

actor {

    var owner : Principal = Principal.fromText("fxmz7-ofvtd-vtacc-d6u6z-hhudm-ubfnf-4advo-wtky4-qymbo-rx4zp-iae");
    var totalSupply : Nat = 1000000000;
    var symbol = "DOU";

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    balances.put(owner, totalSupply);

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

}