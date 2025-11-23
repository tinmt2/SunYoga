import "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DashboardScreen from "./src/screens/DashboardScreen";
import StudentsScreen from "./src/screens/StudentsScreen";
import InvoicesScreen from "./src/screens/InvoicesScreen";
import StudentDetailScreen from "./src/screens/StudentDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const rootTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f8fafc",
  },
};

const RootTabs = () => (
  <Tab.Navigator
    lazy
    sceneContainerStyle={{ backgroundColor: "transparent" }}
    screenOptions={({ route }) => ({
      detachInactiveScreens: true,
      unmountOnBlur: true,
      animationEnabled: false,
      gestureEnabled: false,
      headerShown: false,
      tabBarActiveTintColor: "#2563eb",
      tabBarInactiveTintColor: "#64748b",
      tabBarStyle: {
        backgroundColor: "#ffffff",
        borderTopColor: "#e2e8f0",
      },
      tabBarIcon: ({ color, size }) => {
        let iconName = "grid-outline";
        if (route.name === "Dashboard") iconName = "grid-outline";
        else if (route.name === "Students") iconName = "people-outline";
        else if (route.name === "Invoices") iconName = "document-text-outline";
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: "Tong quan" }} />
    <Tab.Screen name="Students" component={StudentsScreen} options={{ title: "Hoc vien" }} />
    <Tab.Screen name="Invoices" component={InvoicesScreen} options={{ title: "Hoa don" }} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={rootTheme}>
        <StatusBar style="dark" />
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={RootTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StudentDetail"
            component={StudentDetailScreen}
            options={{ title: "Hoc vien" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
