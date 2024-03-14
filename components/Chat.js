import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, background } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.text}>Hello, Welcome to Chat!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default Chat;
