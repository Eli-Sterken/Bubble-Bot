// This is the main file that starts the bot

// First, we set all the required varibles

var {Client, GatewayIntentBits, Collection} = require("discord.js");
var {Bot_Token} = require("./Info.json");
var FS = require("node:fs");
var Bot_Client = new Client({intents: [GatewayIntentBits.Guilds]});
var Events = Get_Event_Files("../Events");

for(var Event of Events){ // For every event file
    var File = require(Event); // Require the file
    if (File.once){ // if it is a once event
        Bot_Client.once(File.name, (...args) => File.Execute(...args)); // Run it in once mode
    } else { // Otherwise
        Bot_Client.on(File.name, (...args) => File.Execute(...args)); // Run it in on mode
    };
};

function Get_Event_Files(Event_Files_Directory){ // Create a function to get event files, passing in the directory
    var Files = FS.readdirSync(Event_Files_Directory, {
        withFileTypes: true // Set a varible to read a directory with filetypes enabled
    })
    let Event_Files = [] // Set a varible to equal en empty aray
    for(var File of Files){ // For every event file
        if(File.isDirectory()){ // If it is a folder
            Event_Files = [
                ...Event_Files, // Add every file in it to the "Event_Files" aray, as long as it ends with ".js"
                ...Get_Event_Files(`${Event_Files_Directory}/${File.name}`)
            ]
        } else if(File.name.endsWith(".js")){ // Otherwise, if it is a file and it ends with ".js"
            Event_Files.push(`${Event_Files_Directory}/${File.name}`) // Add it to the event files aray
        }
    }
    return Event_Files // Return the "Event_Files" aray
}



Bot_Client.on("interactionCreate", Interaction => { // When a message is sent in chat
    if(!Interaction.isChatInputCommand()) return; // If it is not a bot command, do nothing
    let Command = Bot_Client.commands.get(Interaction.commandName); // Let a varible equal the command

    try{ // Try this
        if(Interaction.replied) return; // If the bot command is already replied to, do nothing
        Command.Execute(Interaction); // Run the commands execute function
    } catch (error){ // If there was an error
        console.error(error); // Print it in the console
    };
});

Bot_Client.login(Bot_Token); // Log the bot in using the token