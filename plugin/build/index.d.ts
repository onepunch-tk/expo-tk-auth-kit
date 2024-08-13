import { ExpoConfig } from "expo/config";
interface NewNameProps {
    name: string;
}
declare function withNewName<T extends NewNameProps>(config: ExpoConfig, props: T): ExpoConfig;
export default withNewName;
