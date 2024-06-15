import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";

import { DomainInfo, DomainStatus } from "@/services/api";
import React, { useCallback, useEffect, useState } from "react";
import DomainCard from "@/components/DomainCard";
import { usePaginatedDomains } from "@/hooks/usePaginatedDomains";
import { router } from "expo-router";

export const DomainList = ({
  domainStatus,
}: {
  domainStatus: DomainStatus;
}) => {
  const { domains, pagination, isLoading, nextPage, currentPage } =
    usePaginatedDomains(domainStatus);
  const [allDomains, setAllDomains] = useState<DomainInfo[]>([]);

  useEffect(() => {
    if (domains.length > 0 && currentPage === 1) {
      setAllDomains(domains);
    }
  }, [domains]);

  const fetchMoreData = useCallback(() => {
    if (pagination?.links.next) {
      nextPage();
    }
  }, [pagination, nextPage]);

  useEffect(() => {
    if (currentPage > 1 && domains.length > 0) {
      setAllDomains((prevDomains) => [...prevDomains, ...domains]);
    }
  }, [domains, currentPage]);

  const renderItem: ListRenderItem<DomainInfo> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          router.push(`/domain`);
        }}
      >
        <DomainCard {...item} />
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
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.9}
        ListFooterComponent={
          pagination?.links.next && isLoading ? (
            <ActivityIndicator size="large" />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
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
