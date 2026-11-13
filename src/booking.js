export const ACADEMY_PHONE = '919187308508';
export const BOOKING_PROVIDER = 'https://www.khelomore.com/sports-venues/bengaluru/atb-tennis-academy-yelahanka/1733';
export const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=13.1163302%2C77.6040946';

export function indiaDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now);
}

export function addDays(date, count) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + count);
  return value.toISOString().slice(0, 10);
}

export function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) return false;
  const parsed = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

export function formatDate(value) {
  if (!isValidDate(value)) return 'Choose a date';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata',
  }).format(new Date(`${value}T12:00:00Z`));
}

export function validateRequest(request, today = indiaDate()) {
  const errors = {};
  if (!isValidDate(request.date) || request.date < today) errors.date = 'Choose today or a future date.';
  if (!['1', '2', '3', '4'].includes(String(request.players))) errors.players = 'Choose the number of players.';
  if (!request.name?.trim() || request.name.trim().length < 2) errors.name = 'Enter your name so the team knows who is enquiring.';
  else if (request.name.trim().length > 80) errors.name = 'Keep your name to 80 characters or fewer.';
  if ((request.notes?.length ?? 0) > 500) errors.notes = 'Keep your note to 500 characters or fewer.';
  return errors;
}

export function buildRequestMessage(request) {
  return [
    "Hello ATB Tennis Academy! I'd like to request a slot.",
    '',
    `Name: ${request.name.trim()}`,
    `Preferred date: ${formatDate(request.date)}`,
    `Players: ${request.players}`,
    ...(request.notes?.trim() ? [`Anything you should know: ${request.notes.trim()}`] : []),
    '',
    'Please confirm availability and booking details. I understand this request does not reserve a slot.',
  ].join('\n');
}

export function whatsappUrl(message) {
  return `https://wa.me/${ACADEMY_PHONE}?text=${encodeURIComponent(message)}`;
}
