import styled from "styled-components/native";
import Constants from "expo-constants";
import { COLORS } from "../constants";
import { ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import NavBar from "../components/Navbar";
import UtilityCard from "../components/UtilityCard";

const utilities = [
  {
    title: "Socials",
    image:
      "https://res.cloudinary.com/myiitj/image/upload/v1667922690/3_gr5qd2.jpg",
    desc: "Follow us on social media to get latest updates.",
    options: {
      title: "Links",
      items: [
        {
          type: "link",
          name: "Instagram",
          icon: "instagram",
          value: "https://www.instagram.com/insta_iitj2019/",
        },
        {
          type: "link",
          name: "LinkedIn",
          icon: "linkedin",
          value: "https://www.linkedin.com/school/iitjodhpur/",
        },
        {
          type: "link",
          name: "Twitter",
          icon: "twitter",
          value: "https://twitter.com/iitjodhpur",
        },
        {
          type: "link",
          name: "Youtube",
          icon: "youtube",
          value: "https://www.youtube.com/c/IITJodhpurOfficial",
        },
      ],
    },
  },
  {
    title: "Health Center",
    image:
      "https://res.cloudinary.com/myiitj/image/upload/v1667922690/3_gr5qd2.jpg",
    desc: "An ISO 9001:2005 certified health centre with OPD and ambulance service",
    options: {
      title: "Important Contacts",
      items: [
        {
          type: "call",
          name: "Reception",
          value: "+91 291 280 1190",
        },
        {
          type: "call",
          name: "Ambulance",
          value: "+91 75688 15630",
        },
      ],
    },
  },
  {
    title: "Hostels",
    image:
      "https://res.cloudinary.com/myiitj/image/upload/v1667922671/1_mfh2gj.jpg",
    desc: "State of the art insulated building providing comfortable temperatures pan year",
  },
  {
    title: "Transport",
    image:
      "https://res.cloudinary.com/myiitj/image/upload/v1667923766/7_lifukq.png",
    desc: "Bus facility for students to and fro from IIT J campus to Jodhpur city on a daily basis",
    options: {
      title: "Important Contacts",
      items: [
        {
          type: "call",
          name: "E Rickshaw",
          value: "8003382240",
        },
        {
          type: "call",
          name: "Bus",
          value: "12345678",
        },
      ],
    },
  },
  {
    title: "Kendriya Bhandar",
    image:
      "https://res.cloudinary.com/myiitj/image/upload/v1668003024/berm_aod8xi.jpg",
    desc: "Kendriya Bhandar store has a variety of grocery items from stationary to snacks.",
    options: {
      title: "Details",
      items: [
        {
          type: "call",
          name: "Contact",
          value: "6375723425",
        },
        {
          type: "location",
          name: "Near type-B housing",
          value: "",
        },
      ],
    },
  },
  {
    title: "Grocery/Bakery shop",
    image:
      "https://res.cloudinary.com/myiitj/image/upload/v1668003024/berm_aod8xi.jpg",
    desc: "A mini supermarket for all your daily needs as well as fresh baked products from 15 A.D",
    options: {
      title: "Details",
      items: [
        {
          type: "call",
          name: "Contact",
          value: "12345678",
        },
        {
          type: "location",
          name: "W-21 Berm",
          value: "",
        },
      ],
    },
  },
  {
    title: "Stationary",
    image:
      "https://res.cloudinary.com/myiitj/image/upload/v1668003024/berm_aod8xi.jpg",
    desc: "You can get basic stationary and photocopies from here.",
    options: {
      title: "Details",
      items: [
        {
          type: "call",
          name: "Contact 1",
          value: "7878592910",
        },
        {
          type: "call",
          name: "Contact 2",
          value: "9785887445",
        },
        {
          type: "location",
          name: "E-21 Berm",
          value: "",
        },
      ],
    },
  },
  {
    title: "Shamiyana",
    image:
      "https://res.cloudinary.com/myiitj/image/upload/v1667922696/4_ecodxi.jpg",
    desc: "The insitute cafe offers a multi-cuisine experience; a stage for live music, roof-top, indoor and outdoor seating.",
    options: {
      title: "Important Contacts",
      items: [
        {
          type: "call",
          name: "Addie's Bakery",
          value: "12345678",
        },
        // all other contacts
      ],
    },
  },
];

const Utilities = ({ drawerAnimatedStyle }) => {
  return (
    <Container style={[drawerAnimatedStyle]}>
      <NavBar />
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        {utilities.map((item) => (
          <UtilityCard key={item.title} {...item} />
        ))}
      </ScrollView>
    </Container>
  );
};

export default Utilities;

//styles
const Container = styled(Animated.View)`
  flex: 1;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.darkPurple : COLORS.white1};
  padding-top: ${Constants.statusBarHeight}px;
`;
