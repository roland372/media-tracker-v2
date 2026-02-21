/**
 * Google Identity Services (GIS) token client for obtaining a Google access token
 * with Sheets scope. Use this when calling the Sheets API so the user can get a
 * fresh token without logging out (GIS may prompt only if the session expired).
 *
 * Requires: VUE_APP_GOOGLE_CLIENT_ID (Web application client ID from Google Cloud Console).
 * Add your app origin to Authorized JavaScript origins and ensure the Sheets scope
 * is on the OAuth consent screen.
 */

const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

declare global {
	interface Window {
		google?: {
			accounts: {
				oauth2: {
					initTokenClient: (config: {
						client_id: string;
						scope: string;
						callback: (response: { access_token: string; error?: string }) => void;
					}) => { requestAccessToken: (options?: { prompt?: string }) => void };
				};
			};
		};
	}
}

function getClientId(): string {
	const id = process.env.VUE_APP_GOOGLE_CLIENT_ID || '';
	return id;
}

function waitForGoogle(): Promise<void> {
	return new Promise((resolve, reject) => {
		if (typeof window === 'undefined') {
			reject(new Error('Not in browser'));
			return;
		}
		if (window.google?.accounts?.oauth2) {
			resolve();
			return;
		}
		const maxWait = 10000;
		const start = Date.now();
		const t = setInterval(() => {
			if (window.google?.accounts?.oauth2) {
				clearInterval(t);
				resolve();
			} else if (Date.now() - start > maxWait) {
				clearInterval(t);
				reject(new Error('Google Identity Services script did not load'));
			}
		}, 100);
	});
}

type TokenClient = { requestAccessToken: (options?: { prompt?: string }) => void };

let tokenClient: TokenClient | null = null;
let pendingResolve: (token: string) => void = () => void 0;
let pendingReject: (err: Error) => void = () => void 0;

function getTokenClient() {
	const clientId = getClientId();
	if (!clientId) {
		throw new Error('VUE_APP_GOOGLE_CLIENT_ID is not set');
	}
	if (!tokenClient) {
		if (!window.google?.accounts?.oauth2) {
			throw new Error('Google Identity Services not loaded');
		}
		tokenClient = window.google.accounts.oauth2.initTokenClient({
			client_id: clientId,
			scope: SHEETS_SCOPE,
			callback: (response: { access_token: string; error?: string }) => {
				if (response.error) {
					pendingReject(new Error(response.error));
				} else if (response.access_token) {
					pendingResolve(response.access_token);
				} else {
					pendingReject(new Error('No access token in response'));
				}
			},
		});
	}
	return tokenClient;
}

/**
 * Request a Google access token with Sheets scope. Uses Google Identity Services;
 * if the user has an active Google session they may get a token with minimal or no prompt.
 * Returns the access token or throws.
 */
export function getGoogleAccessToken(): Promise<string> {
	return waitForGoogle().then(() => {
		return new Promise<string>((resolve, reject) => {
			pendingResolve = resolve;
			pendingReject = reject;
			getTokenClient().requestAccessToken();
		});
	});
}

export function isGoogleTokenClientConfigured(): boolean {
	return Boolean(getClientId());
}
