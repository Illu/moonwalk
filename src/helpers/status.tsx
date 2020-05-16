const STATUS_MESSAGES = [
  "Unknown Status",
  "Launch is GO",
  "Launch is NO-GO",
  "Launch was a success",
  "Launch failed",
];

export const getStatusMessage = (statusNumber: number) =>
  STATUS_MESSAGES[statusNumber] || "Unknown Status";
