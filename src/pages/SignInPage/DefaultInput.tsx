import React, { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Icon } from "@rneui/themed";
import { useController } from "react-hook-form";
interface DefaultInputProps extends TextInputProps {
  leftIcon?: ReactNode;
  isPassword?: boolean;
  name: string;
}
const DefaultInput = (props: DefaultInputProps) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name: props.name,
    rules: { required: true },
  });
  return (
    <View style={styles.container}>
      {props.leftIcon && <View style={styles.leftIcon}>{props.leftIcon}</View>}

      <TextInput
        onChangeText={onChange}
        value={value}
        onBlur={onBlur}
        style={styles.textInput}
        secureTextEntry={secureTextEntry && props.isPassword}
        placeholderTextColor={"#D6E1FF"}
        {...props}
      />
      {props.isPassword && (
        <Pressable
          onPress={() => {
            setSecureTextEntry(!secureTextEntry);
          }}
          style={styles.button}
        >
          <Icon
            type="octicon"
            name={secureTextEntry ? "eye-closed" : "eye"}
            color="white"
            size={20}
          />
        </Pressable>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 47,
    borderColor: "rgba(256,256,256,0.2)",
    borderWidth: 2,
    backgroundColor: "rgba(256,256,256,0.1)",
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
  },
  leftIcon: {
    width: 40,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    fontWeight: "500",
    fontSize: 15,
    height: "100%",
    flex: 1,
    color: "white",
  },
  button: {
    width: 70,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default DefaultInput;
