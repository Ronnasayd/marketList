import React from "react";
import Index from "./src/pages";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Index />
    </GestureHandlerRootView>
  );
}
