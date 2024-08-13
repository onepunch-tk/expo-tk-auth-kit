import { StyleSheet, Text, View } from 'react-native';

import * as ExpoTkAuthKit from '@expo-tk/auth-kit';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoTkAuthKit.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
