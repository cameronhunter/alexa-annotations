# alexa-lambda-skill

Easily create Alexa Skills to run on AWS Lambda using ES6.

## Example

```javascript
import Alexa from "alexa-lambda-skill";

class MySkill {
  // Called when a LaunchRequest is triggered
  launch() {
    console.log("My skill launched!");
  }

  // Called when the IntentRequest "speak" is triggered
  speak(slots) {
    const { sentence } = slots;
    return {
      outputSpeech: {
        type: "PlainText",
        text: sentence
      }
    };
  }

  // Called when an intent doesn't have a specific handler
  intent(name, slots) {
    return Promise.reject(`Unhandled intent "${name}"`);
  }
}

export default new Alexa.Handler(new MySkill());
```
