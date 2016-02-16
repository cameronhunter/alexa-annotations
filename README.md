# alexa-lambda-skill

[![Build Status](https://travis-ci.org/cameronhunter/alexa-lambda-skill.svg?branch=master)](https://travis-ci.org/cameronhunter/alexa-lambda-skill) [![NPM Version](https://img.shields.io/npm/v/alexa-lambda-skill.svg)](https://npmjs.org/package/alexa-lambda-skill) [![License](https://img.shields.io/npm/l/alexa-lambda-skill.svg)](https://github.com/cameronhunter/alexa-lambda-skill/blob/master/LICENSE)

Easily create Alexa Skills to run on AWS Lambda using ES6 classes, promises, and ES7 decorators.

## Example

```javascript
import { Skill, Response, Intent, Launch } from 'alexa-lambda-skill';

@Skill
export default class Echo {

  @Launch
  launch() {
    return Response.ask('Welcome to the example Echo skill! What would you like me to repeat?');
  }

  @Intent('echo')
  echo({ sentence }) {
    return Response.say(sentence).card('Echo', sentence);
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return Response.say('I repeat whatever you say to me!');
  }
  
  @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent')
  stop() {
    return Response.say('Goodbye');
  }

  @Intent('Credits')
  credits() {
    const url = 'https://raw.githubusercontent.com/cameronhunter/alexa-lambda-skill/master/package.json';
    return fetch(url).then(response => response.json()).then(({ name, author }) => {
      return Response.say(`${name} was created by ${author.name}`).card(name, `Credits: ${author.name} <${author.email}> (${author.url})`);
    });
  }

}
```
