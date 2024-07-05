/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MatchingDiagram from './MatchingDiagram/MatchingDiagram';

const mockLeftData = ['a', 'b', 'c', 'd'];
const mockRightData = ['e', 'f', 'g', 'h'];

type IDataType = (typeof mockLeftData)[0];

const MatchingDiagramExample = () => {
  const [isStateClear, setIsStateClear] = useState(false);

  const clearState = () => {
    setIsStateClear(true);
    setTimeout(() => setIsStateClear(false), 500);
  };

  return (
    <View>
      {/* ONE LINE */}
      <View>
        <Text style={styles.title}>One Line : </Text>
        <MatchingDiagram<IDataType>
          leftData={mockLeftData.map((data) => ({ label: data }))}
          rightData={mockRightData.map((data) => ({ label: data }))}
          clearState={isStateClear}
          lineStyle={{ stroke: 'black', strokeWidth: 4 }}
          parentContainerStyle={styles.parentContainer}
          // onAllItemMatched={datas => console.log('onAllItemMatched ', datas)}
          // onOneItemMatched={datas => console.log('onOneItemMatched ', datas)}
          renderContent={({ data, side, isSelected }) => {
            return (
              <View
                style={[
                  styles.content,
                  {
                    backgroundColor: isSelected ? 'grey' : 'white',
                    marginRight: side !== 'right' ? 10 : 0,
                    marginLeft: side !== 'left' ? 10 : 0,
                  },
                ]}
              >
                <Text>{data?.label}</Text>
              </View>
            );
          }}
        />
      </View>

      {/* MULTIPLE LINE */}
      <View>
        <Text style={styles.title}>Multiple Line : </Text>
        <MatchingDiagram<IDataType>
          leftData={mockLeftData.map((data) => ({ label: data }))}
          rightData={mockRightData.map((data) => ({ label: data }))}
          clearState={isStateClear}
          lineStyle={{ stroke: 'black', strokeWidth: 4 }}
          parentContainerStyle={styles.parentContainer}
          isCanSelectMultiLinePerItem
          // onAllItemMatched={datas => console.log('onAllItemMatched ', datas)}
          // onOneItemMatched={datas => console.log('onOneItemMatched ', datas)}
          renderContent={({ data, side, isSelected }) => {
            return (
              <View
                style={[
                  styles.content,
                  {
                    backgroundColor: isSelected ? 'grey' : 'white',
                    marginRight: side !== 'right' ? 10 : 0,
                    marginLeft: side !== 'left' ? 10 : 0,
                  },
                ]}
              >
                <Text>{data?.label}</Text>
              </View>
            );
          }}
        />
      </View>
      <Pressable
        onPress={clearState}
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
      >
        <Text style={styles.buttonText}>Clear Lines</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    marginVertical: 12,
  },
  content: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
});

export { MatchingDiagramExample };
