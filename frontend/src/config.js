// The backend address. Empty means "same website", which is how Eat Chic is
// deployed (the backend serves the website). Locally, `npm start` forwards
// /api requests to port 5000 through the "proxy" setting in package.json.
export const API_URL = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");
