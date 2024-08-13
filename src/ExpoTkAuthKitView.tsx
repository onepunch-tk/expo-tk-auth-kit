import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoTkAuthKitViewProps } from './ExpoTkAuthKit.types';

const NativeView: React.ComponentType<ExpoTkAuthKitViewProps> =
  requireNativeViewManager('ExpoTkAuthKit');

export default function ExpoTkAuthKitView(props: ExpoTkAuthKitViewProps) {
  return <NativeView {...props} />;
}
