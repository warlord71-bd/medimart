import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

const PrescriptionModal = ({ visible, onClose }) => {
  const pickImage = async (useCamera) => {
    try {
      let result;
      if (useCamera) {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (!perm.granted) return;
        result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
      } else {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!perm.granted) return;
        result = await ImagePicker.launchImageLibraryAsync({ quality: 0.8 });
      }
      if (!result.canceled) {
        // In production: upload result.assets[0].uri to your backend
        alert('Prescription uploaded! Our pharmacists will review and contact you.');
        onClose();
      }
    } catch (e) {
      console.log('ImagePicker error:', e);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Upload Prescription</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={18} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.dropZone}>
            <Ionicons name="camera-outline" size={40} color={COLORS.primary} />
            <Text style={styles.dropTitle}>Take photo or upload image</Text>
            <Text style={styles.dropSub}>We'll deliver all medicines from your prescription</Text>

            <View style={styles.btnRow}>
              <TouchableOpacity onPress={() => pickImage(true)}>
                <LinearGradient colors={COLORS.gradientButton} style={styles.actionBtn} start={{x:0,y:0}} end={{x:1,y:0}}>
                  <Ionicons name="camera" size={16} color="#fff" />
                  <Text style={styles.actionBtnText}>Camera</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => pickImage(false)} style={styles.galleryBtn}>
                <Ionicons name="images" size={16} color={COLORS.text} />
                <Text style={styles.galleryBtnText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.disclaimer}>
            Valid prescription required for {'\u211E'} medicines {'\u2022'} Max 5MB {'\u2022'} JPG, PNG, PDF
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 36 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  closeBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: COLORS.divider, alignItems: 'center', justifyContent: 'center' },
  dropZone: { borderWidth: 2, borderStyle: 'dashed', borderColor: COLORS.primary, borderRadius: 16, padding: 24, alignItems: 'center', backgroundColor: COLORS.accentLight },
  dropTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginTop: 8 },
  dropSub: { fontSize: 11, color: COLORS.textLight, marginTop: 4, textAlign: 'center' },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10 },
  actionBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  galleryBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, backgroundColor: COLORS.divider },
  galleryBtnText: { color: COLORS.text, fontSize: 13, fontWeight: '700' },
  disclaimer: { fontSize: 10, color: COLORS.textLight, textAlign: 'center', marginTop: 12 },
});

export default PrescriptionModal;
