import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  container: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 12,
  },
});
