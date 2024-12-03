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
exports.readUsers = readUsers;
exports.writeUsers = writeUsers;
exports.clearUsersFile = clearUsersFile;
const fs = __importStar(require("fs/promises"));
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
        console.error("Error reading users.json:", err.message);
        return [];
    }
}
async function writeUsers(users) {
    await fs.writeFile("users.json", JSON.stringify(users, null, 2));
}
async function clearUsersFile() {
    try {
        await fs.writeFile("users.json", "[]");
    }
    catch (err) {
        console.error("Error clearing users.json:", err.message);
    }
}
//# sourceMappingURL=fileOperations.js.map