import { ExpoConfig } from "expo/config";
import { withGradleProperties } from "expo/config-plugins";

import { ConfigValidationError } from "./errors/ConfigValidationError";
import { PluginProps, PropertiesItem } from "./types";
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

  config = withAndroidKakaoSDK(config, props.required.kakaoMavenRepoUrl);
  return config;
}

function withAndroidKakaoSDK(config: ExpoConfig, kakaoMavenRepoUrl: string) {
  //maven 저장소 추가
  config = withGradleProperties(config, (config) => {
    config.modResults = addMavenRepo(config.modResults, kakaoMavenRepoUrl);
    return config;
  });
  return config;
}

function addMavenRepo(gradleProperties: PropertiesItem[], repoUrl: string) {
  const extraMavenReposProperty = gradleProperties.find(
    (prop) =>
      prop.type === "property" && prop.key === "android.extraMavenRepos",
  );

  if (extraMavenReposProperty && "value" in extraMavenReposProperty) {
    const existingRepos = JSON.parse(extraMavenReposProperty.value);
    if (!existingRepos.some((repo: { url: string }) => repo.url === repoUrl)) {
      existingRepos.push({ url: repoUrl });
    }
    extraMavenReposProperty.value = JSON.stringify(existingRepos);
  } else {
    gradleProperties.push({
      type: "property",
      key: "android.extraMavenRepos",
      value: JSON.stringify([{ url: repoUrl }]),
    });
  }

  return gradleProperties;
}

export default withInitialize;
