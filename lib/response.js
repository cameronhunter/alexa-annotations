import ObjectAssign from "object.assign";

class Response {
  constructor() {
    this.state = ObjectAssign({ shouldEndSession: false }, ...arguments);
  }

  say(sentence) {
    return new Response(this.state, {
      outputSpeech: { type: "PlainText", text: sentence }
    });
  }

  card(title, content, type = "Simple") {
    return new Response(this.state, {
      card: { type: type, title: title, content: content }
    });
  }

  reprompt(sentence) {
    return new Response(this.state, {
      reprompt: { outputSpeech: { type: "PlainText", text: sentence } }
    });
  }

  shouldEndSession(shouldEndSession) {
    return new Response(this.state, { shouldEndSession: shouldEndSession });
  }
}

export default {
  Response: Response,
  say: new Response().say,
  card: new Response().card,
  reprompt: new Response().reprompt,
  shouldEndSession: new Response().shouldEndSession
};
