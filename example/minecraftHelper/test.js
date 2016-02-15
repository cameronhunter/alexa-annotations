import test from 'ava';
import MinecraftHelper from '../../build/example/minecraftHelper';

test('LaunchRequest', t => {
  const event = {
    request: { type: 'LaunchRequest' }
  };

  return MinecraftHelper(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: false,
        outputSpeech: { type: 'PlainText', text: 'Welcome to the Minecraft Helper. You can ask a question like, what\'s the recipe for a chest? ... Now, what can I help you with.' },
        reprompt: { outputSpeech: { type: 'PlainText', text: 'For instructions on what you can say, please say help me.' } }
      }
    });
  });
});

test('RecipeIntent', t => {
  const event = {
    request: {
      type: 'IntentRequest',
      intent: {
        name: 'RecipeIntent',
        slots: {
          Item: { name: 'Item', value: 'Farmland' }
        }
      }
    }
  };

  return MinecraftHelper(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: true,
        outputSpeech: { type: 'PlainText', text: 'Farmland can be created by plowing the land with a hoe.' },
        card: { type: 'Simple', title: 'Recipe for Farmland', content: 'Farmland can be created by plowing the land with a hoe.' }
      }
    });
  });
});

test('Unknown recipe', t => {
  const event = {
    request: {
      type: 'IntentRequest',
      intent: {
        name: 'RecipeIntent',
        slots: {
          Item: { name: 'Item', value: 'Coffee' }
        }
      }
    }
  };

  return MinecraftHelper(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: false,
        outputSpeech: { type: 'PlainText', text: 'I\'m sorry, I currently do not know the recipe for Coffee. What else can I help with?' },
        reprompt: { outputSpeech: { type: 'PlainText', text: 'What else can I help with?' } }
      }
    });
  });
});

test('No recipe', t => {
  const event = {
    request: {
      type: 'IntentRequest',
      intent: { name: 'RecipeIntent' }
    }
  };

  return MinecraftHelper(event).then(response => {
    t.same(response, {
      version: '1.0',
      response: {
        shouldEndSession: false,
        outputSpeech: { type: 'PlainText', text: 'I\'m sorry, I currently do not know that recipe. What else can I help with?' },
        reprompt: { outputSpeech: { type: 'PlainText', text: 'What else can I help with?' } }
      }
    });
  });
});
