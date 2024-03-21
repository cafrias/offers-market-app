import { Link as ExpoLink } from "expo-router";
import { Text, StyleSheet } from "react-native";

export interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children }: LinkProps) {
  return (
    <ExpoLink href={href}>
      <Text style={styles.link}>{children}</Text>
    </ExpoLink>
  );
}

const styles = StyleSheet.create({
  link: {
    // TODO: add theme color
    color: "blue",
    textDecorationLine: "underline",
  },
});
