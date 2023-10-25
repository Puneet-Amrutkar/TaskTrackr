import { StyleSheet, View, Text, Image} from 'react-native'
const FallBackImage = require("../assets/todo.png")

export default function FallBack() {
    return (
        <View style={ styles.container }>
            <Image source={FallBackImage} style={ styles.image }></Image>
            <Text style={ styles.text }>Create a task</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        height: 300,
        width: 300
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    }
})