import { Skill, Response, Intent, Launch, SessionEnded } from '..';

@Skill
export default class MySkill {

  @Launch
  launch() {
    return Response.say('Skill launched!');
  }

  @Intent('speak')
  speak(slots) {
    const { sentence } = slots;
    return Response.say(sentence).card('MySkill', `Said '${sentence}'`);
  }

  @Intent('AMAZON.HelpIntent', 'help')
  help() {
    return Response.say('Help');
  }

  @SessionEnded
  sessionEnded(reason) {
    console.log(`Session ended: '${reason}'`);
  }
}
