"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const userHandlers_1 = require("./userHandlers");
const fileOperations_1 = require("./fileOperations");
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function prompt(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}
async function main() {
    await (0, fileOperations_1.clearUsersFile)();
    let command;
    do {
        command = await prompt("Please enter a command:\n");
        const [action, ...args] = command.trim().split(/\s+/);
        switch (action) {
            case "Adding":
                await (0, userHandlers_1.handleAddUser)(args.join(" "));
                break;
            case "Deleting":
                await (0, userHandlers_1.handleDeleteUser)(args.join(" "));
                break;
            case "Updating":
                await (0, userHandlers_1.handleUpdateUser)(args.join(" "));
                break;
            case "Quit":
                console.log("Exiting program.");
                rl.close();
                break;
            default:
                console.log("Unknown command");
        }
    } while (command !== "Quit");
}
main();
//# sourceMappingURL=main.js.map