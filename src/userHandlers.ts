import { readUsers, writeUsers } from "./fileOperations";

export async function handleAddUser(args: string): Promise<void> {
  const argsArray = args.trim().split(/\s+/);
  if (argsArray.length !== 3) {
    console.log("Invalid format. Use: Adding <userId> <username> <userpassword>");
    return;
  }

  const [userId, username, userpassword] = argsArray;
  const users = await readUsers();
  if (users.find((u: any) => u.userId === userId)) {
    console.log("User ID already exists.");
  } else {
    users.push({ userId, username, userpassword });
    await writeUsers(users);
    console.log("User added successfully.");
  }
}

export async function handleDeleteUser(args: string): Promise<void> {
  const [userId] = args.trim().split(" ");
  if (!userId) {
    console.log("Invalid format. Use: Deleting <userId>");
    return;
  }

  const users = await readUsers();
  const userIndex = users.findIndex((u: any) => u.userId === userId);
  if (userIndex === -1) {
    console.log("User not found.");
  } else {
    users.splice(userIndex, 1);
    await writeUsers(users);
    console.log("User deleted successfully.");
  }
}

export async function handleUpdateUser(args: string): Promise<void> {
  const [userId, newUsername, newPassword] = args.trim().split(" ");
  if (!userId || !newUsername || !newPassword) {
    console.log("Invalid format. Use: Updating <userId> <newUsername> <newPassword>");
    return;
  }

  const users = await readUsers();
  const user = users.find((u: any) => u.userId === userId);
  if (!user) {
    console.log("User not found.");
  } else {
    user.username = newUsername;
    user.userpassword = newPassword;
    await writeUsers(users);
    console.log("User updated successfully.");
  }
}
