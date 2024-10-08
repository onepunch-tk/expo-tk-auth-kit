import { ConfigValidationError } from "../errors/ConfigValidationError";
import { PluginProps } from "../types";

export function validateProps(
  props: Partial<PluginProps>,
): asserts props is PluginProps {
  if (!props.required) {
    throw new ConfigValidationError(
      "Missing 'required' field in plugin configuration",
    );
  }
  if (typeof props.required.kakaoMavenRepoUrl !== "string") {
    throw new ConfigValidationError(
      "kakaoMavenRepoUrl is required and must be a string",
    );
  }

  if (
    props.kakaoAuth &&
    !props.kakaoAuth.nativeAppKey &&
    typeof props.kakaoAuth.nativeAppKey !== "string"
  ) {
    throw new ConfigValidationError(
      "Kakao OAuth authentication, you must provide a valid API Key as a string.",
    );
  }
}
