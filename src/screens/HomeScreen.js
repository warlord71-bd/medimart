import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { CATEGORIES, COMPANIES, getDeals, getPopular } from '../services/medicines';
import MedicineCard from '../components/MedicineCard';
import SearchBar from '../components/SearchBar';
import PrescriptionModal from '../components/PrescriptionModal';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { t, lang, toggleLanguage } = useLanguage();
  const { cartCount } = useCart();
  const [bannerIdx, setBannerIdx] = useState(0);
  const [showRx, setShowRx] = useState(false);

  const deals = getDeals();
  const popular = getPopular();

  useEffect(() => {
    const timer = setInterval(() => setBannerIdx(i => (i + 1) % 3), 4000);
    return () => clearInterval(timer);
  }, []);

  const banners = [
    { title: t('bannerSaleTitle'), sub: t('bannerSaleSub'), emoji: '\uD83D\uDC8A', colors: COLORS.gradientBanner },
    { title: t('bannerRxTitle'), sub: t('bannerRxSub'), emoji: '\uD83D\uDCCB', colors: ['#2563EB', '#7C3AED'] },
    { title: t('bannerFreeTitle'), sub: t('bannerFreeSub'), emoji: '\uD83D\uDE9A', colors: ['#EA580C', '#DC2626'] },
  ];

  const quickActions = [
    { icon: 'document-text-outline', label: t('uploadPrescription'), color: '#EBF5FB', action: () => setShowRx(true) },
    { icon: 'refresh-outline', label: t('reorder'), color: '#E8F8F5', action: () => navigation.navigate('OrdersTab') },
    { icon: 'medkit-outline', label: t('bookDoctor'), color: '#FEF9E7', action: () => {} },
    { icon: 'flask-outline', label: t('labTest'), color: '#FDEDEC', action: () => {} },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={COLORS.gradientHeader} style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <View style={styles.logoBox}>
              <Ionicons name="medical" size={18} color="#fff" />
            </View>
            <View>
              <Text style={styles.appName}>MediMart</Text>
              <Text style={styles.tagline}>{t('tagline').toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.hIcon} onPress={toggleLanguage}>
              <Text style={{ fontSize: 11, color: '#fff', fontWeight: '800' }}>
                {lang === 'en' ? '\u09AC\u09BE\u0982' : 'EN'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hIcon}>
              <Ionicons name="notifications-outline" size={17} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.hIcon} onPress={() => navigation.navigate('CartTab')}>
              <Ionicons name="cart-outline" size={17} color="#fff" />
              {cartCount > 0 && (
                <View style={styles.badge}><Text style={styles.badgeText}>{cartCount}</Text></View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <SearchBar
          dark
          placeholder={t('searchPlaceholder')}
          onSearch={(q) => navigation.navigate('MedicinesTab', { screen: 'MedicinesMain', params: { search: q } })}
        />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickRow}>
          {quickActions.map((a, i) => (
            <TouchableOpacity key={i} style={[styles.quickBtn, { backgroundColor: a.color }]} onPress={a.action}>
              <Ionicons name={a.icon} size={22} color={COLORS.primary} />
              <Text style={styles.quickLabel} numberOfLines={2}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Banner */}
        <View style={styles.bannerWrap}>
          <LinearGradient colors={banners[bannerIdx].colors} style={styles.banner} start={{x:0,y:0}} end={{x:1,y:1}}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>{banners[bannerIdx].title}</Text>
              <Text style={styles.bannerSub}>{banners[bannerIdx].sub}</Text>
              <TouchableOpacity style={styles.bannerBtn}>
                <Text style={styles.bannerBtnText}>{t('shopNow')} {'\u2192'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 40 }}>{banners[bannerIdx].emoji}</Text>
          </LinearGradient>
          <View style={styles.dots}>
            {banners.map((_, i) => (
              <View key={i} style={[styles.dot, i === bannerIdx && styles.dotActive]} />
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>{t('shopByCategory')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MedicinesTab')}>
              <Text style={styles.seeAll}>{t('seeAll')} {'\u2192'}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
            {CATEGORIES.slice(0, 6).map(cat => (
              <TouchableOpacity key={cat.id} style={styles.catItem}
                onPress={() => navigation.navigate('MedicinesTab', { screen: 'MedicinesMain', params: { category: cat.name } })}>
                <View style={[styles.catIcon, { backgroundColor: cat.color }]}>
                  <Text style={{ fontSize: 22 }}>{cat.icon}</Text>
                </View>
                <Text style={styles.catName} numberOfLines={1}>{cat.name}</Text>
                <Text style={styles.catCount}>{cat.count} {t('items')}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Deals */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.sectionTitle}>{t('dealsOffers')}</Text>
              <View style={styles.hotBadge}>
                <Text style={styles.hotText}>{'\uD83D\uDD25'} {t('hotLabel')}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('MedicinesTab')}>
              <Text style={styles.seeAll}>{t('seeAll')} {'\u2192'}</Text>
            </TouchableOpacity>
          </View>
          <FlatList data={deals} keyExtractor={i => i.id.toString()} numColumns={2}
            scrollEnabled={false} contentContainerStyle={{ paddingHorizontal: 16 }}
            columnWrapperStyle={{ gap: 10, marginBottom: 10 }}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <MedicineCard med={item} onPress={() => navigation.navigate('MedicineDetail', { med: item })} />
              </View>
            )}
          />
        </View>

        {/* Popular */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>{t('popularMedicines')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MedicinesTab')}>
              <Text style={styles.seeAll}>{t('seeAll')} {'\u2192'}</Text>
            </TouchableOpacity>
          </View>
          <FlatList data={popular} keyExtractor={i => i.id.toString()} numColumns={2}
            scrollEnabled={false} contentContainerStyle={{ paddingHorizontal: 16 }}
            columnWrapperStyle={{ gap: 10, marginBottom: 10 }}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <MedicineCard med={item} onPress={() => navigation.navigate('MedicineDetail', { med: item })} />
              </View>
            )}
          />
        </View>

        {/* Companies */}
        <View style={[styles.section, { marginBottom: 20 }]}>
          <Text style={[styles.sectionTitle, { paddingHorizontal: 16, marginBottom: 10 }]}>{t('topCompanies')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
            {COMPANIES.map((c, i) => (
              <TouchableOpacity key={i} style={styles.companyChip}
                onPress={() => navigation.navigate('MedicinesTab', { screen: 'MedicinesMain', params: { search: c } })}>
                <Text style={styles.companyText}>{c}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <PrescriptionModal visible={showRx} onClose={() => setShowRx(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { paddingTop: 48, paddingHorizontal: 16, paddingBottom: 12, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  appName: { fontSize: 18, fontWeight: '900', color: '#fff', letterSpacing: -0.3 },
  tagline: { fontSize: 7, color: 'rgba(255,255,255,0.75)', fontWeight: '600', letterSpacing: 1.5 },
  headerRight: { flexDirection: 'row', gap: 6 },
  hIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: 8, backgroundColor: '#E74C3C', alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 9, fontWeight: '800', color: '#fff' },
  quickRow: { flexDirection: 'row', gap: 8, padding: 16, paddingBottom: 0 },
  quickBtn: { flex: 1, borderRadius: 14, padding: 10, alignItems: 'center', gap: 4 },
  quickLabel: { fontSize: 9, fontWeight: '700', color: COLORS.text, textAlign: 'center', lineHeight: 12 },
  bannerWrap: { paddingHorizontal: 16, paddingTop: 12 },
  banner: { borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center', minHeight: 90 },
  bannerTitle: { fontSize: 18, fontWeight: '900', color: '#fff' },
  bannerSub: { fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  bannerBtn: { marginTop: 8, backgroundColor: 'rgba(255,255,255,0.25)', paddingVertical: 4, paddingHorizontal: 14, borderRadius: 14, alignSelf: 'flex-start' },
  bannerBtnText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 8 },
  dot: { width: 6, height: 5, borderRadius: 3, backgroundColor: '#D5DDE5' },
  dotActive: { width: 22, backgroundColor: COLORS.primary },
  section: { marginTop: 16 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 10 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  seeAll: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  catItem: { alignItems: 'center', marginRight: 12, width: 68 },
  catIcon: { width: 50, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  catName: { fontSize: 10, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  catCount: { fontSize: 8, color: COLORS.textLight },
  hotBadge: { backgroundColor: '#E74C3C', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  hotText: { fontSize: 9, fontWeight: '800', color: '#fff' },
  companyChip: { backgroundColor: '#fff', borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, marginRight: 8 },
  companyText: { fontSize: 11, fontWeight: '700', color: COLORS.text },
});

export default HomeScreen;
