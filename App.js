import { useEffect, useState, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { initDB } from "./services/database";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import TodoListOfflineScreen from "./screens/TodoListOfflineScreen";

/* App avec thème */
function MainApp() {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.dark : styles.light,
      ]}
    >
      <TodoListOfflineScreen />
    </View>
  );
}

/* App principale */
export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const prepareDb = async () => {
      initDB(); // SQLite synchrone
      setDbReady(true);
    };

    prepareDb();
  }, []);

  if (!dbReady) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  light: {
    backgroundColor: "#ffffff",
  },
  dark: {
    backgroundColor: "#121212",
  },
});

/*import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import AppDrawer from "./navigation/AppDrawer";
import LoginScreen from "./screens/LoginScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";

function RootNavigator() {
  const { user } = useContext(AuthContext);
  return user ? <AppDrawer /> : <LoginScreen />;
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}
*/