import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface WorkoutData {
    id: string;
    exercise: string;
    type: string;
    duration: number;
    calories: number;
    date: string;
}

interface WorkoutCardProps {
    workout: WorkoutData;
    onDelete: (id: string) => void;
}

const workoutEmojis: { [key: string]: string } = {
    Running: "🏃‍♂️",
    "Weight Training": "🏋️‍♂️",
    Swimming: "🏊‍♂️",
    Cycling: "🚴‍♂️",
    Yoga: "🧘‍♂️",
    Sports: "⚽",
};

const getIntensityColor = (calories: number) => {
    if (calories >= 500) return "#FEE2E2"; // Light Red
    if (calories >= 300) return "#FFEDD5"; // Light Orange
    return "#D1FAE5"; // Light Green
};

const getIntensityEmoji = (calories: number) => {
    if (calories >= 500) return "🔥";
    if (calories >= 300) return "💪";
    return "✨";
};

export function WorkoutCard({ workout, onDelete }: WorkoutCardProps) {
    const emoji = workoutEmojis[workout.type] || "🏃‍♂️";
    const intensityColor = getIntensityColor(workout.calories);
    const intensityEmoji = getIntensityEmoji(workout.calories);

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.iconContainer}>
                    <Text style={styles.emoji}>{emoji}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.exercise}>{workout.exercise}</Text>
                    <Text style={styles.type}>{workout.type}</Text>
                    <View style={styles.statsRow}>
                        <Text style={styles.stat}>⏱️ {workout.duration} mins</Text>
                        <Text style={[styles.stat, { backgroundColor: intensityColor }]}>🔥 {workout.calories} cal {intensityEmoji}</Text>
                        <Text style={styles.stat}>🕐 {new Date(workout.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => onDelete(workout.id)} style={styles.deleteButton}>
                    <MaterialIcons name="delete" size={20} color="#EF4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    iconContainer: {
        backgroundColor: "#E0E7FF",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    emoji: {
        fontSize: 24,
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    exercise: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    type: {
        fontSize: 14,
        color: "#6366F1",
        marginBottom: 6,
    },
    statsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    stat: {
        fontSize: 12,
        color: "#555",
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 6,
    },
    deleteButton: {
        padding: 6,
    },
});
