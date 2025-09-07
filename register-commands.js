require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`[OSTRZEŻENIE] Komenda pod ${file} brakuje właściwości "data" lub "execute". Nie zostanie zarejestrowana.`);
  }
}

// Tworzymy instancję REST do komunikacji z API Discorda
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`🔄 Rozpoczynam rejestrację ${commands.length} komend slash...`);

    // Używamy Routes.applicationGuildCommands do rejestracji komend tylko dla jednego serwera.
    // Jest to szybsze do testowania. Aby zarejestrować globalnie, użyj Routes.applicationCommands
    // i usuń GUILD_ID.
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    console.log(`✅ Pomyślnie zarejestrowano ${data.length} komend slash na serwerze!`);
  } catch (error) {
    console.error("❌ Błąd podczas rejestracji komend:", error);
  }
})();
