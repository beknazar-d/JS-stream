export function validateBooking(guests, nights, capacity, daysUntilCheckIn) {
  const guestCount = Number(guests);
  const nightCount = Number(nights);
  let message = "ok";

  if (!Number.isInteger(guestCount) || guestCount < 1) {
    message = "Укажите число гостей";
  }
  if (!Number.isInteger(nightCount) || nightCount < 1 || nightCount > 30) {
    message = "Срок проживания от 1 до 30 ночей";
  }
  if (guestCount > capacity) {
    message = "Максимум гостей: " + capacity;
  }
  if (daysUntilCheckIn < 0) {
    message = "Дата заезда в прошлом";
  }
  return message;
}

export function bookingTotal(nights, pricePerNight) {
  let percent = 0;
  if (nights >= 14) {
    percent = 15;
  } else if (nights >= 7) {
    percent = 10;
  }
  return Math.round((nights * pricePerNight * (100 - percent)) / 100);
}
