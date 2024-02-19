import { StyleSheet, Dimensions } from "react-native"
const WIDTH = Dimensions.get("window").width - 40;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        marginVertical: 40,
        marginHorizontal: 20,
        // height: "100%",
    },
    rangeLabelContainer: {
        width: WIDTH,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    rangeLabel: {
        width: 30,
    },
    tackPath: {
        height: 3,
        width: WIDTH,
        borderRadius: 6,
        backgroundColor: "#000",
    },
    knob: {
        position: "absolute",
        height: 15,
        width: 15,
        backgroundColor: "white",
        marginTop: -9,
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 50,
    },
});
