const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

const API_URL = configuredApiUrl
	? configuredApiUrl === "/api"
		? "/api"
		: `${configuredApiUrl.replace(/\/$/, "").replace(/\/api$/, "")}/api`
	: import.meta.env.DEV
		? "http://localhost:5000/api"
		: typeof window !== "undefined"
		? `${window.location.origin}/api`
		: "http://localhost:5000/api";

export default API_URL;