const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Sprawdź opóźnienie bota"),

  async execute(interaction) {
    const sent = await interaction.reply({ content: "Pinging...", fetchReply: true, ephemeral: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    await interaction.editReply(`Pong! Opóźnienie: ${latency}ms (API: ${interaction.client.ws.ping}ms)`);
  }
};
