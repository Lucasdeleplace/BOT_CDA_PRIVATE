const schedule = require("node-schedule");

const joursFeries = [
  "01-01", // Jour de l'an
  "05-01", // Fête du travail
  "05-08", // Victoire 1945
  "06-08", // Pont de l'Ascension
  "07-14", // Fête nationale
  "08-15", // Assomption
  "11-01", // Toussaint
  "11-11", // Armistice 1918
  "12-25", // Noël
];

function estJourFerie(date) {
  const dateStr = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
  return joursFeries.includes(dateStr);
}

module.exports = (client) => {
  schedule.scheduleJob("30 9 * * 1-5", async function () {
    try {
      if (estJourFerie(new Date())) {
        console.log("Jour férié détecté, pas de rappel envoyé");
        return;
      }

      client.guilds.cache.forEach((guild) => {
        const channel =
          guild.channels.cache.find(
            (channel) => channel.name === "signature" && channel.type === 0
          ) || guild.channels.cache.find((channel) => channel.type === 0);

        if (channel) {
          channel
            .send({
              content: "@everyone \n📝 N'oubliez pas de signer !",
            })
            .catch(console.error);
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du rappel:", error);
    }
  });

  console.log(
    "✅ Tâche de rappel configurée (lundi-vendredi à 9h30, hors jours fériés)"
  );
};
