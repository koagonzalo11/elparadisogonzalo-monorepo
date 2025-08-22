// src/events.ts
import { contract } from "./contracts";
contract.on("Transfer", (from, to, value) => {
    console.log(`Transfer detected: ${value} tokens from ${from} to ${to}`);
});
contract.on("Approval", (owner, spender, value) => {
    console.log(`Approval: ${owner} approved ${spender} for ${value}`);
});
//# sourceMappingURL=events.js.map