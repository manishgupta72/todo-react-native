import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import Fallback from "../components/Fallback";

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const handleAddTodo = () => {
    if (todo === "") {
      return;
    }
    setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
    setTodo("");
  };
  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };
  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setTodo(todo.title);
  };

  //handle update todo

  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === editTodo.id) {
        return { ...item, title: todo };
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditTodo(null);
    setTodo("");
  };

  const renderTodos = ({ item, index }) => {
    return (
      <SafeAreaView>
        <View style={styles.contentStyle}>
          <Text
            style={{ color: "#fff", fontWeight: "bold", fontSize: 16, flex: 1 }}
          >
            {item.title}
          </Text>
          <IconButton
            icon="pencil"
            iconColor="#fff"
            onPress={() => handleEditTodo(item)}
          />
          <IconButton
            icon="trash-can"
            iconColor="#fff"
            onPress={() => handleDeleteTodo(item.id)}
          />
        </View>
      </SafeAreaView>
    );
  };
  return (
    <View style={[styles.container, styles.gradientBackground]}>
      <TextInput
        style={styles.textInput}
        placeholder="Add a task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />

      {editTodo ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleUpdateTodo()}
        >
          <Text
            style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
          >
            Save Task
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => handleAddTodo()}>
          <Text
            style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
          >
            Add Task
          </Text>
        </TouchableOpacity>
      )}
      {/* Render todo list */}

      <FlatList data={todoList} renderItem={renderTodos} />
      {todoList.length <= 0 && <Fallback />}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 20,
  },
  gradientBackground: {
    backgroundColor: "linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Semi-transparent for glass effect
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 5,
  },
  button: {
    backgroundColor: "rgba(0, 122, 255, 0.8)", // Subtle blue
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  contentStyle: {
    backgroundColor: "rgba(30, 144, 255, 0.85)", // Translucent background
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  todoText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    flex: 1,
  },
});
