# alexa-lambda-skill

[![Build Status](https://travis-ci.org/cameronhunter/alexa-lambda-skill.svg?branch=master)](https://travis-ci.org/cameronhunter/alexa-lambda-skill) [![NPM Version](https://img.shields.io/npm/v/alexa-lambda-skill.svg)](https://npmjs.org/package/alexa-lambda-skill) [![License](https://img.shields.io/npm/l/alexa-lambda-skill.svg)](https://github.com/cameronhunter/alexa-lambda-skill/blob/master/LICENSE)

Easily create Alexa Skills to run on AWS Lambda using ES2015.

## Example

```javascript
import { Skill, Response, Intent, Launch, SessionEnded } from 'alexa-lambda-skill';

@Skill
export default class MySkill {

  @Launch
  launch() {
    console.log('My skill launched!');
  }

  @Intent('speak')
  speak(slots) {
    const { sentence } = slots;
    return Response.say(sentence).card('MySkill', `Said '${sentence}'`);
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return Response.say('Help!');
  }

  @SessionEnded
  sessionEnded(reason) {
    console.log(`Session ended: '${reason}'`);
  }
}
```
