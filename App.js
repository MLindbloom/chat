import { useEffect } from 'react';
import { StyleSheet, LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

// Import the Screens
import Start from './components/Start';
import Chat from './components/Chat';

// Import React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Create the Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Web app Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyBMYIOI7DVJsdt5wOGID5O0YqXkF4wImvc',
    authDomain: 'chatapp-4a3f6.firebaseapp.com',
    projectId: 'chatapp-4a3f6',
    storageBucket: 'chatapp-4a3f6.appspot.com',
    messagingSenderId: '609003799294',
    appId: '1:609003799294:web:d957d572e4bd06b8a8dbaf',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
