import { ExpoConfig } from "expo/config";
import {
  AndroidConfig,
  withAndroidManifest,
  withGradleProperties,
  withStringsXml,
} from "expo/config-plugins";

import { KakaoAuth, PropertiesItem } from "../types";

export function withKakaoAuth(
  config: ExpoConfig,
  props: KakaoAuth,
  kakaoMavenRepoUrl: string,
) {
  //kakao sdk 설치
  config = withAndroidKakaoSDK(config, kakaoMavenRepoUrl);
  const { android, ios, nativeAppKey } = props;
  if (android) {
    //kakao auth Activity 추가
    config = withAndroidKakaoManifest(config, nativeAppKey);
    config = withAndroidKakaoAddResource(config, nativeAppKey);
  }
  return config;
}
// function withAndroidKakaoBuildConfig(config: ExpoConfig, nativeAppKey: string) {
//   return withGradleProperties(config, (config) => {
//     config.modResults.push({
//       type: "property",
//       key: "KAKAO_APP_KEY",
//       value: nativeAppKey,
//     });
//     return config;
//   });
// }

function withAndroidKakaoAddResource(config: ExpoConfig, nativeAppKey: string) {
  return withStringsXml(config, (config) => {
    if (!config.modResults.resources.string) {
      config.modResults.resources.string = [];
    }

    config.modResults.resources.string.push({
      $: { name: "kakao_app_key" },
      _: nativeAppKey,
    });

    return config;
  });
}

function withAndroidKakaoManifest(config: ExpoConfig, nativeAppKey: string) {
  return withAndroidManifest(config, (config) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults,
    );
    const kakaoAuthActivity: AndroidConfig.Manifest.ManifestActivity = {
      $: {
        "android:name": "com.kakao.sdk.auth.AuthCodeHandlerActivity",
        "android:exported": "true",
      },
      "intent-filter": [
        {
          action: [
            {
              $: {
                "android:name": "android.intent.action.VIEW",
              },
            },
          ],
          category: [
            { $: { "android:name": "android.intent.category.DEFAULT" } },
            { $: { "android:name": "android.intent.category.BROWSABLE" } },
          ],
          data: [
            {
              $: {
                "android:host": "oauth",
                "android:scheme": `kakao${nativeAppKey}`,
              },
            },
          ],
        },
      ],
    };
    if (!mainApplication.activity) {
      mainApplication.activity = [];
    }
    mainApplication.activity.push(kakaoAuthActivity);
    return config;
  });
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
