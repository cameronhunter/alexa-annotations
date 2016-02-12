export default class Response {
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

export const say = new Response().say;
export const card = new Response().card;
export const reprompt = new Response().reprompt;
export const shouldEndSession = new Response().shouldEndSession;
