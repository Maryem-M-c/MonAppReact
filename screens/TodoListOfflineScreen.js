import { View, Text, FlatList, Button, TextInput } from "react-native";
import { useEffect, useState, useContext } from "react";
import {
  loadTodos,
  addTodoOffline,
  updateTodoOffline,
} from "../services/database";
import { ThemeContext } from "../context/ThemeContext";

export default function TodoListOfflineScreen() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  /* Charger les todos depuis SQLite */
  const refreshTodos = () => {
    setTodos(loadTodos());
  };

  /* Ajouter ou modifier une tâche */
  const handleAddOrUpdate = () => {
    if (!title.trim()) return;

    if (editingId !== null) {
      // UPDATE OFFLINE
      updateTodoOffline(editingId, title);
      setEditingId(null);
    } else {
      // ADD OFFLINE
      addTodoOffline(title);
    }

    setTitle("");
    refreshTodos();
  };

  /* Chargement initial */
  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <>
      {/* Theme toggle */}
      <Button
        title={`Passer en mode ${theme === "light" ? "dark" : "light"}`}
        onPress={toggleTheme}
      />

      {/* Add / Update */}
      <View style={{ padding: 10 }}>
        <TextInput
          placeholder="Tâche offline"
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 10,
            borderColor: theme === "dark" ? "#fff" : "#000",
            color: theme === "dark" ? "#fff" : "#000",
          }}
        />

        <Button
          title={editingId ? "✏️ Mettre à jour" : "➕ Ajouter hors ligne"}
          onPress={handleAddOrUpdate}
        />
      </View>

      {/* Liste des tâches */}
      {todos.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Aucune tâche disponible hors ligne
        </Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: theme === "dark" ? "#fff" : "#000",
                }}
              >
                {item.title}
              </Text>

              <Button
                title="✏️"
                onPress={() => {
                  setTitle(item.title);
                  setEditingId(item.id);
                }}
              />
            </View>
          )}
        />
      )}
    </>
  );
}
