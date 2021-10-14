import { StyleSheet } from 'react-native';

// gray color
// #111111
// #333333
// #555555
// #777777
// #999999

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },

    page: {
        flex: 1,
        marginHorizontal: 10,
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 25,
    },
    subTitle: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },

    vocaCard: {
        backgroundColor: "#333",
        width: "100%",
        marginVertical: 10,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    vocaText: {
        fontSize: 30,
        fontWeight: "700",
    },
    vocaInterpretation: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 20
    },
    vocaDescription: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 15
    },

    input: {
        width: "100%",
        height: 60,
        backgroundColor: "#999999",
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 20,
        marginVertical: 7,
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    floatingButton: {
        backgroundColor: "white",
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 10,
        right: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    text: {
        color: "white",
    },
    buttonText: {
        color: "#333",
        fontSize: 24,
        fontWeight: "500"
    },
    titleText: {
        color: "white",
        fontSize: 40,
        fontWeight: "900"
    },
    subTitleText: {
        color: "white",
        fontSize: 30,
        fontWeight: "700"
    }
});
