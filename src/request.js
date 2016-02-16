export default class Request {
  static intent = (...args) => new Request().intent(...args);
  static launchRequest = (...args) => new Request().launchRequest(...args);
  static sessionEndedRequest = (...args) => new Request().sessionEndedRequest(...args);

  constructor(state = {}) {
    this.state = state;
  }

  intent(name, slots = {}) {
    const slotData = Object.entries(slots).reduce((state, [name, value]) => ({ ...state, [name]: { name, value } }), {});
    return new Request({
      ...this.state,
      request: {
        type: 'IntentRequest',
        intent: {
          name: name,
          ...(Object.keys(slotData).length ? { slots: slotData } : null)
        }
      }
    });
  }

  launchRequest() {
    return new Request({
      ...this.state,
      request: {
        type: 'LaunchRequest'
      }
    });
  }

  sessionEndedRequest() {
    return new Request({
      ...this.state,
      request: {
        type: 'SessionEndedRequest'
      }
    });
  }

  build() {
    return { ...this.state };
  }
}
