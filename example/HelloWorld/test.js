import test from 'ava';
import Request from '../../build/request';
import HelloWorld from '../../build/example/HelloWorld';

test('LaunchRequest', t => {
  const event = Request.launchRequest().build();

  return HelloWorld(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: false,
        outputSpeech: { type: 'PlainText', text: 'Welcome to the Alexa Skills Kit, you can say hello' },
        reprompt: { outputSpeech: { type: 'PlainText', text: 'You can say hello' } }
      }
    });
  });
});

test('HelloWorldIntent', t => {
  const event = Request.intent('HelloWorldIntent').build();

  return HelloWorld(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'Hello World!' },
        card: { type: 'Simple', title: 'Greeter', content: 'Hello World!' }
      }
    });
  });
});

test('AMAZON.HelpIntent', t => {
  const event = Request.intent('AMAZON.HelpIntent').build();

  return HelloWorld(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: false,
        outputSpeech: { type: 'PlainText', text: 'You can say hello to me!' },
        reprompt: { outputSpeech: { type: 'PlainText', text: 'You can say hello to me!' } }
      }
    });
  });
});
