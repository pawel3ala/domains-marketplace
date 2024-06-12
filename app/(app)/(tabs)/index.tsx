import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";

import { DomainInfo } from "@/services/api";
import React, { useCallback, useEffect, useState } from "react";
import DomainCard from "@/components/DomainCard";
import { usePaginatedDomains } from "@/hooks/usePaginatedDomains";
import { router } from "expo-router";

export default function HomeScreen() {
  const { domains, pagination, isLoading, nextPage, currentPage } =
    usePaginatedDomains();
  const [allDomains, setAllDomains] = useState<DomainInfo[]>([]);

  // Load initial data
  useEffect(() => {
    if (domains.length > 0) {
      setAllDomains(domains);
    }
  }, [domains]);

  // Fetch next page data
  const fetchMoreData = useCallback(() => {
    if (pagination?.links.next) {
      nextPage();
    }
  }, [pagination, nextPage]);

  // Append new domains to the existing list
  useEffect(() => {
    if (currentPage > 1 && domains.length > 0) {
      setAllDomains((prevDomains) => [...prevDomains, ...domains]);
    }
  }, [domains, currentPage]);

  const renderItem = ({ item, index }) => {
    console.log("index", index);

    return (
      <TouchableOpacity
        onPress={() => {
          router.push(`/domain`);
        }}
      >
        <DomainCard name={item.domain} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        contentContainerStyle={{ gap: 20 }}
        keyExtractor={(item, index) => `${item.id.toString()}_${index}`}
        data={allDomains}
        renderItem={renderItem}
        // onEndReached={fetchMoreData}
        // onEndReachedThreshold={0.9}
        ListFooterComponent={
          pagination?.links.next && isLoading ? (
            <ActivityIndicator size="small" />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
