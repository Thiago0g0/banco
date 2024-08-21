import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Fazer a tarefa',
    completed: false,
    date: '2024-08-13', 
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Ir ao mercado',
    completed: false,
    date: '2024-08-14', 
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Fazer prova TOIC',
    completed: false,
    date: '2024-08-15', 
  },
  {
    id: '58794a0f-3da1-471f-bd96-145571e29d72',
    title: 'Pintar a unha',
    completed: false,
    date: '2024-08-15', 
  },
];

const Item = ({ item, onPress, backgroundColor, textColor, textDecoration }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.title, { color: textColor, textDecorationLine: textDecoration }]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [tasks, setTasks] = useState(DATA);

  useEffect(() => {
    const markOldTasksAsCompleted = () => {
      const today = new Date().toISOString().split('T')[0]; 
      setTasks(tasks.map(task =>
        new Date(task.date) < new Date(today)
          ? { ...task, completed: true }
          : task
      ));
    };

    markOldTasksAsCompleted();
  }, []);

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.completed ? '#C0C0C0' : '#A9A9A9';
    const color = item.completed ? 'black' : 'black';
    const textDecoration = item.completed ? 'line-through' : 'none';

    return (
      <Item
        item={item}
        onPress={() => toggleCompletion(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
        textDecoration={textDecoration}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={tasks}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    width: 500,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});

export default App;