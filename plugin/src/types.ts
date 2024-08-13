export interface KakaoAuth {
  nativeAppKey: string;
  android?: boolean;
  ios?: boolean;
}
export interface PluginProps {
  required: {
    kakaoMavenRepoUrl: string;
  };
  kakaoAuth?: KakaoAuth;
}

export type PropertiesItem =
  | {
      type: "comment";
      value: string;
    }
  | {
      type: "empty";
    }
  | {
      type: "property";
      key: string;
      value: string;
    };
