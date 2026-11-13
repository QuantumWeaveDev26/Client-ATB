import test from 'node:test';
import assert from 'node:assert/strict';
import { addDays, buildRequestMessage, formatDate, indiaDate, isValidDate, validateRequest, whatsappUrl } from '../src/booking.js';

const valid = { date: '2030-11-07', players: '2', name: 'Naveen Reddy', notes: '' };
test('uses the Indian calendar date at the UTC day boundary', () => {
  assert.equal(indiaDate(new Date('2026-11-06T20:00:00Z')), '2026-11-07');
  assert.equal(indiaDate(new Date('2026-11-06T17:00:00Z')), '2026-11-06');
});
test('date selection handles boundaries and rejects impossible dates', () => {
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(addDays('2028-02-28', 1), '2028-02-29');
  assert.equal(isValidDate('2026-02-29'), false);
  assert.equal(isValidDate('2026-11-31'), false);
  assert.equal(isValidDate('garbage'), false);
  assert.equal(formatDate('2026-11-06'), '6 November 2026');
});
test('slot request needs only a valid date, name and player count; notes are optional', () => {
  assert.deepEqual(validateRequest(valid, '2030-11-06'), {});
  assert.deepEqual(validateRequest({ ...valid, date: '2030-11-06' }, '2030-11-06'), {});
  assert.ok(validateRequest({ ...valid, date: '' }, '2030-11-06').date);
  assert.ok(validateRequest({ ...valid, date: '2030-11-05' }, '2030-11-06').date);
  assert.ok(validateRequest({ ...valid, date: '2030-02-31' }, '2030-01-01').date);
  assert.ok(validateRequest({ ...valid, name: ' ' }, '2030-11-06').name);
  assert.ok(validateRequest({ ...valid, players: '20' }, '2030-11-06').players);
  assert.ok(validateRequest({ ...valid, notes: 'x'.repeat(501) }, '2030-11-06').notes);
});
test('WhatsApp draft contains all entered details without times or session types', () => {
  const message = buildRequestMessage({ ...valid, name: '  Asha & Dev  ', notes: 'पहला खेल & a racquet question?\nTwo friends.' });
  assert.match(message, /Name: Asha & Dev/);
  assert.match(message, /7 November 2030/);
  assert.match(message, /Players: 2/);
  assert.match(message, /पहला खेल & a racquet question\?/);
  assert.match(message, /does not reserve a slot/);
  assert.doesNotMatch(message, /Preferred time|coaching enquiry|court.session|IST/);
  const url = new URL(whatsappUrl(message));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/919187308508');
  assert.equal(url.searchParams.get('text'), message);
});
test('optional empty notes produce no empty note line', () => {
  assert.doesNotMatch(buildRequestMessage({ ...valid, notes: '  ' }), /Anything you should know/);
});
