import { View, Text, StyleSheet } from "react-native";

const DomainCard = ({ name, lastBid }: { name: string; lastBid: number }) => {
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{name}</Text>
        <Text>{name}</Text>
      </View>
    </View>
  );
};

export default DomainCard;

const styles = StyleSheet.create({
  container: {
    height: 97,
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
});
