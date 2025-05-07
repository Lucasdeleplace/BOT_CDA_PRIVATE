module.exports = {
  name: "say",
  description: "Fait répéter un message au bot",
  execute(message, args) {
    // Vérifier si un message a été fourni
    if (!args.length) {
      return message.reply("Veuillez fournir un message à répéter !");
    }

    // Joindre tous les arguments pour former le message
    const content = args.join(" ");

    // Essayer de supprimer le message original
    message.delete().catch((error) => {
      console.log(
        "Impossible de supprimer le message original:",
        error.message
      );
      // On continue même si on ne peut pas supprimer le message
    });

    // Envoyer le message
    message.channel.send(content).catch((error) => {
      console.error("Erreur lors de l'envoi du message:", error);
      message.reply(
        "Je n'ai pas pu envoyer le message. Vérifiez mes permissions !"
      );
    });
  },
};
