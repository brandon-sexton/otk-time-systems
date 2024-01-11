import {
  calendarToJulian,
  julianToCalendar,
  julianUTCtoTT,
  julianTTtoUTC,
  julianToMJD,
} from './conversions';
import {J2000, JD_RECIPROCAL_4, MJD_ZERO} from './constants';
import {degreesToRadians} from 'otk-unit-conversions';
/**
 * Epoch
 * @class Epoch
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

  /**
   * @method getDaysPastJ2000
   * @description Returns the number of days past J2000.
   * @return {number} the number of days past J2000.
   * @example
   * const epoch = new Epoch('2018-08-08T08:08:08.888Z');
   * console.log(epoch.getDaysPastJ2000());
   * // 6713.838888888888
   */
  getDaysPastJ2000() {
    return this.julianTT - J2000;
  }

  /**
   * @method getGMST
   * @return {number} The Greenwich Mean Sidereal Time in radians.
   * @example
   * const epoch = new Epoch('2018-08-08T08:08:08.888Z');
   * console.log(epoch.getGMST());
   * // 4.71238898038469
   */
  getGMST() {
    const utc = julianToMJD(julianTTtoUTC(this.julianTT));
    const decDay = utc % 1;
    const j0 = utc + MJD_ZERO - decDay;
    const j = (j0 - J2000) * JD_RECIPROCAL_4;
    const theta0 = 100.4606184 + 36000.77004 * j + 0.000387933 * j * j;
    const totalDeg = theta0 + 360.98564724 * decDay;
    const normalizedDeg = totalDeg % 360;
    return degreesToRadians(normalizedDeg);
  }
}
