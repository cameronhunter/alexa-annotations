import { Skill, Response, Intent, Launch } from '../../build/alexa-lambda-skill';

@Skill
export default class HelloWorld {

  @Launch
  launch() {
    return Response.say('Welcome to the Alexa Skills Kit, you can say hello').reprompt('You can say hello');
  }

  @Intent('HelloWorldIntent')
  hello() {
    return Response.say('Hello World!').card('Greeter', 'Hello World!');
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return Response.say('You can say hello to me!').reprompt('You can say hello to me!');
  }

}
