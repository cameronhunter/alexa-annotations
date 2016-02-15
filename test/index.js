import test from 'ava';
import MySkill from '../build/test/my-skill';

test('Launch request', t => {
  const event = {
    request: {
      type: 'LaunchRequest'
    }
  };

  return MySkill(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'Skill launched!' }
      }
    });
  });
});

test('Unhandled request', t => {
  const event = {
    request: {
      type: 'IntentRequest',
      intent: { name: 'Unhandled' }
    }
  };

  return MySkill(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'I\'m sorry, I don\'t know how to do that.' }
      }
    });
  });
});

test('Builtin Help intent', t => {
  const event = {
    request: {
      type: 'IntentRequest',
      intent: { name: 'AMAZON.HelpIntent' }
    }
  };

  return MySkill(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'Help' }
      }
    });
  });
});

test('Help intent', t => {
  const event = {
    request: {
      type: 'IntentRequest',
      intent: { name: 'help' }
    }
  };

  return MySkill(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'Help' }
      }
    });
  });
});
