require("dotenv").config();
const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Tworzymy instancję klienta Discorda z potrzebnymi intencjami
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Kolekcja do przechowywania komend
client.commands = new Collection();

// Wczytywanie wszystkich komend z folderu 'commands'
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Sprawdź, czy komenda ma 'data' i 'execute'
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.warn(`[OSTRZEŻENIE] Komenda pod ${filePath} brakuje właściwości "data" lub "execute".`);
  }
}

// Zdarzenie 'ready' - bot jest zalogowany
client.once("ready", () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}!`);
  client.user.setActivity("Twoje komendy!", { type: 0 }); // Opcjonalnie: ustawia status bota
});

// Zdarzenie 'interactionCreate' - obsługa interakcji (komendy slash)
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return; // Ignoruj interakcje, które nie są komendami slash

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`Nie znaleziono komendy "${interaction.commandName}".`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Błąd przy wykonywaniu komendy ${interaction.commandName}:`, error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "❌ Wystąpił błąd przy wykonywaniu tej komendy!", ephemeral: true });
    } else {
      await interaction.reply({ content: "❌ Wystąpił błąd przy wykonywaniu tej komendy!", ephemeral: true });
    }
  }
});

// Zaloguj bota używając tokenu z pliku .env
client.login(process.env.DISCORD_TOKEN);
