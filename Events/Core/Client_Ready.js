// This file contans the "Client_Ready" event

// This is the event module 

module.exports = {
    name: "ready", // Set the name and once values
    once: true,
    async Execute(Info){ // Function for when the event is ran
        console.log(`Bot logged in and initalized sucessfully! Logged in as ${Info.user.tag}`) // Print a message with the bot info
    }
};