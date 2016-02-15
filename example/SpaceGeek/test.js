import test from 'ava';
import sinon from 'sinon';
import SpaceGeek from '../../build/example/SpaceGeek';

test.before(() => {
  sinon.stub(Math, 'random', () => 0.7123406182508916);
});

test.after(() => {
  Math.random.restore();
});

test('LaunchRequest', t => {
  const event = {
    request: { type: 'LaunchRequest' }
  };

  return SpaceGeek(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'Here\'s your space fact: A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.' },
        card: { type: 'Simple', title: 'SpaceGeek', content: 'Here\'s your space fact: A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.' }
      }
    });
  });
});

test('GetNewFactIntent', t => {
  const event = {
    request: { type: 'IntentRequest', intent: { name: 'GetNewFactIntent' } }
  };

  return SpaceGeek(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'Here\'s your space fact: A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.' },
        card: { type: 'Simple', title: 'SpaceGeek', content: 'Here\'s your space fact: A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.' }
      }
    });
  });
});
