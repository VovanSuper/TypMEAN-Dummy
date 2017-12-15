import { EventDetailsComponent } from '../../../events/components/';

export function canDeactivate(component: EventDetailsComponent) {
  if (component.isDirty) {
    return window.confirm('Really wanna leave?!');
  }
  return true;
}
