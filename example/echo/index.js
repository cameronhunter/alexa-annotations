import { Skill, Response, Intent, Launch } from '../../build/alexa-lambda-skill';

@Skill
export default class Echo {

  @Launch
  launch() {
    return Response.say('Welcome to the example Echo skill!');
  }

  @Intent('echo')
  echo({ sentence }) {
    return Response.say(sentence).card('Echo', sentence);
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return Response.say('I repeat whatever you say to me!');
  }

}
