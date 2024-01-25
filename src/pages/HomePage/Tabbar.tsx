import React from "react";
import { View } from "react-native";
import { Image, Text } from "@rneui/themed";
import { useTranslation } from "react-i18next";

export const Tabbar = () => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        width: "100%",
        height: 65,
        flexDirection: "row",
        backgroundColor: "white",
      }}
    >
      <TabbarItem
        icon={
          <Image
            style={{
              width: 26,
              height: 23,
              resizeMode: "contain",
            }}
            source={require("./assets/home.png")}
          />
        }
        name={t("home")}
      />
      <TabbarItem
        icon={
          <Image
            style={{
              width: 24,
              height: 21,
              resizeMode: "contain",
            }}
            source={require("./assets/markets.png")}
          />
        }
        isActive
        name={t("markets")}
      />
      <TabbarItem
        icon={
          <Image
            style={{
              width: 26,
              height: 23,
              resizeMode: "contain",
            }}
            source={require("./assets/wallet.png")}
          />
        }
        name={t("wallets")}
      />
      <TabbarItem
        icon={
          <Image
            style={{
              width: 26,
              height: 23,
              resizeMode: "contain",
            }}
            source={require("./assets/portfolio.png")}
          />
        }
        name={t("portfolio")}
      />
      <TabbarItem
        icon={
          <Image
            style={{
              width: 26,
              height: 23,
              resizeMode: "contain",
            }}
            source={require("./assets/more.png")}
          />
        }
        name={t("more")}
      />
    </View>
  );
};
const TabbarItem = ({
  name,
  isActive,
  icon,
}: {
  name: string;
  isActive?: boolean;
  icon: React.ReactNode;
}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {icon}
      <Text
        style={{
          color: isActive ? "#597AF4" : "#9194BB",
          fontWeight: "500",
          fontSize: 13,
          marginTop: 2,
        }}
      >
        {name}
      </Text>
    </View>
  );
};
