import { Skill } from "../alexa"

export default class Echo extends Skill {
  launch() {
    return {
      outputSpeech: {
        type: "PlainText",
        text: "Hello echo world!"
      },
      shouldEndSession: true
    };
  }
}
