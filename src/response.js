export default class Response {
  static say = new Response().say;
  static card = new Response().card;
  static reprompt = new Response().reprompt;
  static shouldEndSession = new Response().shouldEndSession;

  constructor(state) {
    this.state = { shouldEndSession: true, ...state };
  }

  say(text) {
    return new Response(this.state, { outputSpeech: { type: "PlainText", text } });
  }

  card(title, content, type = "Simple") {
    return new Response(this.state, { card: { type, title, content } });
  }

  reprompt(text) {
    return new Response(this.state, { reprompt: { outputSpeech: { type: "PlainText", text } } });
  }

  shouldEndSession(shouldEndSession) {
    return new Response(this.state, { shouldEndSession });
  }
}
