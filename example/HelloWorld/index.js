import { Skill, Intent, Launch } from '../..';
import Response from 'alexa-response';
import fetch from 'isomorphic-fetch';

@Skill
export default class HelloWorld {

  @Launch
  launch() {
    return Response.ask('Welcome to the Alexa Skills Kit, you can say hello').reprompt('You can say hello');
  }

  @Intent('HelloWorldIntent')
  hello() {
    return Response.say('Hello World!').card('Greeter', 'Hello World!');
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return Response.ask('You can say hello to me!').reprompt('You can say hello to me!');
  }

  @Intent('Credits')
  credits() {
    const url = 'https://raw.githubusercontent.com/cameronhunter/alexa-lambda-skill/master/package.json';
    return fetch(url).then(response => response.json()).then(({ author }) => {
      return Response.say(`Hello World was created by ${author.name}`).card('Hello World', `Credits: ${author.name} <${author.email}> (${author.url})`);
    });
  }

}
