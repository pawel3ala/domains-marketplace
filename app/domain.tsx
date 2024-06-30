import Counter from "@/components/Counter";
import CtaButton from "@/components/CtaButton";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TextInput } from "react-native";

const data = [
  { name: "Foo Bar", amount: "SAR 500", time: "2 minutes ago" },
  { name: "Joe Doe", amount: "SAR 450", time: "10 minutes ago" },
  { name: "John Will", amount: "SAR 400", time: "2024-03-28 10:25 AM" },
  { name: "Joe Doe", amount: "SAR 380", time: "10 minutes ago" },
  { name: "John Will", amount: "SAR 350", time: "2024-03-28 10:25 AM" },
  { name: "Foo Bar", amount: "SAR 300", time: "2024-03-28 10:20 AM" },
  { name: "John Will", amount: "SAR 250", time: "2024-03-28 10:25 AM" },
];

export default function Domain() {
  const navigation = useNavigation();
  const { domain, ending_date, latest_bid_amount } = useLocalSearchParams();
  const [bid, setBid] = useState(parseInt(latest_bid_amount) + 100); // TODO: null check

  useEffect(() => {
    navigation.setOptions({
      headerTitle: domain,
    });
  }, [navigation]);

  const onPlaceBid = () => {
    console.log("Place Bid");
  };

  return (
    <View style={styles.container}>
      <View style={styles.purpleContainer}>
        <Text style={styles.purpleContainerText}>Time Left</Text>
      </View>
      <Counter ending_date={ending_date} />

      <View style={styles.purpleContainer}>
        <Text style={styles.purpleContainerText}>Current Bid</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Enter your bid"
          value={bid.toString()}
          onChangeText={(text) => setBid(parseInt(text))}
        />
        <CtaButton
          title="Place Bid"
          onPress={onPlaceBid}
          style={{ width: undefined }}
        />
      </View>

      <View style={styles.purpleContainer}>
        <Text style={styles.purpleContainerText}>Latest Bids</Text>
      </View>
      <FlatList
        style={{ marginTop: 10 }}
        contentContainerStyle={{ gap: 10 }}
        data={data}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: index % 2 ? "#f2f2f2" : "#E6E6E6",
              padding: 10,
            }}
          >
            <Text style={styles.firstColumn}>{item.name}</Text>
            <Text style={styles.secondColumn}>{item.amount}</Text>
            <Text style={styles.thirdColumn}>{item.time}</Text>
          </View>
        )}
        keyExtractor={(item, index) => `${index}${item.name}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  purpleContainer: {
    backgroundColor: "purple",
    padding: 10,
    alignSelf: "flex-start",
  },
  purpleContainerText: {
    color: "white",
  },
  firstColumn: {
    flex: 1,
  },
  secondColumn: {
    flex: 1,
  },
  thirdColumn: {
    flex: 2,
  },
  textInput: {
    padding: 10,
    backgroundColor: "#f2f2f2",
    flex: 1,
  },
});
