import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface WorkoutFormProps {
    onAddWorkout: (workout: WorkoutData) => void;
}

export interface WorkoutData {
    id: string;
    exercise: string;
    duration: number;
    calories: number;
    date: string;
    type: string;
}

const workoutTypes = [
    { name: "Running", icon: "🏃‍♂️" },
    { name: "Weight Training", icon: "🏋️‍♂️" },
    { name: "Swimming", icon: "🏊‍♂️" },
    { name: "Cycling", icon: "🚴‍♂️" },
    { name: "Yoga", icon: "🧘‍♂️" },
    { name: "Sports", icon: "⚽" },
];

export function WorkoutForm({ onAddWorkout }: WorkoutFormProps) {
    const [exercise, setExercise] = useState("");
    const [duration, setDuration] = useState("");
    const [calories, setCalories] = useState("");
    const [selectedType, setSelectedType] = useState(workoutTypes[0].name);

    const handleSubmit = () => {
        if (!exercise.trim() || !duration || !calories) return;
        const newWorkout: WorkoutData = {
            id: Date.now().toString(),
            exercise: exercise.trim(),
            duration: Number(duration),
            calories: Number(calories),
            date: new Date().toISOString(),
            type: selectedType,
        };
        onAddWorkout(newWorkout);
        setExercise("");
        setDuration("");
        setCalories("");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log Your Workout</Text>
            <FlatList
                data={workoutTypes}
                horizontal
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedType(item.name)}
                        style={[
                            styles.workoutType,
                            selectedType === item.name && styles.selectedType,
                        ]}
                    >
                        <Text style={styles.emoji}>{item.icon}</Text>
                        <Text style={styles.workoutText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <TextInput
                placeholder="Exercise Name"
                value={exercise}
                onChangeText={setExercise}
                style={styles.input}
            />
            <TextInput
                placeholder="Duration (minutes)"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Calories Burned"
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
                style={styles.input}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Log Workout 💪</Text>
            </TouchableOpacity>
        </View>
    );
}

export function WorkoutList({ workouts, onDeleteWorkout }: { workouts: WorkoutData[], onDeleteWorkout: (id: string) => void }) {
    if (workouts.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No workouts logged yet. Start adding some!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={workouts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.workoutCard}>
                    <Text style={styles.workoutTitle}>{item.exercise} - {item.type}</Text>
                    <Text>Duration: {item.duration} min | Calories: {item.calories}</Text>
                    <TouchableOpacity onPress={() => onDeleteWorkout(item.id)}>
                        <MaterialIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    workoutType: {
        padding: 10,
        backgroundColor: "#f3f4f6",
        borderRadius: 8,
        marginRight: 8,
        alignItems: "center",
    },
    selectedType: {
        backgroundColor: "#3b82f6",
    },
    workoutText: {
        fontSize: 14,
        color: "#333",
    },
    emoji: {
        fontSize: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#3b82f6",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    emptyContainer: {
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
    },
    workoutCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    workoutTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
