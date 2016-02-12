import test from 'ava';
import { Skill, Response } from '..';

class MySkill {
  launch() {
    return Response.say("Skill launched!");
  }
}

const skill = Skill()(MySkill);

test('Launch request', t => {
  const event = {
    request: {
      type: 'LaunchRequest'
    }
  };

  return skill(event).then(response => {
    t.same(response, {
      version: "1.0",
      response: {
        shouldEndSession: true,
        outputSpeech: { type: "PlainText", text: "Skill launched!" }
      }
    });
  });
});

test('Unhandled request', t => {
  const event = {
    request: {
      type: "IntentRequest",
      intent: { name: "Unhandled" }
    }
  };

  return skill(event).then(response => {
    t.same(response, {
      version: "1.0",
      response: {
        shouldEndSession: true,
        outputSpeech: { type: "PlainText", text: "I'm sorry, I don't know how to do that." }
      }
    });
  });
});
