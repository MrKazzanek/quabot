const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Pokazuje listę dostępnych komend"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2) // Kolor Discord (jasny fiolet)
      .setTitle("📖 Lista komend")
      .setDescription("Oto komendy, których możesz użyć:")
      .addFields(
        { name: "/help", value: "Pokazuje tę wiadomość 📖", inline: false },
        { name: "/ping", value: "Sprawdź opóźnienie bota 🚀", inline: false }
      )
      .setFooter({ text: `Twój Bot by Railway 🚂`, iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false }); // 'ephemeral: false' sprawia, że wiadomość jest widoczna dla wszystkich
  }
};
