"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAddUser = handleAddUser;
exports.handleDeleteUser = handleDeleteUser;
exports.handleUpdateUser = handleUpdateUser;
const fileOperations_1 = require("./fileOperations");
async function handleAddUser(args) {
    const argsArray = args.trim().split(/\s+/);
    if (argsArray.length !== 3) {
        console.log("Invalid format. Use: Add <userId> <username> <userpassword>");
        return;
    }
    const [userId, username, userpassword] = argsArray;
    const users = await (0, fileOperations_1.readUsers)();
    if (users.find((u) => u.userId === userId)) {
        console.log("User ID already exists.");
    }
    else {
        users.push({ userId, username, userpassword });
        await (0, fileOperations_1.writeUsers)(users);
        console.log("User added successfully.");
    }
}
async function handleDeleteUser(args) {
    const [userId] = args.trim().split(" ");
    if (!userId) {
        console.log("Invalid format. Use: Delete <userId>");
        return;
    }
    const users = await (0, fileOperations_1.readUsers)();
    const userIndex = users.findIndex((u) => u.userId === userId);
    if (userIndex === -1) {
        console.log("User not found.");
    }
    else {
        users.splice(userIndex, 1);
        await (0, fileOperations_1.writeUsers)(users);
        console.log("User deleted successfully.");
    }
}
async function handleUpdateUser(args) {
    const [userId, newUsername, newPassword] = args.trim().split(" ");
    if (!userId || !newUsername || !newPassword) {
        console.log("Invalid format. Use: Update <userId> <newUsername> <newPassword>");
        return;
    }
    const users = await (0, fileOperations_1.readUsers)();
    const user = users.find((u) => u.userId === userId);
    if (!user) {
        console.log("User not found.");
    }
    else {
        user.username = newUsername;
        user.userpassword = newPassword;
        await (0, fileOperations_1.writeUsers)(users);
        console.log("User updated successfully.");
    }
}
//# sourceMappingURL=userHandlers.js.map