import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const [background, setBackground] = useState('');
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', {
          name: name,
          background: background,
          userID: result.user.uid,
        });
        Alert.alert('Signed in Successfully!');
      })
      .catch((error) => {
        Alert.alert('Unable to sign it, please try again later.');
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../img/BackgroundImage.png')}
        resizeMode='cover'
        style={styles.bgImage}
      >
        <Text style={styles.appTitle}>Chat</Text>
        <View style={styles.box}>
          {/* Input Username \*/}
          <TextInput
            accessibilityLabel='Username input'
            accessibilityRole='text'
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
          />
          <Text style={styles.chooseBackgroundColor}>
            Choose Background Color
          </Text>
          {/* Choose Background Color of Chat \*/}
          <View style={styles.colorButtonsBox}>
            {colors.map((color, index) => (
              <TouchableOpacity
                accessibilityLabel='Color Button'
                accessibilityHint='Lets you choose a backgroundcolor for your chat.'
                accessibilityRole='button'
                key={index}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  background === color && styles.selected,
                ]}
                onPress={() => setBackground(color)}
              />
            ))}
          </View>
          {/* Start Chat \*/}
          <TouchableOpacity
            accessibilityLabel='Start Chatting'
            accessibilityRole='button'
            style={styles.button}
            onPress={signInUser}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior='padding' />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  appTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#ffffff',
    margin: 20,
  },
  box: {
    backgroundColor: '#ffffff',
    padding: 30,
    width: '88%',
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '44%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    width: '88%',
    opacity: 50,
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    borderColor: '#757083',
  },
  chooseBackgroundColor: {
    flex: 1,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  colorButtonsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 40,
    alignItems: 'center',
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  selected: {
    borderColor: 'black',
    borderWidth: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#757083',
    padding: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default Start;
