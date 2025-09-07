const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Pokazuje listę dostępnych komend"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x5865F2) // kolor Discord
      .setTitle("📖 Lista komend")
      .setDescription("Dostępne komendy:")
      .addFields(
        { name: "/help", value: "Pokazuje tę wiadomość 📖" }
      )
      .setFooter({ text: "Twój Bot by Railway 🚂", iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
