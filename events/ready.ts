import { RosenClient } from "../model/RosenClient";

module.exports = {
	name: 'ready',
	once: true,
	execute(client: RosenClient) {
		console.log(`Ready! Logged in as ${client.user!.tag}`);
	},
};