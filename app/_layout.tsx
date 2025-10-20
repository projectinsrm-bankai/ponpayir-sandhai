import {Redirect, Slot, Stack} from "expo-router";
import './globals.css';

export default function RootLayout() {
  const isAuthenticated = false;



  return (
      <Stack>
        <Stack.Screen name="index" />
        {/* add more screens if needed */}
      </Stack>
  );

// replacement done
}
