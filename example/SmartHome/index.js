import { Skill, Discovery, TurnOn, TurnOff, Control } from '../..';
import { devices, brightness } from './appliances';

@Skill
export default class SmartHome {

  @Discovery
  discovery() {
    return devices();
  }

  @TurnOn
  on(applianceId) {
    return brightness(applianceId, 100);
  }

  @TurnOff
  off(applianceId) {
      return brightness(applianceId, 0);
  }

  @Control('SetPercentageRequest', 'IncrementPercentageRequest', 'DecrementPercentageRequest')
  percentage(applianceId, control, payload = {}) {
    switch (control) {
      case 'SetPercentageRequest':
        return brightness(applianceId, payload.percentageState.value);

      case 'IncrementPercentageRequest':
        return brightness(applianceId).then(value => brightness(applianceId, value + payload.deltaPercentage.value));

      case 'DecrementPercentageRequest':
        return brightness(applianceId).then(value => brightness(applianceId, value - payload.deltaPercentage.value));

      default:
        return Promise.reject();
    }
  }

}
