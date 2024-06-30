import { DomainInfo, DomainStatus, DomainSubStatus } from "@/services/api";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useCounter from "@/hooks/useCounter";
import Feather from "@expo/vector-icons/Feather";
import { useCallback } from "react";

const capitalizeFirstLetter = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const DomainCard = ({
  domain,
  ending_date,
  starting_date,
  status,
  latest_bid_amount,
  substatus,
}: DomainInfo) => {
  const timeLeftToEnd = useCounter(ending_date);
  const timeToStart = useCounter(starting_date);

  const onPress = useCallback(() => {
    if (status === DomainStatus.ACTIVE) {
      router.push({
        pathname: "/domain",
        params: { domain, latest_bid_amount, ending_date },
      });
    }
  }, [domain, ending_date, latest_bid_amount, status]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.innerContainer}>
        <View style={styles.firstRow}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>{domain}</Text>
          {status === DomainStatus.CLOSED && (
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {substatus === DomainSubStatus.WON && (
                <View style={styles.won}>
                  <Text style={styles.wonText}>
                    {capitalizeFirstLetter(substatus)}
                  </Text>
                </View>
              )}
              {substatus === DomainSubStatus.CLOSED && (
                <View style={styles.closed}>
                  <Text style={styles.clsedText}>
                    {capitalizeFirstLetter(substatus)}
                  </Text>
                </View>
              )}
            </Text>
          )}
        </View>
        {status === DomainStatus.ACTIVE && (
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                width: "50%",
              }}
            >
              <Feather name="clock" size={12} color="black" />
              <Text>
                {/*
              A workaround for BE issue:
              - There could be a case where domain is active AND there is no remaining time left
              */}
                {timeLeftToEnd
                  ? `${timeLeftToEnd?.hours}:${timeLeftToEnd?.minutes}:${timeLeftToEnd?.seconds}`
                  : ""}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
            >
              <Feather name="tag" size={12} color="black" />
              <Text>{`Latest bid: $${latest_bid_amount}`}</Text>
            </View>
          </View>
        )}
        {status === DomainStatus.UPCOMING && (
          <Text>
            {/*
              A workaround for BE issue:
              - There could be a case where domain is UPCOMING and the timestamp is incorrect
              */}
            {timeToStart
              ? `${timeToStart?.hours}:${timeToStart?.minutes}:${timeToStart?.seconds}`
              : ""}
          </Text>
        )}
        {status === DomainStatus.CLOSED && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Feather name="tag" size={12} color="black" />
            <Text>{`Latest bid: $${latest_bid_amount}`}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DomainCard;

const styles = StyleSheet.create({
  container: {
    height: 97,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 20,
    elevation: 5,
  },
  innerContainer: {
    justifyContent: "space-between",
    flex: 1,
  },
  won: {
    backgroundColor: "#e1f5e6",
    padding: 5,
    borderRadius: 5,
  },
  closed: {
    backgroundColor: "#fbe5df",
    padding: 5,
    borderRadius: 5,
  },
  wonText: {
    color: "#408b5c",
    fontWeight: "bold",
    fontSize: 10,
  },
  clsedText: {
    color: "#a82e24",
    fontWeight: "bold",
    fontSize: 10,
  },
  firstRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
});
