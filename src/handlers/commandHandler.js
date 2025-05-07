const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const commandsPath = path.join(__dirname, "..", "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Vérification que la commande a les propriétés requises
    if ("name" in command && "execute" in command) {
      client.commands.set(command.name, command);
      console.log(`✅ Commande chargée: ${command.name}`);
    } else {
      console.log(
        `⚠️ La commande dans ${file} n'a pas les propriétés requises.`
      );
    }
  }
};
