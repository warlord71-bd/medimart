import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';
import { useOrders } from '../context/OrderContext';

const OrdersScreen = () => {
  const { t } = useLanguage();
  const { orders } = useOrders();

  const stepLabels = [t('confirmed'), t('preparing'), t('onTheWay'), t('delivered')];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('myOrders')}</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {orders.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={50} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>{t('noOrders')}</Text>
            <Text style={styles.emptySub}>Your order history will appear here</Text>
          </View>
        ) : (
          orders.map(order => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHead}>
                <View>
                  <Text style={styles.orderId}>Order #{order.id}</Text>
                  <Text style={styles.orderDate}>{new Date(order.date).toLocaleDateString()}</Text>
                </View>
                <Text style={styles.orderTotal}>{'\u09F3'}{order.total.toFixed(0)}</Text>
              </View>
              <View style={styles.itemsList}>
                {order.items.map(item => (
                  <Text key={item.id} style={styles.orderItem}>
                    {'\uD83D\uDC8A'} {item.name} x{item.qty}
                  </Text>
                ))}
              </View>
              {/* Progress */}
              <View style={styles.progress}>
                {stepLabels.map((label, i) => (
                  <View key={i} style={styles.stepItem}>
                    <View style={[styles.stepDot, i <= order.currentStep && styles.stepDotActive]}>
                      {i <= order.currentStep ? (
                        <Ionicons name="checkmark" size={10} color="#fff" />
                      ) : (
                        <Text style={styles.stepNum}>{i + 1}</Text>
                      )}
                    </View>
                    <Text style={[styles.stepLabel, i <= order.currentStep && styles.stepLabelActive]}>{label}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { paddingTop: 48, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: COLORS.border },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  empty: { alignItems: 'center', padding: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginTop: 10 },
  emptySub: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
  orderCard: { backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border },
  orderHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  orderId: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  orderDate: { fontSize: 10, color: COLORS.textLight },
  orderTotal: { fontSize: 16, fontWeight: '900', color: COLORS.primary },
  itemsList: { marginBottom: 10, gap: 2 },
  orderItem: { fontSize: 12, color: COLORS.textSecondary },
  progress: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.divider, borderRadius: 10, padding: 10 },
  stepItem: { alignItems: 'center', gap: 3 },
  stepDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  stepDotActive: { backgroundColor: COLORS.primary },
  stepNum: { fontSize: 9, fontWeight: '700', color: COLORS.textLight },
  stepLabel: { fontSize: 8, fontWeight: '600', color: COLORS.textLight },
  stepLabelActive: { color: COLORS.primary },
});

export default OrdersScreen;
