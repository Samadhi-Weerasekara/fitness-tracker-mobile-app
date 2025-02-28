import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

export function Header() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80" }}
                style={styles.imageBackground}
            >
                <View style={styles.overlay} />
                <View style={styles.content}>
                    <Text style={styles.title}>Track Your Fitness Journey</Text>
                    <Text style={styles.description}>
                        Log your workouts, track your progress, and achieve your fitness goals
                    </Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        overflow: "hidden",
        marginBottom: 20,
    },
    imageBackground: {
        height: 200,
        justifyContent: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    content: {
        padding: 16,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 8,
    },
    description: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
});
