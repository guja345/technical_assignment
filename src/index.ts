
import { Command } from "./commands";
import * as fs from "fs/promises";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      resolve(answer);
    })
  );
}

async function readUsers() {
  try {
    const data = await fs.readFile("users.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("Initializing empty users.json file.");
      await writeUsers([]); 
      return [];
    } else {
      console.error("Error reading users.json: ", (err as Error).message);
      return [];
    }
  }
}


async function writeUsers(users: any[]) {
  await fs.writeFile("users.json", JSON.stringify(users, null, 2));
}

  async function main() {
    await clearUsersFile();
    let command: string;

    do {
        command = await prompt("Please enter a command:\n");

        const [action, ...args] = command.trim().split(/\s+/);

        switch (action) {
            case Command.Add:
                await handleAddUser(args.join(" "));
                break;
            case Command.Delete:
                await handleDeleteUser(args.join(" "));
                break;
            case Command.Update:
                await handleUpdateUser(args.join(" "));
                break;
            case Command.Quit:
                console.log("Exiting program.");
                rl.close();
                break;
            default:
              console.log("Unknown command");
        }

    } while (command !== Command.Quit);
}



async function handleAddUser(args: string) {
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

async function handleDeleteUser(args: string) {
  const [userId] = args.trim().split(" ");
  if (userId.length!=1) {
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

async function handleUpdateUser(args: string) {
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

async function clearUsersFile() {
  try {
    await fs.writeFile("users.json", "[]");
  } catch (err) {
    console.error("Error clearing users.json:", (err as Error).message);
  }
}


// Start the main function
main();
