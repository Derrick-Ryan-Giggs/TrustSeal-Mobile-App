import { Link, Stack } from "expo-router";
import Screen from "@/components/Screen";
import ResponsiveText from "@/components/ResponsiveText";
import makeStyles from "@/utils/responsiveStyleSheet";

export default function NotFoundScreen() {
  const styles = makeStyles(r => ({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontWeight: "bold",
      textAlign: "center",
      marginHorizontal: r.vw(5),
    },
    link: {
      marginTop: r.vh(2),
      paddingVertical: r.vh(2),
    },
    linkText: {
      color: "#2e78b7",
      textAlign: "center",
    },
  }));

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Screen style={styles.container}>
        <ResponsiveText size={20} style={styles.title}>
          This screen doesn't exist.
        </ResponsiveText>

        <Link href="/" style={styles.link}>
          <ResponsiveText size={14} style={styles.linkText}>
            Go to home screen!
          </ResponsiveText>
        </Link>
      </Screen>
    </>
  );
}
