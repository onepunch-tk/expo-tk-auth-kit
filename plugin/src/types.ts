export interface PluginProps {
  required: {
    kakaoMavenRepoUrl: string;
  };
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
