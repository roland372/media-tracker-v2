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

/** Google access tokens typically expire in 1 hour; treat as valid for 55 minutes. */
const TOKEN_VALID_MS = 55 * 60 * 1000;

let cachedToken: string | null = null;
let cachedAt = 0;

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
					cachedToken = response.access_token;
					cachedAt = Date.now();
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
 * Request a Google access token with Sheets scope. Uses Google Identity Services.
 * Returns a cached token if still valid (within ~55 min); otherwise requests a new one
 * (which may show the sign-in modal only when the token has expired).
 * Returns the access token or throws.
 */
export function getGoogleAccessToken(): Promise<string> {
	return waitForGoogle().then(() => {
		const now = Date.now();
		if (cachedToken !== null && now - cachedAt < TOKEN_VALID_MS) {
			return Promise.resolve(cachedToken);
		}
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

/**
 * Clear the cached token so the next getGoogleAccessToken() will request a new one.
 * Call this when the API returns 401/expired so the user can get a fresh token on retry.
 */
export function clearGoogleTokenCache(): void {
	cachedToken = null;
	cachedAt = 0;
}
