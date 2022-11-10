import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Linking,
} from "react-native";
import { Card, Button, Title, Paragraph, List } from "react-native-paper";
import { COLORS } from "../constants";

const Utilities = ({ title, image, desc, options }) => {
  const [expanded, setExpanded] = React.useState(true);

  const call = (number) => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const social = (url) => {
    Linking.openURL(url);
  };

  return (
    <Card
      style={{
        backgroundColor: COLORS.white2,
        marginVertical: 8,
      }}
    >
      <Card.Content style={{ padding: 10 }}>
        <Title
          style={{
            fontWeight: "600",
          }}
        >
          {title}
        </Title>
      </Card.Content>
      <Card.Cover source={image || require("../assets/images/HC.png")} />
      <Card.Content style={{ padding: 10 }}>
        <Paragraph style={{ marginBottom: 10 }}>{desc}</Paragraph>
        {options && (
          <List.Accordion
            style={{ borderRadius: 10 }}
            titleStyle={{ color: "black" }}
            title={options.title}
            expanded={expanded}
            onPress={() => setExpanded((p) => !p)}
          >
            {options.items.map(({ name, value, type, icon }) => {
              if (type === "call") {
                return (
                  <List.Item
                    key={name}
                    onPress={() => call(value)}
                    left={() => <List.Icon icon="phone" />}
                    title={name}
                  />
                );
              }

              if (type === "link") {
                return (
                  <List.Item
                    key={name}
                    onPress={() => social(value)}
                    left={() => <List.Icon icon={icon} />}
                    title={name}
                  />
                );
              }
            })}
          </List.Accordion>
        )}
      </Card.Content>
    </Card>
  );
};
export default Utilities;

/* <Card style={Styles.container}>
  <Card.Content>
    <Title>Hostels</Title>
  </Card.Content>
  <Card.Cover source={require("../assets/images/Hostel.png")} />
  <Card.Content>
    <Paragraph>
      
    </Paragraph>
  </Card.Content>
</Card>
<Card style={Styles.container}>
  <Card.Content>
    <Title>Transport</Title>
  </Card.Content>
  <Card.Cover source={require("../assets/images/Transport.png")} />
  <Card.Content>
    <Paragraph>
      Bus facility for students to and fro from IIT J campus to Jodhpur
      city on a daily basis
    </Paragraph>
  </Card.Content>
</Card> */
