
Date.prototype.toISODateString = function () {
  return this.toISOString().split('T')[0];
}
