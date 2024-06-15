import { DomainInfo, DomainStatus } from "@/services/api";
import { SetStateAction, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const updateRemainingTime = (
  targetDate: any,
  callback: SetStateAction<any> //TODO: Figure out how to type this
) => {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    callback(
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    );
  } else {
    callback("00:00:00");
  }
};

const DomainCard = ({
  domain,
  ending_date,
  starting_date,
  status,
  latest_bid_amount,
  substatus,
}: DomainInfo) => {
  const [startingTime, setStartingTime] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);

  useEffect(() => {
    const targetDate = new Date(ending_date).getTime();
    const intervalId = setInterval(
      () => updateRemainingTime(targetDate, setRemainingTime),
      1000
    );
    return () => clearInterval(intervalId);
  }, [ending_date]);

  useEffect(() => {
    const targetDate = new Date(starting_date).getTime();
    const intervalId = setInterval(
      () => updateRemainingTime(targetDate, setStartingTime),
      1000
    );
    return () => clearInterval(intervalId);
  }, [starting_date]);

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>{domain}</Text>
          {status === DomainStatus.CLOSED && (
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {substatus}
            </Text>
          )}
        </View>
        {status === DomainStatus.ACTIVE && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{remainingTime}</Text>
            <Text>{latest_bid_amount}</Text>
          </View>
        )}
        {status === DomainStatus.UPCOMING && <Text>{startingTime}</Text>}
        {status === DomainStatus.CLOSED && <Text>{latest_bid_amount}</Text>}
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
