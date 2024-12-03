import { Command } from "./commands";
import * as fs from "fs/promises";
import * as readline from "readline";
import { json } from "stream/consumers";


const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

async function readUser() {
    try{
        const data = await fs.readFile("users.json", "utf-8");
        return JSON.parse(data);
    }catch(err){
        console.error("Error reading users.json: ", (err as Error).message);
        return [];
    }
}

async function writeUsers(users:any[]) {
    await fs.writeFile("users.json", JSON.stringify(users,null,2));
}

 function prompt(question:string): Promise<string>{
    return new Promise((resolve)=> rl.question(question, resolve));
 }

 (async function main() {
    let command:string;

    do{
        command=await prompt("Please enter a command:\n");
        const [_, action, ...args] = command.match(/^(\w+)(.*)$/) || [];

        switch(action){
            case Command.Add :
                //  Handle adding user logic
            break;
            case Command.Delete:
                // Handle deleting user logic
             break;
            case Command.Update:
                // Handle updating user logic
            break;
            case Command.Quit:
            console.log("Exiting program.");
            break;
            default:
            console.log("Unknown command");
        }

    }while(command !== Command.Quit){
        rl.close();
    }

 })
