import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { getSimilar } from '../services/medicines';

const MedicineDetailScreen = ({ navigation, route }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const med = route.params?.med;
  if (!med) return null;
  const similar = getSimilar(med);
  const stripTotal = (med.price * med.strip).toFixed(0);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Image Section */}
        <View style={styles.imageSection}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 60, marginTop: 10 }}>{'\uD83D\uDC8A'}</Text>
        </View>

        <View style={styles.content}>
          {/* Badges */}
          <View style={styles.badges}>
            {med.rx && (
              <View style={[styles.tag, { backgroundColor: '#EBF5FB' }]}>
                <Text style={[styles.tagText, { color: COLORS.rx }]}>{'\u211E'} {t('rxRequired')}</Text>
              </View>
            )}
            <View style={[styles.tag, { backgroundColor: med.stock ? '#E8F8F5' : '#FDEDEC' }]}>
              <Text style={[styles.tagText, { color: med.stock ? COLORS.success : COLORS.error }]}>
                {med.stock ? '\u2713 ' + t('inStock') : '\u2717 ' + t('outOfStock')}
              </Text>
            </View>
          </View>

          {/* Name & Info */}
          <Text style={styles.medName}>{med.name}</Text>
          <Text style={styles.generic}>{med.generic}</Text>
          <Text style={styles.company}>{med.company} {'\u2022'} {med.type}</Text>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{'\u09F3'}{med.price}</Text>
            <Text style={styles.mrp}>{'\u09F3'}{med.mrp}</Text>
            <View style={styles.offBadge}>
              <Text style={styles.offText}>{med.discount}% {t('off')}</Text>
            </View>
          </View>
          <Text style={styles.stripInfo}>{t('strip')} {med.strip} {med.type.toLowerCase()}s {'\u2022'} {'\u09F3'}{stripTotal} per strip</Text>

          {/* Description */}
          <View style={styles.descBox}>
            <Text style={styles.descTitle}>{t('description')}</Text>
            <Text style={styles.descText}>{med.desc}</Text>
            {med.dosage && <Text style={styles.dosage}>Dosage: {med.dosage}</Text>}
          </View>

          {/* Info Items */}
          <View style={styles.infoList}>
            {[
              ['\uD83D\uDE9A', t('delivery'), t('deliveryInfo')],
              ['\uD83D\uDCB3', t('payment'), t('paymentInfo')],
              ['\u2705', t('guarantee'), t('guaranteeInfo')],
            ].map(([icon, label, value]) => (
              <View key={label} style={styles.infoItem}>
                <Text>{icon}</Text>
                <Text style={styles.infoLabel}>{label}:</Text>
                <Text style={styles.infoValue}>{value}</Text>
              </View>
            ))}
          </View>

          {/* Similar Medicines */}
          {similar.length > 0 && (
            <View style={styles.similarSection}>
              <Text style={styles.similarTitle}>{t('similar')}</Text>
              {similar.map(alt => (
                <TouchableOpacity key={alt.id} style={styles.altCard}
                  onPress={() => navigation.push('MedicineDetail', { med: alt })}>
                  <View>
                    <Text style={styles.altName}>{alt.name}</Text>
                    <Text style={styles.altCompany}>{alt.company}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.altPrice}>{'\u09F3'}{alt.price}</Text>
                    <Text style={styles.altMrp}>{'\u09F3'}{alt.mrp}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.callBtn}>
          <Ionicons name="call-outline" size={18} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => { addToCart(med); navigation.goBack(); }}>
          <LinearGradient colors={COLORS.gradientButton} style={styles.addCartBtn} start={{x:0,y:0}} end={{x:1,y:0}}>
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.addCartText}>{t('addToCart')} {'\u2014'} {'\u09F3'}{stripTotal}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  imageSection: { backgroundColor: COLORS.accentLight, paddingTop: 44, paddingBottom: 20, alignItems: 'center', position: 'relative' },
  backBtn: { position: 'absolute', top: 44, left: 16, width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center', ...COLORS.shadow },
  content: { padding: 16 },
  badges: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  tagText: { fontSize: 10, fontWeight: '700' },
  medName: { fontSize: 22, fontWeight: '900', color: COLORS.text },
  generic: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
  company: { fontSize: 12, color: COLORS.primary, fontWeight: '700', marginTop: 3 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 14 },
  price: { fontSize: 28, fontWeight: '900', color: COLORS.primary },
  mrp: { fontSize: 16, color: COLORS.textLight, textDecorationLine: 'line-through' },
  offBadge: { backgroundColor: '#FFF3E0', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  offText: { fontSize: 11, fontWeight: '800', color: '#EA580C' },
  stripInfo: { fontSize: 11, color: COLORS.textLight, marginTop: 4 },
  descBox: { backgroundColor: COLORS.divider, borderRadius: 14, padding: 14, marginTop: 16 },
  descTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  descText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },
  dosage: { fontSize: 12, color: COLORS.primary, fontWeight: '700', marginTop: 6 },
  infoList: { marginTop: 14, gap: 8 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoLabel: { fontSize: 12, fontWeight: '700', color: COLORS.text },
  infoValue: { fontSize: 11, color: COLORS.textLight, flex: 1 },
  similarSection: { marginTop: 20 },
  similarTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  altCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 12, marginBottom: 6 },
  altName: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  altCompany: { fontSize: 10, color: COLORS.primary, marginTop: 2 },
  altPrice: { fontSize: 14, fontWeight: '800', color: COLORS.primary },
  altMrp: { fontSize: 10, color: COLORS.textLight, textDecorationLine: 'line-through' },
  bottomBar: { flexDirection: 'row', gap: 8, padding: 12, paddingBottom: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: COLORS.border },
  callBtn: { width: 44, height: 44, borderRadius: 12, borderWidth: 1.5, borderColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  addCartBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 12 },
  addCartText: { color: '#fff', fontSize: 14, fontWeight: '800' },
});

export default MedicineDetailScreen;
