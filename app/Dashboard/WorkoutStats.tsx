import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WorkoutData } from "./WorkoutForm";
import { MaterialIcons } from "@expo/vector-icons";

interface WorkoutStatsProps {
    workouts: WorkoutData[];
}

export function WorkoutStats({ workouts }: WorkoutStatsProps) {
    const totalWorkouts = workouts.length;
    const totalCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0);
    const totalMinutes = workouts.reduce((sum, workout) => sum + workout.duration, 0);
    const thisWeekWorkouts = workouts.filter((workout) => {
        const workoutDate = new Date(workout.date);
        const today = new Date();
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
        return workoutDate >= weekStart;
    }).length;

    return (
        <View style={styles.statsContainer}>
            <View style={styles.statCard}>
                <MaterialIcons name="fitness-center" size={24} color="#3b82f6" />
                <Text style={styles.statLabel}>Total Workouts</Text>
                <Text style={styles.statValue}>{totalWorkouts}</Text>
            </View>
            <View style={styles.statCard}>
                <MaterialIcons name="local-fire-department" size={24} color="#f97316" />
                <Text style={styles.statLabel}>Total Calories</Text>
                <Text style={styles.statValue}>{totalCalories}</Text>
            </View>
            <View style={styles.statCard}>
                <MaterialIcons name="access-time" size={24} color="#10b981" />
                <Text style={styles.statLabel}>Total Minutes</Text>
                <Text style={styles.statValue}>{totalMinutes}</Text>
            </View>
            <View style={styles.statCard}>
                <MaterialIcons name="event" size={24} color="#8b5cf6" />
                <Text style={styles.statLabel}>This Week</Text>
                <Text style={styles.statValue}>{thisWeekWorkouts}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    statCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flex: 1,
        marginHorizontal: 5,
    },
    statLabel: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
});
