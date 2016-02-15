export default class Response {
  static say = (...args) => new Response().say(...args);
  static card = (...args) => new Response().card(...args);
  static reprompt = (...args) => new Response().reprompt(...args);
  static shouldEndSession = (...args) => new Response().shouldEndSession(...args);

  constructor(...args) {
    const state = args.reduce((result, item) => ({ ...result, ...item }), {});
    this.state = { shouldEndSession: true, ...state };
  }

  say(text) {
    return new Response(this.state, { outputSpeech: { type: 'PlainText', text } });
  }

  card(title, content, type = 'Simple') {
    return new Response(this.state, { card: { type, title, content } });
  }

  reprompt(text) {
    return new Response(this.state, { reprompt: { outputSpeech: { type: 'PlainText', text } } });
  }

  shouldEndSession(shouldEndSession) {
    return new Response(this.state, { shouldEndSession });
  }
}
