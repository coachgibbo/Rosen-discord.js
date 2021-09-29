/**
 * A module that searches Youtube via the API and returns a list of results
 */
import { google, youtube_v3 } from 'googleapis';
import dotenv from 'dotenv'

dotenv.config()

function loadYoutube(query: string) {
	// Set the Youtube API settings
	const youtube = google.youtube({
		version: 'v3',
		auth: process.env.YT_API_KEY,
	})

	// Set parameters for the Youtube search
	const params: youtube_v3.Params$Resource$Search$List = {
		part: ["snippet"], // How much to return for each video
		type: ["video"], // Type of result items
		maxResults: 25, // Max number of results
		q: query, // Search Query
	}

	// Return the uncompleted promise
	return youtube.search.list(params);
}

module.exports = { loadYoutube };