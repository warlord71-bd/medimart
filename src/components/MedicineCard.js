import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { useCart } from '../context/CartContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const MedicineCard = ({ med, onPress }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(med);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {med.discount >= 10 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{med.discount}% OFF</Text>
        </View>
      )}

      <View style={styles.imageBox}>
        <Text style={{ fontSize: 32, opacity: 0.7 }}>{'\uD83D\uDC8A'}</Text>
        {med.rx && (
          <View style={styles.rxBadge}>
            <Text style={styles.rxText}>{'\u211E'}</Text>
          </View>
        )}
        {!med.stock && (
          <View style={styles.oosOverlay}>
            <Text style={styles.oosText}>Out of Stock</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{med.name}</Text>
        <Text style={styles.generic} numberOfLines={1}>{med.generic}</Text>
        <Text style={styles.company}>{med.company}</Text>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>{'\u09F3'}{med.price}</Text>
            {med.mrp > med.price && (
              <Text style={styles.mrp}>{'\u09F3'}{med.mrp}</Text>
            )}
          </View>
          <TouchableOpacity onPress={handleAdd} disabled={!med.stock}>
            <LinearGradient
              colors={med.stock ? COLORS.gradientButton : ['#D5DDE5', '#D5DDE5']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.addBtn}
            >
              {added ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : (
                <Ionicons name="add" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card, borderRadius: 14, overflow: 'hidden',
    ...COLORS.shadow, borderWidth: 1, borderColor: COLORS.border,
  },
  discountBadge: {
    position: 'absolute', top: 6, left: 6, zIndex: 2,
    backgroundColor: '#E74C3C', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6,
  },
  discountText: { fontSize: 9, fontWeight: '800', color: '#fff' },
  imageBox: {
    height: 85, backgroundColor: COLORS.accentLight,
    alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  rxBadge: {
    position: 'absolute', top: 6, right: 6,
    backgroundColor: '#EBF5FB', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4,
  },
  rxText: { fontSize: 10, fontWeight: '700', color: COLORS.rx },
  oosOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)', paddingVertical: 3, alignItems: 'center',
  },
  oosText: { fontSize: 9, fontWeight: '700', color: '#fff' },
  info: { padding: 10 },
  name: { fontSize: 13, fontWeight: '800', color: COLORS.text, marginBottom: 1 },
  generic: { fontSize: 9, color: COLORS.textLight, marginBottom: 1 },
  company: { fontSize: 9, color: COLORS.primary, fontWeight: '700', marginBottom: 6 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 15, fontWeight: '900', color: COLORS.primary },
  mrp: { fontSize: 10, color: COLORS.textLight, textDecorationLine: 'line-through' },
  addBtn: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
});

export default MedicineCard;
