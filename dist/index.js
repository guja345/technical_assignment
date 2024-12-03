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
const fs = __importStar(require("fs/promises"));
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function prompt(question) {
    return new Promise((resolve) => rl.question(question, (answer) => {
        resolve(answer);
    }));
}
async function readUsers() {
    try {
        const data = await fs.readFile("users.json", "utf-8");
        return JSON.parse(data);
    }
    catch (err) {
        if (err.code === "ENOENT") {
            console.log("Initializing empty users.json file.");
            await writeUsers([]);
            return [];
        }
        else {
            console.error("Error reading users.json: ", err.message);
            return [];
        }
    }
}
async function writeUsers(users) {
    await fs.writeFile("users.json", JSON.stringify(users, null, 2));
}
async function main() {
    await clearUsersFile();
    let command;
    do {
        command = await prompt("Please enter a command:\n");
        const [action, ...args] = command.trim().split(/\s+/);
        switch (action) {
            case "Adding":
                await handleAddUser(args.join(" "));
                break;
            case "Deleting":
                await handleDeleteUser(args.join(" "));
                break;
            case "Updating":
                await handleUpdateUser(args.join(" "));
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
async function handleAddUser(args) {
    const argsArray = args.trim().split(/\s+/);
    if (argsArray.length !== 3) {
        console.log("Invalid format. Use: Adding <userId> <username> <userpassword>");
        return;
    }
    const [userId, username, userpassword] = argsArray;
    const users = await readUsers();
    if (users.find((u) => u.userId === userId)) {
        console.log("User ID already exists.");
    }
    else {
        users.push({ userId, username, userpassword });
        await writeUsers(users);
        console.log("User added successfully.");
    }
}
async function handleDeleteUser(args) {
    const [userId] = args.trim().split(" ");
    if (userId.length != 1) {
        console.log("Invalid format. Use: Deleting <userId>");
        return;
    }
    const users = await readUsers();
    const userIndex = users.findIndex((u) => u.userId === userId);
    if (userIndex === -1) {
        console.log("User not found.");
    }
    else {
        users.splice(userIndex, 1);
        await writeUsers(users);
        console.log("User deleted successfully.");
    }
}
async function handleUpdateUser(args) {
    const [userId, newUsername, newPassword] = args.trim().split(" ");
    if (!userId || !newUsername || !newPassword) {
        console.log("Invalid format. Use: Updating <userId> <newUsername> <newPassword>");
        return;
    }
    const users = await readUsers();
    const user = users.find((u) => u.userId === userId);
    if (!user) {
        console.log("User not found.");
    }
    else {
        user.username = newUsername;
        user.userpassword = newPassword;
        await writeUsers(users);
        console.log("User updated successfully.");
    }
}
async function clearUsersFile() {
    try {
        await fs.writeFile("users.json", "[]");
    }
    catch (err) {
        console.error("Error clearing users.json:", err.message);
    }
}
main();
//# sourceMappingURL=index.js.map