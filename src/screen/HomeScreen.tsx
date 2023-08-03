import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/store';
import {addTask, deleteTask, editTask, toggleTask} from '../features/taskSlice';

interface ValueInput {
  title: string;
}

export default function HomeScreen() {
  const [valueInput, setValueInput] = useState({title: ''});
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<ValueInput | null>(null);
  const [idTaskToEdit, setIdTaskToEdit] = useState<number | null>(null);

  const {tasks} = useSelector((state: RootState) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskToEdit !== null) {
      setValueInput({title: taskToEdit.title});
    }

    if (!showModal) {
      setValueInput({title: ''});
      setTaskToEdit(null);
      setTaskToEdit(null);
    }
  }, [showModal]);

  const handleChange = (name: string, textValue: string) => {
    setValueInput({...valueInput, [name]: textValue});
  };

  //envio o edita una tarea
  const handleSubmitTask = () => {
    if (!valueInput.title) return;

    if (taskToEdit !== null) {
      dispatch(editTask({valueInput, id: idTaskToEdit}));
    } else {
      dispatch(addTask({...valueInput, id: new Date().getTime()}));
    }

    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleToggleTask = (id: number) => {
    dispatch(toggleTask(id));
  };

  //obtengo la tarea y el id a editar
  const handleEdit = (id: number) => {
    const taskFound = tasks.find(item => item.id === id);
    setTaskToEdit(taskFound!);
    setIdTaskToEdit(id);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapInput}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => setShowModal(true)}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: item.completed ? 'green' : 'orange',
              marginBottom: 10,
              padding: 5,
            }}>
            <Text style={styles.tasks}>{item.title}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEdit(item.id)}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleToggleTask(item.id)}>
              <Text>
                {item.completed ? 'Task completed' : 'Task incomplete'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={showModal} animationType="slide">
        <View style={styles.containerModal}>
          <Button title="Close Modal" onPress={() => setShowModal(false)} />
          <View>
            <View style={styles.wrapInput}>
              <TextInput
                placeholder="Add Task..."
                style={styles.input}
                placeholderTextColor="#333"
                value={valueInput.title}
                onChangeText={text => handleChange('title', text)}
              />
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={handleSubmitTask}>
                <Text>{taskToEdit !== null ? 'Edit' : 'Add'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#333',
  },
  wrapInput: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  buttonAdd: {
    backgroundColor: 'violet',
    width: 50,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasks: {
    color: '#fff',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});
