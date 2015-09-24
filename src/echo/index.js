export default class Echo {
  launch() {
    return {
      outputSpeech: {
        type: "PlainText",
        text: "Hello echo world!"
      },
      shouldEndSession: true
    };
  }

  color(slots) {
    const { Color = "unknown" } = slots;
    return {
      outputSpeech: {
        type: "PlainText",
        text: `Your favorite color is ${Color}`
      },
      shouldEndSession: true
    };
  }
}
