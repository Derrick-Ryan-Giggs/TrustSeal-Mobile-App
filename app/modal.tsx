import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";
import Screen from "@/components/Screen";
import ResponsiveText from "@/components/ResponsiveText";
import makeStyles from "@/utils/responsiveStyleSheet";

export default function ModalScreen() {
  const styles = makeStyles(r => ({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontWeight: "bold",
    },
    separator: {
      marginVertical: r.vh(3),
      height: 1,
      width: "80%",
      backgroundColor: "#e0e0e0",
    },
  }));

  return (
    <Screen style={styles.container}>
      <ResponsiveText size={24} style={styles.title}>
        Modal
      </ResponsiveText>
      <View style={styles.separator} />
      <ResponsiveText size={16}>
        This is an example modal. You can edit it in app/modal.tsx.
      </ResponsiveText>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Screen>
  );
}
