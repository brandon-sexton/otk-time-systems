import {
  calendarToJulian,
  julianToCalendar,
  julianUTCtoTT,
  julianTTtoUTC,
} from './conversions';
import {J2000, JD_RECIPROCAL_4} from './constants';
/**
 * Epoch
 * @class Epoch
 * @extends Date
 * @param {string} isoString
 * @return {Epoch}
 * @example
 * new Epoch('2018-08-08T08:08:08.888Z')
 */
export class Epoch {
  /**
   * Creates an Epoch assuming the input is in UTC
   * @param {string} isoString - The ISO string to convert.
   * @example
   * const epoch = new Epoch('2018-08-08T08:08:08.888Z');
   * console.log(epoch);
   * // 2458345.838888
   */
  constructor(isoString) {
    const dateTimeArray = isoString.split('T');
    const dateArray = dateTimeArray[0].split('-');
    const timeArray = dateTimeArray[1].split(':');
    this.julianTT = julianUTCtoTT(
        calendarToJulian(
            Number.parseFloat(dateArray[0]),
            Number.parseFloat(dateArray[1]),
            Number.parseFloat(dateArray[2]),
            Number.parseFloat(timeArray[0]),
            Number.parseFloat(timeArray[1]),
            Number.parseFloat(timeArray[2].replace('Z', '')),
        ),
    );
  }

  /**
   * @static
   * @param {number} julianTT - The Julian TT to use for instantiation
   * @return {Epoch} The Epoch object.
   * @example
   * const epoch = Epoch.fromJulianTT(2458345.838888);
   * console.log(epoch.toString());
   * // '2018-08-08T08:08:08.888Z'
   */
  static fromJulianTT(julianTT) {
    const ep = Object.create(Epoch.prototype);
    ep.julianTT = julianTT;
    return ep;
  }

  /**
   * @return {Epoch} A copy of the Epoch object.
   * @example
   * const epoch = new Epoch('2018-08-08T08:08:08.888Z');
   * console.log(epoch.copy().toString());
   * // '2018-08-08T08:08:08.888Z'
   */
  copy() {
    return Epoch.fromJulianTT(this.julianTT);
  }

  /**
   * @return {string} The equivalent ISO string.
   * @example
   * const epoch = new Epoch('2018-08-08T08:08:08.888Z');
   * console.log(epoch.toString());
   * // '2018-08-08T08:08:08.888Z'
   */
  toString() {
    const dateTime = julianToCalendar(julianTTtoUTC(this.julianTT));
    const yyyy = dateTime.year.toString().padStart(4, '0');
    const mm = dateTime.month.toString().padStart(2, '0');
    const dd = dateTime.day.toString().padStart(2, '0');
    const hh = dateTime.hour.toString().padStart(2, '0');
    const min = dateTime.minute.toString().padStart(2, '0');
    const ss = dateTime.second.toFixed(3).padStart(6, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}Z`;
  }

  /**
   * @param {number} days - The number of days to add.
   * @return {Epoch} The Epoch object.
   * @example
   * const epoch = new Epoch('2018-08-08T08:08:08.888Z');
   * console.log(epoch.plusDays(1).toString());
   * // '2018-08-09T08:08:08.888Z'
   */
  plusDays(days) {
    return Epoch.fromJulianTT(this.julianTT + days);
  }

  /**
   * Returns the number of Julian centuries past J2000.
   * @return {number} the number of Julian centuries past J2000.
   * @example
   * const epoch = new Epoch('2018-08-08T08:08:08.888Z');
   * console.log(epoch.getJulianCenturiesPastJ2000());
   * // 0.1838888888888889
   */
  getJulianCenturiesPastJ2000() {
    return (this.julianTT - J2000) * JD_RECIPROCAL_4;
  }
}
