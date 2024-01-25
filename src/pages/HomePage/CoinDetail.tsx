import { Image } from "@rneui/themed";
import { Text, View } from "react-native";
import { MarketListProps } from "../../lib/httpClient/types/Markets";
import currency from "currency.js";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const CoinDetail = ({ item }: { item: MarketListProps }) => {
  const [randomChange, setRandomChange] = React.useState<number>(
    Math.random() * 2
  );
  const opacity = useSharedValue(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setRandomChange(Math.random() * 1.5);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  React.useEffect(() => {
    opacity.value = 1;
    opacity.value = withTiming(0, { duration: 3000 });
  }, [randomChange]);
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        marginBottom: 11,
        padding: 18,
        borderRadius: 6,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ width: 38, height: 38 }}
          source={{
            uri: `https://tokenize-dev.com/assets/images/currency-logos/${item.marketCurrency.toLowerCase()}.png`,
          }}
        />
        <View style={{ marginLeft: 15 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 15,
              marginBottom: 4,
            }}
          >
            {item.marketCurrency}
          </Text>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 14,
              color: "#8E92B2",
            }}
          >
            {item.marketCurrencyLong}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ color: "#3D436C", marginBottom: 5 }}>
          {currency(item.ceiling ?? 0)
            .add(item.floor ?? 0)
            .format()}
        </Text>
        <Animated.Text
          style={[
            textAnimatedStyle,
            {
              fontSize: 13,
              fontWeight: "500",
              color:
                (parseFloat(randomChange.toFixed(2)) * 100) % 2 === 0
                  ? "#3BBA7D"
                  : "#F94B5C",
            },
          ]}
        >
          {(parseFloat(randomChange.toFixed(2)) * 100) % 2 === 0 ? "+" : "-"}
          {randomChange.toFixed(2)}%
        </Animated.Text>
      </View>
    </View>
  );
};
export default CoinDetail;
