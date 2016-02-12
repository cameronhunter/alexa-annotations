# alexa-lambda-skill

Easily create Alexa Skills to run on AWS Lambda using ES6.

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
