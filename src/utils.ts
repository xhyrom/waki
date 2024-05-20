export function verify(request: Request, secret: string): boolean {
	const authorization = request.headers.get("authorization");
	if (!authorization) return false;

	const token = authorization?.split(" ")?.[1];
	if (!token) return false;

	return token === btoa(secret);
}

interface Provider {
	name: string;
	url: string;
	token: string;
}

export function parseProviders(providers: string): Provider[] {
	try {
		const json = JSON.parse(providers);
		if (!Array.isArray(json)) return [];

		return json satisfies Provider[];
	} catch {
		return [];
	}
}

export function getMainProvider(providers: Provider[], main: string): Provider | undefined {
	return providers.find((provider) => provider.name === main) ?? providers[0];
}
