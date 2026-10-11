export function validateBooking(guests, nights, capacity, daysUntilCheckIn) {
  const guestCount = Number(guests);
  const nightCount = Number(nights);

  if (guestCount < 1) {
    return "Укажите число гостей";
  }
  if (!Number.isInteger(nightCount) || nightCount < 1 || nightCount > 30) {
    return "Срок проживания от 1 до 30 ночей";
  }
  if (guestCount > capacity) {
    return "Максимум гостей: " + capacity;
  }
  if (daysUntilCheckIn < 0) {
    return "Дата заезда в прошлом";
  }
  return "ok";
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
