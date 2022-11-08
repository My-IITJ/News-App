import { COLORS, isSmall, SIZES } from "../constants";
import React, {  } from "react";
import styled from "styled-components/native";
import Constants from "expo-constants";
import auth from "@react-native-firebase/auth";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import { Formik } from "formik";
import { Text } from "react-native";
import * as yup from "yup";
import { Snackbar } from "react-native-paper";

const Register = ({ navigation }) => {
  const [error, setError] = React.useState({ message: null });
  const onDismissSnackBar = () => setError(false);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  const handleRegistration = ({ email, password }) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          setError({ message: "That email address is already in use!" });
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
          setError({ message: "That email address is invalid!" });
        }
        // console.error(error);
      });
  };

  return (
    <Container>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          handleRegistration(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <KeyboardAvoidingScrollView
              stickyFooter={
                <ButtonContainer style={{ backgroundColor: !isValid ? "grey" : COLORS.purple2 }} onPress={handleSubmit} disabled={!isValid}>
                  <Label1>Register</Label1>
                </ButtonContainer>
              }
            >
              <WelcomeText>Create Account</WelcomeText>

              <Fields>
                <Box>
                  <Label>Email ID</Label>
                  <Input
                    name="email"
                    placeholder="Email Address"
                    //   style={styles.textInput}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                </Box>
                {errors.email && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.email}
                  </Text>
                )}
                <Box>
                  <Label>Password</Label>
                  <Input
                    name="password"
                    placeholder="Password"
                    // style={styles.textInput}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />
                </Box>
                {errors.password && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.password}
                  </Text>
                )}
              </Fields>
            </KeyboardAvoidingScrollView>
          </>
        )}
      </Formik>
      <Snackbar onDismiss={onDismissSnackBar} visible={error.message != null}>
        {error.message} 
      </Snackbar>
      {/* <Box>
					<Label>Email ID</Label>
					<Input value={email} onChangeText={(text) => setEmail(text)} />
				</Box>

				<Box>
					<Label>Password</Label>
					<Input
						value={password}
						secureTextEntry
						onChangeText={(text) => setPassword(text)}
					/>
				</Box> */}
      {/* </Fields> */}
      {/* </KeyboardAvoidingScrollView> */}
    </Container>
  );
};

export default Register;

//styles
const Container = styled.View`
  flex: 1;
  padding: 30px; 
  padding-top: ${Constants.statusBarHeight + 20}px;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.darkgrey : COLORS.white2};
  justify-content: center;
`;

const WelcomeText = styled.Text`
  font-family: Poppins_400Regular;
  font-size: ${isSmall ? 44 : 48}px;
  color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.purple2 : COLORS.deepBlue};
  width: 80%;
`;

const Fields = styled.View`
  /* flex: 1; */
  padding: 20px 10px;
`;

const Box = styled.View`
  justify-content: center;
  margin: ${isSmall ? 10 : 20}px 0px;
`;

const Label = styled.Text`
  font-size: 22px;
  font-family: Poppins_400Regular;
  color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.white1 : COLORS.deepBlue};
`;

const Input = styled.TextInput`
  padding: 12px 15px;
  margin-top: 8px;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.purple2 : COLORS.white1};
  opacity: ${({ theme }) => (theme.name === "dark" ? 0.5 : 1)};
  color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.white1 : COLORS.deepBlue};
  border-radius: ${SIZES.font}px;
  font-size: ${isSmall ? 16 : 18}px;
  shadow-color: #233b7a;
  shadow-opacity: 1.5;
  shadow-radius: 20px;
  elevation: 10;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(p) =>
    p.theme.name === "dark" ? COLORS.purple2 : COLORS.deepBlue};
  align-items: center;
  border-radius: 30px;
  margin-bottom: ${RFValue(-10)}px;
  margin-top: ${RFValue(20)}px;
  padding: ${RFValue(5)}px;
`;

const Label1 = styled.Text`
  color: ${(p) => COLORS.white1};
  font-family: Poppins_400Regular;
  font-size: ${isSmall ? 20 : 22}px;
  text-align: center;
`;
