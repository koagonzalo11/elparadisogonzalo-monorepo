import { contract } from "./contracts";
// Listen for Transfer events
contract.on("Transfer", (from, to, value) => {
    console.log(`Transfer detected: ${value.toString()} tokens from ${from} to ${to}`);
});
// Listen for Approval events
contract.on("Approval", (owner, spender, value) => {
    console.log(`Approval: ${owner} approved ${spender} for ${value.toString()}`);
});
//# sourceMappingURL=events.js.map