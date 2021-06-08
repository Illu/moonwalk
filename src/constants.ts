export enum STATES {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

export const HEADER_HEIGHT = 50;
export const TABBAR_HEIGHT = 70;

export const API_URL = "https://ll.thespacedevs.com/2.1.0/";

export const NEWS_API_URL = "https://spaceflightnewsapi.net/api/v2/";

export const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const MONTHS_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export enum CALENDAR_TABS {
  LAUNCHES = "Launches",
  EVENTS = "Events",
};

export const NOTIFICATIONS_MESSAGES = [
  "🚀 $NAME$ will launch in just $TIME$ minutes!",
  "🛰 $TIME$ minutes before $NAME$ launch!",
  "🚀 Launch Alert: $NAME$ will launch in $TIME$ minutes!",
  "🛰 $NAME$ will launch in $TIME$ minutes!",
];
