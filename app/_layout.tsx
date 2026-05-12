import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
  <Drawer>
    <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
  </Drawer>);
}
