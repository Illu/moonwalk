const STATUS_MESSAGES = [
  "Launch is Go",
  "Launch is To-Be-Determined",
  "Launch was Successful",
  "Launch was a Failure",
  "Launch is in a Hold",
  "Launch is In-Flight",
  "Launch was a partial Failure",
];

export const getStatusMessage = (statusNumber: number) =>
  STATUS_MESSAGES[statusNumber - 1] || "Unknown Status";
