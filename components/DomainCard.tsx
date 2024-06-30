import { DomainInfo, DomainStatus } from "@/services/api";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useCounter from "@/hooks/useCounter";

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

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.push({
          pathname: "/domain",
          params: { domain, latest_bid_amount, ending_date },
        });
      }}
    >
      <View style={styles.innerContainer}>
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
            <Text>
              {/*
              A workaround for BE issue:
              - There could be a case where domain is active AND there is no remaining time left
              */}
              {timeLeftToEnd
                ? `${timeLeftToEnd?.hours}:${timeLeftToEnd?.minutes}:${timeLeftToEnd?.seconds}`
                : ""}
            </Text>
            <Text>{latest_bid_amount}</Text>
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
        {status === DomainStatus.CLOSED && <Text>{latest_bid_amount}</Text>}
      </View>
    </TouchableOpacity>
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
  innerContainer: {
    justifyContent: "space-between",
    flex: 1,
  },
});
