:: This file starts all the files needed to run the bot

:: First, we cd in to the bots code directory to avoid Node.Js path issues

cd "C:\Users\Eli Sterken\GitHub Repos\Bubble Bot\Main_Code"

:: Now we start all the needed files

node Send_Commands.Js
node Main.Js

:: Once the bot quits, print a message and pause

echo Bot termanated, thank you for using Bubble Bot!
pause