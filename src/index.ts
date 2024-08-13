import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoTkAuthKit.web.ts
// and on native platforms to ExpoTkAuthKit.ts
import ExpoTkAuthKitModule from './ExpoTkAuthKitModule';
import ExpoTkAuthKitView from './ExpoTkAuthKitView';
import { ChangeEventPayload, ExpoTkAuthKitViewProps } from './ExpoTkAuthKit.types';

// Get the native constant value.
export const PI = ExpoTkAuthKitModule.PI;

export function hello(): string {
  return ExpoTkAuthKitModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoTkAuthKitModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoTkAuthKitModule ?? NativeModulesProxy.ExpoTkAuthKit);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoTkAuthKitView, ExpoTkAuthKitViewProps, ChangeEventPayload };
