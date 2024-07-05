import { StyleSheet, View } from 'react-native';
import { MatchingDiagramExample } from './MatchDiagramExample';

export default function App() {
  return (
    <View style={styles.container}>
      <MatchingDiagramExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
