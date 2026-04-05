import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

const CartScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { items, updateQty, removeFromCart, clearCart, cartTotal, cartCount } = useCart();
  const { placeOrder } = useOrders();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={60} color={COLORS.textLight} />
        <Text style={styles.emptyTitle}>{t('cartEmpty')}</Text>
        <Text style={styles.emptySub}>{t('cartEmptySub')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeTab')}>
          <LinearGradient colors={COLORS.gradientButton} style={styles.shopBtn} start={{x:0,y:0}} end={{x:1,y:0}}>
            <Text style={styles.shopBtnText}>{t('startShopping')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  const delivery = cartTotal >= 500 ? 0 : 49;
  const total = cartTotal + delivery;

  const handleCheckout = () => {
    placeOrder(items, total);
    clearCart();
    navigation.navigate('OrdersTab');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('myCart')} ({cartCount})</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>{t('clearCart')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {items.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.medIcon}>
              <Text style={{ fontSize: 22 }}>{'\uD83D\uDC8A'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSub}>{item.company} {'\u2022'} Strip of {item.strip}</Text>
              <View style={styles.itemBottom}>
                <Text style={styles.itemPrice}>{'\u09F3'}{(item.price * item.strip * item.qty).toFixed(0)}</Text>
                <View style={styles.qtyControl}>
                  <TouchableOpacity onPress={() => updateQty(item.id, item.qty - 1)} style={styles.qtyBtn}>
                    <Text style={styles.qtyBtnText}>{'\u2212'}</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyNum}>{item.qty}</Text>
                  <TouchableOpacity onPress={() => updateQty(item.id, item.qty + 1)} style={styles.qtyBtn}>
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={{ padding: 4 }}>
              <Ionicons name="trash-outline" size={16} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Summary */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t('subtotal')}</Text>
            <Text style={styles.summaryValue}>{'\u09F3'}{cartTotal.toFixed(0)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{t('deliveryFee')}</Text>
            <Text style={[styles.summaryValue, delivery === 0 && { color: COLORS.success }]}>
              {delivery === 0 ? t('free') : '\u09F3' + delivery}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>{t('total')}</Text>
            <Text style={styles.totalValue}>{'\u09F3'}{total.toFixed(0)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.checkoutBar}>
        <TouchableOpacity style={{ flex: 1 }} onPress={handleCheckout}>
          <LinearGradient colors={COLORS.gradientButton} style={styles.checkoutBtn} start={{x:0,y:0}} end={{x:1,y:0}}>
            <Text style={styles.checkoutText}>{t('checkout')} {'\u2192'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginTop: 12 },
  emptySub: { fontSize: 13, color: COLORS.textLight, marginTop: 4 },
  shopBtn: { paddingHorizontal: 28, paddingVertical: 10, borderRadius: 12, marginTop: 20 },
  shopBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 48, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: COLORS.border },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  clearText: { color: COLORS.error, fontSize: 12, fontWeight: '700' },
  cartItem: { flexDirection: 'row', gap: 10, backgroundColor: '#fff', borderRadius: 14, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  medIcon: { width: 48, height: 48, borderRadius: 10, backgroundColor: COLORS.accentLight, alignItems: 'center', justifyContent: 'center' },
  itemName: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  itemSub: { fontSize: 10, color: COLORS.textLight },
  itemBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  itemPrice: { fontSize: 15, fontWeight: '800', color: COLORS.primary },
  qtyControl: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, borderRadius: 6 },
  qtyBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  qtyNum: { width: 28, textAlign: 'center', fontSize: 12, fontWeight: '700', borderLeftWidth: 1, borderRightWidth: 1, borderColor: COLORS.border, lineHeight: 28 },
  summaryBox: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginTop: 8, borderWidth: 1, borderColor: COLORS.border },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  summaryLabel: { fontSize: 13, color: COLORS.textLight },
  summaryValue: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  divider: { borderTopWidth: 1, borderStyle: 'dashed', borderColor: COLORS.border, marginVertical: 6 },
  totalLabel: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  totalValue: { fontSize: 18, fontWeight: '900', color: COLORS.primary },
  checkoutBar: { padding: 12, paddingBottom: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: COLORS.border },
  checkoutBtn: { paddingVertical: 13, borderRadius: 12, alignItems: 'center' },
  checkoutText: { color: '#fff', fontSize: 15, fontWeight: '800' },
});

export default CartScreen;
