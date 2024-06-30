import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useCounter from "@/hooks/useCounter";

const Counter = ({ ending_date }: { ending_date: "string" }) => {
  const timeLeftToEnd = useCounter(ending_date);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.digitText}>{timeLeftToEnd?.days}</Text>
        <Text style={styles.charText}>days</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.digitText}>:</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.digitText}>{timeLeftToEnd?.hours}</Text>
        <Text style={styles.charText}>hours</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.digitText}>:</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.digitText}>{timeLeftToEnd?.minutes}</Text>
        <Text style={styles.charText}>min</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.digitText}>:</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.digitText}>{timeLeftToEnd?.seconds}</Text>
        <Text style={styles.charText}>sec</Text>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subContainer: {
    width: "15%",
    alignItems: "center",
  },
  digitText: { fontSize: 41 },
  charText: { fontSize: 17, alignSelf: "center" },
});
