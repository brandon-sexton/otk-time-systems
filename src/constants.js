export const DAYS_TO_HOURS = 24;
export const HOURS_TO_MINUTES = 60;
export const MINUTES_TO_SECONDS = 60;
export const SECONDS_TO_MILLISECONDS = 1000;
export const MILLISECONDS_TO_SECONDS = 0.001;
export const SECONDS_TO_MINUTES = 1 / MINUTES_TO_SECONDS;
export const MINUTES_TO_HOURS = 1 / HOURS_TO_MINUTES;
export const HOURS_TO_DAYS = 1 / DAYS_TO_HOURS;
export const DAYS_TO_SECONDS = 86400;
export const DAYS_TO_MILLISECONDS = DAYS_TO_SECONDS * SECONDS_TO_MILLISECONDS;
export const DAYS_TO_MINUTES = 1440;
export const HOURS_TO_SECONDS = 3600;
export const SECONDS_TO_DAYS = 1 / DAYS_TO_SECONDS;
export const SECONDS_TO_HOURS = 1 / HOURS_TO_SECONDS;
export const DAYS_IN_JULIAN_YEAR = 365.25;
export const DAYS_IN_JULIAN_CENTURY = 36525;
export const MJD_ZERO = 2400000.5;
export const J2000 = 2451545.0;
export const JD_RECIPROCAL_1 = 1 / 36524.25;
export const JD_RECIPROCAL_2 = 1 / 365.25;
export const JD_RECIPROCAL_3 = 1 / 30.6001;
export const JD_RECIPROCAL_4 = 1 / DAYS_IN_JULIAN_CENTURY;
export const TT_MINUS_TAI = 32.184 * SECONDS_TO_DAYS;
export const TAI_MINUS_UTC = 37 * SECONDS_TO_DAYS;
export const TT_MINUS_UTC = (TT_MINUS_TAI + TAI_MINUS_UTC) * SECONDS_TO_DAYS;
