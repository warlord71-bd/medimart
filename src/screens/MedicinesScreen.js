import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES, getMedicines } from '../services/medicines';
import MedicineCard from '../components/MedicineCard';
import SearchBar from '../components/SearchBar';

const MedicinesScreen = ({ navigation, route }) => {
  const { t } = useLanguage();
  const initCategory = route.params?.category || null;
  const initSearch = route.params?.search || '';

  const [selectedCat, setSelectedCat] = useState(initCategory);
  const [searchQuery, setSearchQuery] = useState(initSearch);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    if (route.params?.category) setSelectedCat(route.params.category);
    if (route.params?.search) setSearchQuery(route.params.search);
  }, [route.params]);

  let meds = getMedicines(selectedCat, searchQuery);

  if (sortBy === 'price_asc') meds.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price_desc') meds.sort((a, b) => b.price - a.price);
  else if (sortBy === 'discount') meds.sort((a, b) => b.discount - a.discount);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{selectedCat || t('allMedicines')}</Text>
        <Text style={styles.count}>({meds.length} {t('medicines')})</Text>
      </View>

      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <SearchBar
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onSearch={(q) => setSearchQuery(q)}
          onClear={() => setSearchQuery('')}
        />
      </View>

      {/* Category chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <TouchableOpacity
          style={[styles.chip, !selectedCat && styles.chipActive]}
          onPress={() => setSelectedCat(null)}>
          <Text style={[styles.chipText, !selectedCat && styles.chipTextActive]}>All</Text>
        </TouchableOpacity>
        {CATEGORIES.map(cat => (
          <TouchableOpacity key={cat.id}
            style={[styles.chip, selectedCat === cat.name && styles.chipActive]}
            onPress={() => setSelectedCat(selectedCat === cat.name ? null : cat.name)}>
            <Text style={{ fontSize: 12 }}>{cat.icon}</Text>
            <Text style={[styles.chipText, selectedCat === cat.name && styles.chipTextActive]}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sort bar */}
      <View style={styles.sortBar}>
        {[
          { key: null, label: 'Default' },
          { key: 'price_asc', label: 'Price \u2191' },
          { key: 'price_desc', label: 'Price \u2193' },
          { key: 'discount', label: 'Discount' },
        ].map(s => (
          <TouchableOpacity key={s.key || 'def'} onPress={() => setSortBy(s.key)}
            style={[styles.sortBtn, sortBy === s.key && styles.sortBtnActive]}>
            <Text style={[styles.sortText, sortBy === s.key && styles.sortTextActive]}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {meds.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="search-outline" size={40} color={COLORS.textLight} />
          <Text style={styles.emptyText}>{t('noResults')}</Text>
        </View>
      ) : (
        <FlatList data={meds} keyExtractor={i => i.id.toString()} numColumns={2}
          contentContainerStyle={{ padding: 16 }}
          columnWrapperStyle={{ gap: 10, marginBottom: 10 }}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <MedicineCard med={item}
                onPress={() => navigation.navigate('MedicineDetail', { med: item })} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', alignItems: 'baseline', gap: 6, paddingTop: 48, paddingHorizontal: 16, paddingBottom: 8, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  count: { fontSize: 12, color: COLORS.textLight },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fff', borderWidth: 1, borderColor: COLORS.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, marginRight: 6 },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 11, fontWeight: '700', color: COLORS.text },
  chipTextActive: { color: '#fff' },
  sortBar: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 6, gap: 6, borderBottomWidth: 1, borderBottomColor: COLORS.border, backgroundColor: '#fff' },
  sortBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, backgroundColor: COLORS.divider },
  sortBtnActive: { backgroundColor: COLORS.accentLight },
  sortText: { fontSize: 10, fontWeight: '700', color: COLORS.textLight },
  sortTextActive: { color: COLORS.primary },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyText: { fontSize: 14, fontWeight: '700', color: COLORS.textLight, marginTop: 8 },
});

export default MedicinesScreen;
