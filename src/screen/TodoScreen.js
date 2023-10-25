import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native'
import { IconButton } from 'react-native-paper';
import FallBack from '../../components/FallBack';

export default function TodoScreen() {

    const [ todo, setTodo ] = useState("");
    const [ todoList, setTodoList ] = useState([]);
    const [ editedTodo, setEditedTodo ] = useState([]);

    const handleAddTodo = () => {
        if(todo==="")
        {
            return; 
        }
        setTodoList([...todoList, {
            id: Date.now().toString(),
            title: todo
        }]);
    }

    const handleDeleteTodo = (id) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodoList);
    }

    const handleEditTodo = (todo) => {
        setEditedTodo(todo);
        setTodo(todo.title); 
    }

    const handleUpdateTodo = () => {
        const updatedTodos = todoList.map((item) => {
            if(item.id === editedTodo.id)
            {
                return {...item, title: todo}
            }

            return item
        })
        
        setTodoList(updatedTodos);
        setEditedTodo(null);
        setTodo("");
    }

    const renderTodos = ({item, index}) => {
        return (
            <View style={ styles.todo }>
                <Text style={ styles.todoText }> {item.title} </Text>
                <IconButton icon="pencil" iconColor='black' onPress={() => handleEditTodo(item) }/>
                <IconButton icon="trash-can" iconColor='black' onPress={() => handleDeleteTodo(item.id) }/>
            </View>
        )
    }

    let objectDate = new Date();
    let day = objectDate.getDate();
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();
    let formated_date = month + "-" + day + "-" + year;

    return (
        <View style={{marginVertical:50}}>
            <TextInput style={ styles.inputContainer } placeholder='add a task' value={todo} onChangeText={(userText) => setTodo(userText)}></TextInput>
            {
                editedTodo ? <Pressable style={ styles.button } onPress={() => handleUpdateTodo() }>
                <Text style={ styles.buttonText }>save</Text>
                </Pressable>
                : 
                <Pressable style={ styles.button } onPress={() => handleAddTodo() }>
                <Text style={ styles.buttonText }>add task</Text>
                </Pressable>
            }
            {/* <Text> { formated_date } </Text> */}
            {/* {todoList.length <= 0 ? "" : <Text> { formated_date } </Text>} */}
            {
                todoList.length <= 0 ? <FallBack /> : 
                <View style={{flex:0}}> 
                    {/* <Text style={{marginHorizontal:"50%", fontSize:20, fontWeight:"bold", marginVertical:20}}> { formated_date } </Text> */}
                    <FlatList data={todoList} renderItem={renderTodos}/>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 20,
        borderColor:"black",
        borderWidth: 2,
        borderRadius: 6,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    button: {
        backgroundColor:"black",
        borderRadius: 6,
        paddingVertical: 12,
        marginHorizontal: 20,
        marginVertical: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    todo: {
        // display: "flex",
        flexDirection: "row",
        backgroundColor: "plum",
        marginHorizontal: 20,
        marginVertical: 12,
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 6,
    },
    todoText: {
        fontSize: 18,
        fontWeight: "bold",
        flex:1
    }
})