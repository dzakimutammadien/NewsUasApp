import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './app/_layout';
import { SavedNewsProvider } from './context/SavedNewsContext';

export default function App() {
  return (
    <SavedNewsProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SavedNewsProvider>
  );
}
