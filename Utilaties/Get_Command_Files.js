// This file contans the "Get_Command_Files" function exportible as a module

// First, we set all the required varibles

var FS = require("node:fs");

// This is the module

function Get_Command_Files(Command_Files_Directory){ // Create a function to get command files, passing in the directory
    var Files = FS.readdirSync(Command_Files_Directory, {
        withFileTypes: true // Set a varible to read a directory with filetypes enabled
    })
    let Command_Files = [] // Set a varible to equal en empty aray
    for(var File of Files){ // For every command file
        if(File.isDirectory()){ // If it is a folder
            Command_Files = [
                ...Command_Files, // Add every file in it to the "Command_Files" aray, as long as it ends with ".js"
                ...Get_Command_Files(`${Command_Files_Directory}/${File.name}`)
            ]
        } else if(File.name.endsWith(".js")){ // Otherwise, if it is a file and it ends with ".js"
            Command_Files.push(`${Command_Files_Directory}/${File.name}`) // Add it to the command files aray
        }
    }
    return Command_Files // Return the "Command_Files" aray
}

module.exports = {Get_Command_Files}; // Export the module