import { ExpoConfig } from "expo/config";

import { withKakaoAuth } from "./android/withKakaoAuth";
import { ConfigValidationError } from "./errors/ConfigValidationError";
import { PluginProps } from "./types";
import { logConfigError } from "./utils/logger";
import { validateProps } from "./validators/propsValidator";

function withInitialize<T extends PluginProps>(config: ExpoConfig, props: T) {
  try {
    validateProps(props);
  } catch (error) {
    if (error instanceof ConfigValidationError) {
      logConfigError(error);
    }
    throw error;
  }

  if (props.kakaoAuth) {
    config = withKakaoAuth(
      config,
      props.kakaoAuth,
      props.required.kakaoMavenRepoUrl,
    );
  }

  return config;
}

export default withInitialize;
