// dsh-claude-theme — node half: no-op host entry so a cordis row can mount the
// browser bundle. All behaviour lives in ./client.js.
export const name = "dsh-claude-theme";
export const inject = [];
export function apply() {
	console.log("[dsh-claude-theme] host half mounted (colors + serif fonts only)");
}
