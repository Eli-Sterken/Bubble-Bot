// This file contans the bot's "Test" command

// First, we set all the required varibles 

var {SlashCommandBuilder} = require("discord.js");

// This is the command module

module.exports = {
    data: new SlashCommandBuilder() // Set the data object to a new SlashCommandBuilder instance
        .setName("test") // Set the command data
        .setDescription('Tests the bot. The bot will reply with "Bot online!" if working'),
    async Execute(Interaction){ // function for when the command is ran
        Interaction.reply("Bot online!") // Reply with a message
    }    
}