import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, id) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, id);
  }
}