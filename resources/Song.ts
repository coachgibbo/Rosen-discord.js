import { AudioResource, createAudioResource, StreamType } from "@discordjs/voice";
import ytdl from "discord-ytdl-core";

/**
 * Creating a resource to extend Discord AudioResource's.
 * Main benefit is that we can specify what information is actually necessary
 * for the song to play as well as callback functions for if an error occurs.
 * Although Discord provides some callbacks this gives more flexibility.
 * 
 * It's also better from a memory standpoint as AudioResource's are created
 * as they're needed rather than whenever the play command is called
 */
export interface SongData {
	id: string;
	title: string;
	onStart: () => void;
	onFinish: () => void;
	onError: (error: Error) => void;
}

export class Song implements SongData{
	public readonly id: string;
	public readonly url: string;
	public readonly title: string;
	public readonly onStart: () => void;
	public readonly onFinish: () => void;
	public readonly onError: (error: Error) => void;

	constructor({ id, title, onStart, onFinish, onError }: SongData) {
		this.id = id;
		this.url = "https://www.youtube.com/watch?v=" + id;
		this.title = title;
		this.onStart = onStart;
		this.onFinish = onFinish;
		this.onError = onError;
	}

	public createAudioResource(): AudioResource {
		const stream = ytdl(this.url, {
			filter: "audioonly",
			opusEncoded: true,
			highWaterMark: 1 << 15,
			encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
		});

		return createAudioResource(stream, { inputType: StreamType.Opus });
	}
}