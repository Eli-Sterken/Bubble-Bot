// This file contans the "Interaction_Create" event

// First, we set all the required varibles

var {Client, GatewayIntentBits, Collection} = require("discord.js");
var Bot_Client = new Client({intents: [GatewayIntentBits.Guilds]});
var {Bot_Token} = require("../../Main_Code/Info.json");
Bot_Client.commands = Get_Commands("../Commands");

function Get_Commands(Commands_Directory){ // Create a function to get all the commands
    let Commands = new Collection(); // Create a new collection
    var {Get_Command_Files} = require("../../Utilaties/Get_Command_Files.js"); // Require the "Get_Command_Files" function
    var Command_Files = Get_Command_Files(Commands_Directory); // Gathr all the command files in to a varible
    for(var Command_File of Command_Files){ // For every command
        var Command = require("."+"."+"/"+Command_File); // Require the command
        Commands.set(Command.data.toJSON().name, Command); // Add it to the collection
    }
    return Commands;
};

// This is the event module

module.exports = {
    name: "interactionCreate",
    async Execute(Interaction){
        if(!Interaction.isChatInputCommand()) return // If it is not a bot command, do nothing
        let Command = Bot_Client.commands.get(Interaction.commandName) // Let a varible equal the command

        try{ // Try this
            if(Interaction.replied) return // If the bot command is already replied to, do nothing
            Command.Execute(Interaction) // Run the commands execute function
        } catch (error){ // If there was an error
            console.error(error) // Print it in the console
        }
    }
};