export default class Response {
  static say = (...args) => new Response().say(...args);
  static card = (...args) => new Response().card(...args);
  static reprompt = (...args) => new Response().reprompt(...args);
  static shouldEndSession = (...args) => new Response().shouldEndSession(...args);

  constructor(...args) {
    this.state = args.reduce((result, item) => ({ ...result, ...item }), {});
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

  build(attributes) {
    return {
      version: '1.0',
      response: {
        shouldEndSession: true,
        ...this.state
      },
      ...(attributes && { sessionAttributes: attributes })
    };
  }
}
