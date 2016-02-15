import test from 'ava';
import Echo from '../../build/example/echo';

test('launch', t => {
  const event = {
    request: { type: 'LaunchRequest' }
  };

  return Echo(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'Welcome to the example Echo skill!' }
      }
    });
  });
});

test('echo', t => {
  const event = {
    request: {
      type: 'IntentRequest',
      intent: {
        name: 'echo',
        slots: {
          sentence: { name: 'sentence', value: 'Hello world' }
        }
      }
    }
  };

  return Echo(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'Hello world' },
        card: { type: 'Simple', title: 'Echo', content: 'Hello world' }
      }
    });
  });
});

test('help', t => {
  const event = {
    request: { type: 'IntentRequest', intent: { name: 'AMAZON.HelpIntent' } }
  };

  return Echo(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'I repeat whatever you say to me!' }
      }
    });
  });
});

test('unhandled', t => {
  const event = {
    request: {
      type: 'IntentRequest',
      intent: { name: 'Unhandled' }
    }
  };

  return Echo(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'I\'m sorry, I don\'t know how to do that.' }
      }
    });
  });
});
