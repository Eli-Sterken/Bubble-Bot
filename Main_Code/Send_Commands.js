// This file gathers all the bot commands and sends them to Discord

// First, we set all the required varibles

var {REST} = require("@discordjs/rest");
var {Routes} = require("discord.js");
var {Bot_Token, Client_ID} = require("./Info.json");
var {Get_Command_Files} = require("../Utilaties/Get_Command_Files.js");

var Commands = []; // Set a varible to an empty aray and another one to the "Get_Command_Files" function
var Command_Files = Get_Command_Files("../Commands");

for(var Command_File of Command_Files){ // For every command file
    var Command = require(Command_File); // Require the command file
    Commands.push(Command.data.toJSON()); // Add the command data to the "Commands" aray, converting it to JSON
};

var Rest = new REST({version: "10"}).setToken(Bot_Token); // Create a new REST instance
Rest.put(Routes.applicationCommands(Client_ID), {body: Commands}) // Send the commands to Discord
    .then(() => console.log("Commands sent to Discord sucessfully!")) // f it all went well, print a sucess message
    .catch(console.error) // if there was an erorr, print it