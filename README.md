# alexa-lambda-skill

[![Build Status](https://travis-ci.org/cameronhunter/alexa-lambda-skill.svg?branch=master)](https://travis-ci.org/cameronhunter/alexa-lambda-skill) [![NPM Version](https://img.shields.io/npm/v/alexa-lambda-skill.svg)](https://npmjs.org/package/alexa-lambda-skill) [![License](https://img.shields.io/npm/l/alexa-lambda-skill.svg)](https://github.com/cameronhunter/alexa-lambda-skill/blob/master/LICENSE)

Easily create Alexa Skills to run on AWS Lambda using ES2015.

## Example

```javascript
import { Skill, Response } from 'alexa-lambda-skill';

@Skill()
export default class MySkill {
  // Called when a LaunchRequest is triggered
  launch() {
    console.log('My skill launched!');
  }

  // Called when the IntentRequest 'speak' is triggered
  speak(slots) {
    const { sentence } = slots;
    return Response.say(sentence).card('MySkill', `Said '${sentence}'`);
  }

  // Called when the IntentRequest doesn't have a specific handler
  intent(name, slots) {
    return Promise.reject(`Unhandled intent '${name}'`);
  }

  // Called when a SessionEndedRequest is triggered
  sessionEnded(reason) {
    console.log(`Session ended: '${reason}'`);
  }
}
```
