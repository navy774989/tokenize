import React from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { httpClient } from "../../lib/httpClient";
import { DefaultResponse } from "../../lib/httpClient/types/DefaultResponse";
import {
  MarketListProps,
  MarketsResponse,
} from "../../lib/httpClient/types/Markets";
import { Image } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabbar } from "./Tabbar";
import { Header } from "./Header";
import CoinDetail from "./CoinDetail";

const HomePage = () => {
  const [markets, setMarkets] = React.useState<Map<string, MarketListProps[]>>(
    new Map()
  );
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [activeMarket, setActiveMarket] = React.useState<string>("");
  const getMarkets = React.useCallback(async () => {
    const { data } = await httpClient.get<DefaultResponse<MarketsResponse>>(
      "/mobile-api/market/getmarkets"
    );
    data.data.map((market) => {
      markets.set(market.title, market.list);
    });
    setMarkets(new Map(markets));
    setActiveMarket(data.data[0].title);
  }, []);
  React.useEffect(() => {
    getMarkets();
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "#FAFBFE" }}
    >
      <Header />
      <ScrollView
        horizontal
        style={{
          marginBottom: 11,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {[...markets.keys()]?.map((title) => {
            return (
              <DefaultButton
                key={title}
                onPress={() => {
                  setActiveMarket(title);
                }}
                title={title}
                active={activeMarket === title}
              />
            );
          })}
        </View>
      </ScrollView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={markets.get(activeMarket)}
        refreshing={refreshing}
        onRefresh={getMarkets}
        renderItem={({ item }) => {
          return <CoinDetail item={item} />;
        }}
      />
      <Tabbar />
    </SafeAreaView>
  );
};
const DefaultButton = ({
  active,
  title,
  onPress,
}: {
  active: boolean;
  title: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: active ? "#6992FF" : "#E4E9F9",

        paddingHorizontal: 10,
        borderRadius: 6,
        marginRight: 9.5,
        paddingTop: 10,
        paddingBottom: 15,
      }}
    >
      <Text
        style={{
          color: active ? "#fff" : "#8E92B2",
          marginHorizontal: 10,
          fontSize: 13,
          fontWeight: "500",
          minHeight: 15,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};
export default HomePage;
