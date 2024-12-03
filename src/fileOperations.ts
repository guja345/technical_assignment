import * as fs from "fs/promises";

export async function readUsers(): Promise<any[]> {
  try {
    const data = await fs.readFile("users.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("Initializing empty users.json file.");
      await writeUsers([]);
      return [];
    }
    console.error("Error reading users.json:", (err as Error).message);
    return [];
  }
}

export async function writeUsers(users: any[]): Promise<void> {
  await fs.writeFile("users.json", JSON.stringify(users, null, 2));
}

export async function clearUsersFile(): Promise<void> {
  try {
    await fs.writeFile("users.json", "[]");
  } catch (err) {
    console.error("Error clearing users.json:", (err as Error).message);
  }
}
