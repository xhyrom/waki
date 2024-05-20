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

export async function parseBody(request: Request): Promise<() => BodyInit> {
	const contentType = request.headers.get("content-type");
	if (contentType === "multipart/form-data" || contentType === "application/x-www-form-urlencoded") {
		const data = await request.formData();
		return () => cloneFormData(data);
	}

	if (contentType === "application/json") {
		const data = await request.json();
		return () => JSON.stringify(data);
	}

	const text = await request.text();
	return () => text;
}

export function cloneFormData(data: FormData) {
	const form = new FormData();
	for (const [key, value] of data.entries()) {
		if (value instanceof File) {
			form.append(key, value, value.name);
		} else {
			form.append(key, value);
		}
	}

	return form;
}
