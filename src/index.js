require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const commandHandler = require("./handlers/commandHandler");
const reminderTask = require("./tasks/reminderTask");

// Création du client Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Collection pour stocker les commandes
client.commands = new Collection();

// Chargement des commandes
commandHandler(client);

// Événement quand le bot est prêt
client.once("ready", () => {
  console.log(`Bot connecté en tant que ${client.user.tag}!`);
  // Initialiser la tâche de rappel
  reminderTask(client);
});

// Gestion des messages
client.on("messageCreate", async (message) => {
  // Ignorer les messages des bots
  if (message.author.bot) return;

  // Préfixe pour les commandes
  const prefix = "!";

  // Vérifier si le message commence par le préfixe
  if (!message.content.startsWith(prefix)) return;

  // Séparer la commande et les arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Vérifier si la commande existe
  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    // Exécuter la commande
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(
      "Une erreur est survenue lors de l'exécution de la commande !"
    );
  }
});

// Gestion des erreurs
client.on("error", (error) => {
  console.error("Une erreur est survenue:", error);
});

// Connexion du bot avec le token
client.login(process.env.DISCORD_TOKEN);
