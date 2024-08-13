import { ExpoConfig } from "expo/config";

interface NewNameProps {
  name: string;
}
function withNewName<T extends NewNameProps>(config: ExpoConfig, props: T) {
  console.log(config);
  console.log(props.name);
  return config;
}

export default withNewName;
