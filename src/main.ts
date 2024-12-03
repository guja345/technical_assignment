import { Command } from "./commands";
import { handleAddUser, handleDeleteUser, handleUpdateUser } from "./userHandlers";
import { clearUsersFile } from "./fileOperations";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
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

main();
