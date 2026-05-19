import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (

    <Drawer
      screenOptions={{
        headerShown: false,
      }}
    >

      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Início",
          title: "Início",
        }}
      />

      <Drawer.Screen
        name="login"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />

      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />

          <Drawer.Screen
        name="configuracoes"
        options={{
          drawerLabel: "Configurações",
          title: "Configurações",
        }}
      />

        <Drawer.Screen
        name="detalhesContrato"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
}