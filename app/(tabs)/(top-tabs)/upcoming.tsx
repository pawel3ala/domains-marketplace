import React from "react";
import { DomainList } from "@/components/DomainList";
import { DomainStatus } from "@/services/api";

const HomeScreen = () => {
  return <DomainList domainStatus={DomainStatus.UPCOMING} />;
};

export default HomeScreen;
