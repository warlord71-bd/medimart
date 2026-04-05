import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider, useCart } from './src/context/CartContext';
import { LanguageProvider, useLanguage } from './src/context/LanguageContext';
import { OrderProvider } from './src/context/OrderContext';
import { COLORS } from './src/theme/colors';
import HomeScreen from './src/screens/HomeScreen';
import MedicinesScreen from './src/screens/MedicinesScreen';
import MedicineDetailScreen from './src/screens/MedicineDetailScreen';
import CartScreen from './src/screens/CartScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import AccountScreen from './src/screens/AccountScreen';

const Tab = createBottomTabNavigator();
const HomeStackNav = createNativeStackNavigator();
const MedStackNav = createNativeStackNavigator();
const CartStackNav = createNativeStackNavigator();
const OrderStackNav = createNativeStackNavigator();

function HomeStack() {
  return (
    <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNav.Screen name="HomeMain" component={HomeScreen} />
      <HomeStackNav.Screen name="MedicineDetail" component={MedicineDetailScreen} />
    </HomeStackNav.Navigator>
  );
}

function MedicinesStack() {
  return (
    <MedStackNav.Navigator screenOptions={{ headerShown: false }}>
      <MedStackNav.Screen name="MedicinesMain" component={MedicinesScreen} initialParams={{}} />
      <MedStackNav.Screen name="MedicineDetail" component={MedicineDetailScreen} />
    </MedStackNav.Navigator>
  );
}

function CartStack() {
  return (
    <CartStackNav.Navigator screenOptions={{ headerShown: false }}>
      <CartStackNav.Screen name="CartMain" component={CartScreen} />
    </CartStackNav.Navigator>
  );
}

function OrderStack() {
  return (
    <OrderStackNav.Navigator screenOptions={{ headerShown: false }}>
      <OrderStackNav.Screen name="OrdersMain" component={OrdersScreen} />
    </OrderStackNav.Navigator>
  );
}

function TabNavigator() {
  const { t } = useLanguage();
  const { cartCount } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName = 'home-outline';
          if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'MedicinesTab') iconName = focused ? 'medical' : 'medical-outline';
          else if (route.name === 'CartTab') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'OrdersTab') iconName = focused ? 'receipt' : 'receipt-outline';
          else if (route.name === 'AccountTab') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={21} color={color} />;
        },
        tabBarActiveTintColor: COLORS.tabActive,
        tabBarInactiveTintColor: COLORS.tabInactive,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingTop: 4,
          paddingBottom: 4,
          height: 56,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ tabBarLabel: t('tabHome') }} />
      <Tab.Screen name="MedicinesTab" component={MedicinesStack} options={{ tabBarLabel: t('tabMedicines') }} />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          tabBarLabel: t('tabCart'),
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: { backgroundColor: COLORS.error, fontSize: 10, fontWeight: '700' },
        }}
      />
      <Tab.Screen name="OrdersTab" component={OrderStack} options={{ tabBarLabel: t('tabOrders') }} />
      <Tab.Screen name="AccountTab" component={AccountScreen} options={{ tabBarLabel: t('tabAccount') }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageProvider>
        <CartProvider>
          <OrderProvider>
            <NavigationContainer>
              <StatusBar style="light" />
              <TabNavigator />
            </NavigationContainer>
          </OrderProvider>
        </CartProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}
