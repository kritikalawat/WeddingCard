/**
 * Creates the RSVP Google Form + a linked responses Sheet in your Google account,
 * then logs the GOOGLE_FORM block to paste into CONFIG in index.html.
 * Run once at script.google.com → New project → paste → Run createWeddingRsvpForm.
 */
function createWeddingRsvpForm() {
  const EVENTS = ['Haldi', 'Sangeet', 'Baraat, Varmala & Phere', 'Reception'];

  const form = FormApp.create('Sourabh & Priyal · Wedding RSVP')
    .setDescription('1–2 December 2026 · Ceremony Resort, Shobhagpura, Udaipur')
    .setConfirmationMessage("Thank you! We can't wait to celebrate with you in Udaipur.")
    .setAllowResponseEdits(false)
    .setShowLinkToRespondAgain(false);

  const name = form.addTextItem().setTitle('Name').setRequired(true);
  const phone = form.addTextItem().setTitle('Phone').setRequired(true);
  const guests = form.addListItem().setTitle('Number of guests')
    .setChoiceValues(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']).setRequired(true);
  const events = form.addCheckboxItem().setTitle('Events attending').setChoiceValues(EVENTS).setRequired(true);
  const arrival = form.addTextItem().setTitle('Arrival date & time').setHelpText('e.g. 1 Dec, around 9 AM').setRequired(true);
  const message = form.addParagraphTextItem().setTitle('Message for the couple');

  const sheet = SpreadsheetApp.create('Sourabh & Priyal · RSVP responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // A prefilled link reveals the entry.N field names the website must post to.
  const prefilled = form.createResponse()
    .withItemResponse(name.createResponse('x'))
    .withItemResponse(phone.createResponse('x'))
    .withItemResponse(guests.createResponse('1'))
    .withItemResponse(events.createResponse([EVENTS[0]]))
    .withItemResponse(arrival.createResponse('x'))
    .withItemResponse(message.createResponse('x'))
    .toPrefilledUrl();
  const ids = [...prefilled.matchAll(/entry\.(\d+)=/g)].map(m => 'entry.' + m[1]);

  const block = {
    action: form.getPublishedUrl().replace(/\/viewform.*$/, '/formResponse'),
    entry: { name: ids[0], phone: ids[1], guests: ids[2], events: ids[3], arrival: ids[4], message: ids[5] }
  };
  Logger.log('GOOGLE_FORM: ' + JSON.stringify(block, null, 2));
  Logger.log('Responses sheet: ' + sheet.getUrl());
  Logger.log('Edit form: ' + form.getEditUrl());
}
