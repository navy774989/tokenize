import React from "react";
import { View } from "react-native";
import { Icon, Text } from "@rneui/themed";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 20,
        paddingLeft: 10,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: "#3D436C",
        }}
      >
        {t("markets").toUpperCase()}
      </Text>
      <Icon type="feather" name="search" size={24} color="black" />
    </View>
  );
};
