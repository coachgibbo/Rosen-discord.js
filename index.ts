/**
 * The main file for the Rosen bot. Creates and runs the Discord client and
 * initializes command and event handling.
 */
import fs from 'fs';
import { Intents } from 'discord.js';
import dotenv from 'dotenv';
import { RosenClient } from './model/RosenClient';

// Get environment variables from .env config
dotenv.config();

// Create a discord client instance
const client = new RosenClient({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

// Creates a Discord Collection to store commands and reads command files from the ./commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

// Iterates through command files and stores a (name, file) mapping in client.commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.setCommand(command.data.name, command);
}

// Reads the event files from the events directory and filters out non-ts files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.ts'));

// Iterate through eventfiles and designate what to do for each event
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args: []) => event.execute(...args));
	} else {
		client.on(event.name, (...args: []) => event.execute(...args));
	}
}

// Use client token to login to discord
client.login(process.env.TOKEN);