import packageJSON from "../../package.json";

export const config = {
  SIDEBAR_WIDTH: 240,
  RECHART_HEIGHT: 500,
  DATE_FORMAT: "YYYY-MM-DD",
  VERSION: packageJSON.version,
  PATTERN: "^[a-zA-Z0-9_]*$",
};

// url
export { PAGE_URL } from "./page-url";
