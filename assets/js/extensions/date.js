
Date.prototype.toISODateString = function () {
  return this.toISOString().split('T')[0];
}

Date.prototype.isInThePast = function () {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return this < today;
}

Date.prototype.isSameDay = function (date) {
  return this.getFullYear() === date.getFullYear() &&
    this.getMonth() === date.getMonth() &&
    this.getDate() === date.getDate()
}

Date.prototype.isToday = function () {
  return this.isSameDay(new Date());
}

Date.prototype.isInLessThanDays = function (days) {
  const now = new Date();
  const diffDays = (now - this) / (1000 * 60 * 60 * 24);
  return Math.abs(Math.ceil(diffDays)) <= days;
}