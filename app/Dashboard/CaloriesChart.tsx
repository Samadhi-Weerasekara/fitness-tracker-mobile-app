import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

interface WorkoutData {
    type: string;
    calories: number;
}

interface CaloriesChartProps {
    workouts: WorkoutData[];
}

const COLORS: { [key: string]: string } = {
    Running: "#3B82F6",
    "Weight Training": "#EF4444",
    Swimming: "#10B981",
    Cycling: "#F59E0B",
    Yoga: "#8B5CF6",
    Sports: "#EC4899",
};

export function CaloriesChart({ workouts }: CaloriesChartProps) {
    if (workouts.length === 0) {
        return null;
    }

    const caloriesByType = workouts.reduce<{ [key: string]: number }>((acc, workout) => {
        acc[workout.type] = (acc[workout.type] || 0) + workout.calories;
        return acc;
    }, {});

    const data = Object.entries(caloriesByType).map(([name, value]) => ({
        name,
        calories: value,
        color: COLORS[name] || "#CBD5E1",
        legendFontColor: "#7f7f7f",
        legendFontSize: 14,
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calories Burned by Workout Type 📊</Text>
            <PieChart
                data={data}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="calories"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        </View>
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
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        textAlign: "center",
    },
});
