type RequestBody = {
	model: string;
	query: string;
};

type CallResponse<T = unknown> = {
	ok: boolean;
	result?: T;
	error?: string;
};

const API_URL = import.meta.env.VITE_BACKEND_URL;

if (!API_URL) {
	throw new Error(
		"Backend URL not found. Please set VITE_BACKEND_URL in your .env file."
	);
}

export async function callAPI<T = unknown>(
	body: RequestBody
): Promise<CallResponse<T>> {
	try {
		const response = await fetch(`${API_URL}/call`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		let data: unknown;

		try {
			data = await response.json();
		} catch (err) {
			throw new Error("Response is not valid JSON");
		}

		return { ok: true, result: data as T };
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
}
