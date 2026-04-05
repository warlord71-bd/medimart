import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';

const AccountScreen = () => {
  const { t, lang, toggleLanguage } = useLanguage();

  const menuItems = [
    { icon: 'receipt-outline', label: t('myOrders'), sub: 'Track & manage orders' },
    { icon: 'document-text-outline', label: t('myPrescriptions'), sub: 'Uploaded prescriptions' },
    { icon: 'heart-outline', label: t('familyProfiles'), sub: 'Manage family medicines' },
    { icon: 'location-outline', label: t('deliveryAddress'), sub: 'Manage addresses' },
    { icon: 'card-outline', label: t('paymentMethods'), sub: 'bKash, Nagad, COD, Card' },
    { icon: 'gift-outline', label: t('rewardsReferrals'), sub: 'Earn MediMart Cash' },
    { icon: 'notifications-outline', label: t('notifications'), sub: 'Order & medicine alerts' },
    { icon: 'help-circle-outline', label: t('helpSupport'), sub: '24/7 customer service' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.gradientHeader} style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={26} color="#fff" />
        </View>
        <Text style={styles.welcomeText}>{t('welcome')}</Text>
        <Text style={styles.loginPrompt}>{t('loginPrompt')}</Text>
        <TouchableOpacity style={styles.signInBtn}>
          <Text style={styles.signInText}>{t('signIn')}</Text>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Language Toggle */}
        <View style={styles.langBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="globe-outline" size={18} color={COLORS.primary} />
            <View>
              <Text style={styles.langTitle}>{t('language')}</Text>
              <Text style={styles.langSub}>{t('languageSub')}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ fontSize: 12, fontWeight: lang === 'en' ? '800' : '600', color: lang === 'en' ? COLORS.primary : COLORS.textLight }}>EN</Text>
            <TouchableOpacity onPress={toggleLanguage} style={[styles.toggle, lang === 'bn' && styles.toggleActive]}>
              <View style={[styles.toggleDot, lang === 'bn' && styles.toggleDotActive]} />
            </TouchableOpacity>
            <Text style={{ fontSize: 12, fontWeight: lang === 'bn' ? '800' : '600', color: lang === 'bn' ? COLORS.primary : COLORS.textLight }}>{'\u09AC\u09BE\u0982'}</Text>
          </View>
        </View>

        {/* Menu Items */}
        {menuItems.map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon} size={18} color={COLORS.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuSub}>{item.sub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>MediMart v1.0.0</Text>
          <Text style={styles.footerText}>medimart.com.bd</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  profileHeader: { paddingTop: 48, paddingBottom: 20, paddingHorizontal: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, alignItems: 'center' },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', marginBottom: 8 },
  welcomeText: { fontSize: 18, fontWeight: '800', color: '#fff' },
  loginPrompt: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  signInBtn: { marginTop: 10, backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 7, borderRadius: 20 },
  signInText: { color: COLORS.primary, fontSize: 12, fontWeight: '800' },
  langBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.accentLight, borderRadius: 14, padding: 12, marginBottom: 8 },
  langTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  langSub: { fontSize: 10, color: COLORS.textLight },
  toggle: { width: 40, height: 22, borderRadius: 11, backgroundColor: COLORS.border, justifyContent: 'center', paddingHorizontal: 2 },
  toggleActive: { backgroundColor: COLORS.primary },
  toggleDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff' },
  toggleDotActive: { alignSelf: 'flex-end' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderRadius: 14, padding: 12, marginBottom: 6, borderWidth: 1, borderColor: COLORS.border },
  menuIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: COLORS.accentLight, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  menuSub: { fontSize: 10, color: COLORS.textLight },
  footer: { alignItems: 'center', marginTop: 20, paddingBottom: 20, gap: 2 },
  footerText: { fontSize: 11, color: COLORS.textLight },
});

export default AccountScreen;
