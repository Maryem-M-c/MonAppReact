import {
  FlatList,
  Text,
  ActivityIndicator,
  Button,
  View,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { fetchTodosFetch } from "../services/api";
import { ThemeContext } from "../context/ThemeContext";

export default function TodoListFetchScreen() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchTodosFetch()
      .then(setTodos)
      .catch(() => setError("Impossible de charger les tâches"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
      }}
    >
      <Button
        title={`Passer en mode ${theme === "light" ? "dark" : "light"}`}
        onPress={toggleTheme}
      />

      {error && (
        <Text style={{ color: "red", textAlign: "center", margin: 10 }}>
          {error}
        </Text>
      )}

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text
            style={{
              padding: 15,
              borderBottomWidth: 1,
              borderColor: "#ccc",
              color: theme === "dark" ? "#ffffff" : "#000000",
            }}
          >
            {item.title}
          </Text>
        )}
      />
    </View>
  );
}
