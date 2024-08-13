import * as React from 'react';

import { ExpoTkAuthKitViewProps } from './ExpoTkAuthKit.types';

export default function ExpoTkAuthKitView(props: ExpoTkAuthKitViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
