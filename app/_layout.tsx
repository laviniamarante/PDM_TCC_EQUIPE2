import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,

        drawerActiveTintColor: "#006C5B",
        drawerActiveBackgroundColor: "#A8D5CE",
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />

      <Drawer.Screen
        name="login"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="detalhesContrato"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="contratos"
        options={{
          drawerLabel: "Contratos",
          title: "Contratos",
        }}
      />

      <Drawer.Screen
        name="configuracoes"
        options={{
          drawerLabel: "Configurações",
          title: "Configurações",
        }}
      />
    </Drawer>
  );
}
