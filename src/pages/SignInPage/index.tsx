import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { Text, Button } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import DefaultInput from "./DefaultInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FormProvider, useForm } from "react-hook-form";
import React from "react";
import { httpClient } from "../../lib/httpClient";
import { useUserStore } from "../../store/userStore";
import { DefaultResponse } from "../../lib/httpClient/types/DefaultResponse";
import { LoginResponse } from "../../lib/httpClient/types/Login";
interface FormValues {
  email: string;
  password: string;
}
const SignInPage = () => {
  const { width, height } = useWindowDimensions();
  const updateUserData = useUserStore((state) => state.updateUserData);
  const { t } = useTranslation();
  const methods = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = React.useCallback((data: FormValues) => {
    httpClient
      .post<DefaultResponse<LoginResponse>>("/mobile-api/auth/login", {
        email: data.email,
        password: data.password,
        captcha: "yWOEjZMIhY",
        captchaBypass: "yWOEjZMIhY",
      })
      .then(({ data }) => {
        updateUserData(data.data);
      })
      .catch((error) => {
        Alert.alert("Error", error?.response?.data?.message);
      });
  }, []);
  return (
    <FormProvider {...methods}>
      <ImageBackground
        style={{
          width,
          height,
        }}
        source={require("./assets/ColorfulBG.png")}
      >
        <ScrollView style={{ flex: 1, width }}>
          <View
            style={{
              alignItems: "center",
              paddingTop: 200,
            }}
          >
            <Image
              source={require("./assets/Logo_symbol_white.png")}
              style={{
                resizeMode: "contain",
                width: 55,
                height: 55,
              }}
            />
            <Text
              h1Style={{
                fontWeight: "900",
                fontSize: 23,
                color: "#fff",
                marginTop: 24,
              }}
              h1
            >
              {t("sign_in")}
            </Text>
            <Text
              h1Style={{
                fontWeight: "500",
                fontSize: 16,
                color: "#D6DFFF",
                marginTop: 9,
                marginBottom: 60,
              }}
              h1
            >
              {t("sign_in_desc")}
            </Text>
            <View
              style={{
                paddingHorizontal: 10,
                width: "100%",
              }}
            >
              <DefaultInput
                name="email"
                leftIcon={
                  <Image
                    style={{ width: 17, height: 17, resizeMode: "contain" }}
                    source={require("./assets/user.png")}
                  />
                }
                placeholder={t("email")}
              />
              <DefaultInput
                name="password"
                leftIcon={
                  <Image
                    style={{ width: 17, height: 17, resizeMode: "contain" }}
                    source={require("./assets/password.png")}
                  />
                }
                isPassword
                placeholder={t("password")}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 100,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: 19,
                      height: 19,
                      borderRadius: 4,
                      borderWidth: 2,
                      backgroundColor: "rgba(256,256,256,0.1)",
                      borderColor: "rgba(256,256,256,0.2)",
                    }}
                  ></View>
                  <Text
                    h3
                    h3Style={{
                      fontWeight: "500",
                      fontSize: 14,
                      color: "white",
                      marginLeft: 6,
                    }}
                  >
                    {t("remember_me")}
                  </Text>
                </View>

                <Text
                  h3
                  h3Style={{
                    fontWeight: "500",
                    fontSize: 14,
                    color: "white",
                    marginLeft: 6,
                  }}
                >
                  {t("forgot_password")}
                </Text>
              </View>
              <Button
                loading={methods.formState.isSubmitting}
                onPress={methods.handleSubmit(onSubmit)}
                disabled={
                  methods.formState.isSubmitting ||
                  methods.formState.isValidating ||
                  !methods.formState.isValid
                }
                buttonStyle={{
                  backgroundColor: "#fff",
                  height: 45,
                  borderRadius: 6,
                }}
                activeOpacity={0.6}
                titleStyle={{
                  color: "#5073F2",
                  fontWeight: "700",
                  fontSize: 14,
                }}
                title={t("sign_in")?.toUpperCase()}
              />
              <Text
                h3
                h3Style={{
                  fontWeight: "500",
                  fontSize: 14,
                  color: "white",
                  marginLeft: 6,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                {t("dont_have_account")}
                <Text
                  h3
                  h3Style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "white",
                    marginLeft: 6,
                    textAlign: "center",
                    marginTop: 20,
                  }}
                >
                  {t("sign_up")?.toUpperCase()}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </FormProvider>
  );
};

export default SignInPage;
