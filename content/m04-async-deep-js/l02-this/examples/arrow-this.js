'use strict';
// Обычная функция в колбэке получает свой this, стрелка берёт this снаружи.
const route = {
  city: "Казань",
  stops: ["Склад", "Вокзал"],
  describeStops() {
    return this.stops.map((stop) => stop + ", " + this.city).join("; ");
  },
  describeWrong() {
    try {
      return this.stops.map(function (stop) {
        return stop + ", " + this.city;
      }).join("; ");
    } catch (error) {
      return error.name;
    }
  },
};

console.log(route.describeStops());
console.log(route.describeWrong());
