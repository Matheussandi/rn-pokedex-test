import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { colors } from "@/lib/theme";

export type DetailTab = "about" | "stats";

type DetailTabsProps = {
  activeTab: DetailTab;
  onTabChange: (tab: DetailTab) => void;
  tabWidth: number;
};

const TABS: { key: DetailTab; label: string }[] = [
  { key: "about", label: "Sobre" },
  { key: "stats", label: "Status" },
];

export function DetailTabs({ activeTab, onTabChange, tabWidth }: DetailTabsProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            style={[styles.tab, { width: tabWidth }]}
            onPress={() => onTabChange(tab.key)}
          >
            <AppText
              variant="body3"
              color={isActive ? "black" : "grey"}
              bold
              style={styles.tabLabel}
            >
              {tab.label}
            </AppText>
            {isActive ? <View style={styles.indicator} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 20,
    marginHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  tab: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    textAlign: "center",
  },
  indicator: {
    position: "absolute",
    bottom: -20,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.blue,
  },
});
