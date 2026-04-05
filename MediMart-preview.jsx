import { useState, useEffect, useRef } from "react";

// ===== MEDICINE DATABASE =====
const medicines = [
  { id: 1, name: "Napa Extra", generic: "Paracetamol 500mg + Caffeine 65mg", company: "Beximco Pharma", type: "Tablet", price: 2.50, mrp: 2.80, strip: 10, img: "💊", category: "Pain Relief", rx: false, stock: true, discount: 11, desc: "Used for headache, toothache, body pain and fever." },
  { id: 2, name: "Seclo 20", generic: "Omeprazole 20mg", company: "Square Pharma", type: "Capsule", price: 6, mrp: 7, strip: 14, img: "💊", category: "Gastric", rx: false, stock: true, discount: 14, desc: "Used for gastric ulcer, heartburn, and acid reflux." },
  { id: 3, name: "Losectil 20", generic: "Omeprazole 20mg", company: "Incepta Pharma", type: "Capsule", price: 5.50, mrp: 6.50, strip: 14, img: "💊", category: "Gastric", rx: false, stock: true, discount: 15, desc: "Alternative for Seclo. Used for acid reflux." },
  { id: 4, name: "Sergel 20", generic: "Esomeprazole 20mg", company: "Healthcare Pharma", type: "Capsule", price: 8, mrp: 9, strip: 14, img: "💊", category: "Gastric", rx: false, stock: true, discount: 11, desc: "Proton pump inhibitor for GERD and ulcers." },
  { id: 5, name: "Monas 10", generic: "Montelukast 10mg", company: "Square Pharma", type: "Tablet", price: 12, mrp: 14, strip: 10, img: "💊", category: "Respiratory", rx: true, stock: true, discount: 14, desc: "For asthma prevention and allergic rhinitis." },
  { id: 6, name: "Ciprocin 500", generic: "Ciprofloxacin 500mg", company: "Square Pharma", type: "Tablet", price: 10, mrp: 12, strip: 10, img: "💊", category: "Antibiotic", rx: true, stock: true, discount: 17, desc: "Broad-spectrum antibiotic for bacterial infections." },
  { id: 7, name: "Amlodac 5", generic: "Amlodipine 5mg", company: "Opsonin Pharma", type: "Tablet", price: 3, mrp: 3.50, strip: 30, img: "💊", category: "Blood Pressure", rx: true, stock: true, discount: 14, desc: "Calcium channel blocker for hypertension." },
  { id: 8, name: "Neurofer Plus", generic: "Iron + Folic Acid + B12", company: "Renata", type: "Capsule", price: 5, mrp: 5.50, strip: 30, img: "💊", category: "Vitamins", rx: false, stock: true, discount: 9, desc: "For iron deficiency anemia and pregnancy support." },
  { id: 9, name: "Azifast 500", generic: "Azithromycin 500mg", company: "Beximco Pharma", type: "Tablet", price: 40, mrp: 45, strip: 3, img: "💊", category: "Antibiotic", rx: true, stock: true, discount: 11, desc: "Macrolide antibiotic for respiratory and skin infections." },
  { id: 10, name: "Fluclav 500", generic: "Amoxicillin + Clavulanic Acid", company: "Incepta Pharma", type: "Tablet", price: 22, mrp: 25, strip: 8, img: "💊", category: "Antibiotic", rx: true, stock: false, discount: 12, desc: "For severe bacterial infections." },
  { id: 11, name: "Tofen 400", generic: "Ibuprofen 400mg", company: "Square Pharma", type: "Tablet", price: 3, mrp: 3.50, strip: 10, img: "💊", category: "Pain Relief", rx: false, stock: true, discount: 14, desc: "NSAID for pain, inflammation, and fever." },
  { id: 12, name: "Ceevit", generic: "Vitamin C 250mg", company: "Square Pharma", type: "Tablet", price: 1.50, mrp: 1.80, strip: 10, img: "💊", category: "Vitamins", rx: false, stock: true, discount: 17, desc: "Vitamin C supplement for immune support." },
];

const categories = [
  { id: 1, name: "Pain Relief", icon: "🩹", count: 120, color: "#FFF3E0" },
  { id: 2, name: "Gastric", icon: "🫁", count: 85, color: "#E8F5E9" },
  { id: 3, name: "Antibiotic", icon: "🧬", count: 200, color: "#E3F2FD" },
  { id: 4, name: "Blood Pressure", icon: "❤️", count: 95, color: "#FCE4EC" },
  { id: 5, name: "Vitamins", icon: "💪", count: 150, color: "#F3E5F5" },
  { id: 6, name: "Respiratory", icon: "🌬️", count: 70, color: "#E0F7FA" },
  { id: 7, name: "Diabetes", icon: "🩸", count: 110, color: "#FFF8E1" },
  { id: 8, name: "Skin Care", icon: "✨", count: 60, color: "#FAFAFA" },
];

const companies = ["Square Pharma", "Beximco Pharma", "Incepta Pharma", "Opsonin Pharma", "Healthcare Pharma", "Renata", "ACI Ltd", "Aristopharma"];

// ===== APP COMPONENT =====
export default function MediMartApp() {
  const [screen, setScreen] = useState("home");
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMed, setSelectedMed] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [lang, setLang] = useState("en");
  const [showPrescription, setShowPrescription] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty * i.strip, 0);

  const addToCart = (med) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === med.id);
      if (existing) return prev.map(i => i.id === med.id ? {...i, qty: i.qty + 1} : i);
      return [...prev, {...med, qty: 1}];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? {...i, qty} : i));
  };

  const goTo = (s, tab) => { setScreen(s); if (tab) setActiveTab(tab); };
  const openMedicine = (med) => { setSelectedMed(med); setScreen("detail"); };
  const openCategory = (cat) => { setSelectedCat(cat); setScreen("browse"); };

  const filteredMeds = medicines.filter(m => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.generic.toLowerCase().includes(q) || m.company.toLowerCase().includes(q);
    const matchCat = !selectedCat || m.category === selectedCat.name;
    return matchSearch && matchCat;
  });

  return (
    <div style={{
      width: 380, height: 740, margin: "0 auto", borderRadius: 28,
      background: "#F6F8FB", overflow: "hidden", fontFamily: "'Nunito', sans-serif",
      display: "flex", flexDirection: "column", position: "relative",
      boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {screen === "home" && <HomeScreen {...{goTo, openMedicine, openCategory, addToCart, cartCount, searchQuery, setSearchQuery, setShowPrescription, lang, setLang}} />}
        {screen === "browse" && <BrowseScreen {...{goTo, openMedicine, addToCart, filteredMeds, selectedCat, setSelectedCat, searchQuery, setSearchQuery}} />}
        {screen === "detail" && <DetailScreen {...{goTo, selectedMed, addToCart, medicines}} />}
        {screen === "cart" && <CartScreen {...{goTo, cart, updateQty, removeFromCart, cartTotal, cartCount, setOrderPlaced, setCart}} />}
        {screen === "orders" && <OrdersScreen {...{goTo, orderPlaced}} />}
        {screen === "account" && <AccountScreen {...{goTo, lang, setLang}} />}
        {screen === "categories" && <AllCategoriesScreen {...{goTo, openCategory, categories}} />}
      </div>

      {/* Prescription Modal */}
      {showPrescription && <PrescriptionModal onClose={() => setShowPrescription(false)} />}

      {/* Bottom Navigation */}
      <div style={{
        display: "flex", justifyContent: "space-around", alignItems: "center",
        background: "#fff", borderTop: "1px solid #EEF2F6", padding: "6px 0 10px",
        flexShrink: 0,
      }}>
        {[
          { id: "home", icon: "🏠", label: "Home" },
          { id: "browse", icon: "💊", label: "Medicines" },
          { id: "cart", icon: "🛒", label: "Cart", badge: cartCount },
          { id: "orders", icon: "📦", label: "Orders" },
          { id: "account", icon: "👤", label: "Account" },
        ].map(tab => (
          <button key={tab.id} onClick={() => { goTo(tab.id, tab.id); if(tab.id==="browse"){setSelectedCat(null);setSearchQuery("");}}}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "2px 12px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
              position: "relative", opacity: activeTab === tab.id ? 1 : 0.5,
            }}>
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: activeTab === tab.id ? 800 : 600,
              color: activeTab === tab.id ? "#0D9373" : "#8896A6",
            }}>{tab.label}</span>
            {tab.badge > 0 && (
              <span style={{
                position: "absolute", top: -2, right: 4, background: "#E74C3C",
                color: "#fff", fontSize: 9, fontWeight: 800, borderRadius: 10,
                minWidth: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center",
              }}>{tab.badge}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== HOME SCREEN =====
function HomeScreen({ goTo, openMedicine, openCategory, addToCart, cartCount, searchQuery, setSearchQuery, setShowPrescription, lang, setLang }) {
  const [bannerIdx, setBannerIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setBannerIdx(i => (i+1) % 3), 3500); return () => clearInterval(t); }, []);

  const banners = [
    { title: "Up to 15% OFF", sub: "On all medicines", bg: "linear-gradient(135deg, #0D9373, #0BB89C)", emoji: "💊" },
    { title: "Upload Prescription", sub: "We deliver to your door", bg: "linear-gradient(135deg, #2563EB, #7C3AED)", emoji: "📋" },
    { title: "Free Delivery", sub: "Orders above ৳500", bg: "linear-gradient(135deg, #EA580C, #DC2626)", emoji: "🚚" },
  ];

  const deals = medicines.filter(m => m.discount >= 14).slice(0, 4);
  const popular = medicines.filter(m => !m.rx).slice(0, 4);

  return (
    <div>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0D9373 0%, #0BB89C 50%, #14B8A6 100%)",
        padding: "40px 16px 14px", borderRadius: "0 0 20px 20px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
              }}>💚</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", fontFamily: "Poppins", letterSpacing: -0.5 }}>MediMart</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.8)", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Your Trusted Pharmacy</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setLang(lang === "en" ? "bn" : "en")} style={{
              width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.2)",
              border: "none", color: "#fff", fontSize: 11, fontWeight: 800, cursor: "pointer",
            }}>{lang === "en" ? "বাং" : "EN"}</button>
            <button style={{
              width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.2)",
              border: "none", fontSize: 16, cursor: "pointer", position: "relative",
            }}>🔔</button>
            <button onClick={() => goTo("cart", "cart")} style={{
              width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.2)",
              border: "none", fontSize: 16, cursor: "pointer", position: "relative",
            }}>
              🛒
              {cartCount > 0 && <span style={{
                position: "absolute", top: -3, right: -3, background: "#E74C3C",
                color: "#fff", fontSize: 9, fontWeight: 800, borderRadius: 10,
                width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center",
              }}>{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.2)",
          borderRadius: 12, padding: "8px 12px",
        }}>
          <span style={{ fontSize: 14, opacity: 0.7 }}>🔍</span>
          <input placeholder="Search medicines, generics..."
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => { if(e.key === "Enter" && searchQuery) { goTo("browse", "browse"); }}}
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "#fff", fontSize: 13, fontWeight: 600,
            }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: "flex", gap: 8, padding: "12px 16px 0", justifyContent: "space-between" }}>
        {[
          { icon: "📋", label: "Upload\nPrescription", color: "#EBF5FB", action: () => setShowPrescription(true) },
          { icon: "🔁", label: "Reorder\nMedicine", color: "#E8F8F5", action: () => goTo("orders", "orders") },
          { icon: "🩺", label: "Book\nDoctor", color: "#FEF9E7", action: () => {} },
          { icon: "🧪", label: "Lab\nTest", color: "#FDEDEC", action: () => {} },
        ].map((a, i) => (
          <button key={i} onClick={a.action} style={{
            flex: 1, background: a.color, border: "none", borderRadius: 14, padding: "10px 4px",
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          }}>
            <span style={{ fontSize: 22 }}>{a.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#2C3E50", textAlign: "center", lineHeight: 1.2, whiteSpace: "pre-line" }}>{a.label}</span>
          </button>
        ))}
      </div>

      {/* Banner */}
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{
          background: banners[bannerIdx].bg, borderRadius: 16, padding: "16px 18px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          minHeight: 80, transition: "all 0.5s ease",
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 900, color: "#fff", fontFamily: "Poppins" }}>{banners[bannerIdx].title}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>{banners[bannerIdx].sub}</div>
            <button style={{
              marginTop: 8, background: "rgba(255,255,255,0.25)", border: "none",
              color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 14px",
              borderRadius: 14, cursor: "pointer",
            }}>Shop Now →</button>
          </div>
          <span style={{ fontSize: 40 }}>{banners[bannerIdx].emoji}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 8 }}>
          {banners.map((_, i) => (
            <div key={i} style={{
              width: i === bannerIdx ? 20 : 6, height: 5, borderRadius: 3,
              background: i === bannerIdx ? "#0D9373" : "#D5DDE5",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: "#1a2332" }}>Shop by Category</span>
          <button onClick={() => goTo("categories")} style={{ background: "none", border: "none", color: "#0D9373", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>See All →</button>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
          {categories.slice(0, 5).map(cat => (
            <button key={cat.id} onClick={() => openCategory(cat)} style={{
              minWidth: 68, background: cat.color, border: "none", borderRadius: 14,
              padding: "10px 6px", cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 4, flexShrink: 0,
            }}>
              <span style={{ fontSize: 22 }}>{cat.icon}</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#2C3E50" }}>{cat.name}</span>
              <span style={{ fontSize: 8, color: "#8896A6" }}>{cat.count} items</span>
            </button>
          ))}
        </div>
      </div>

      {/* Deals */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#1a2332" }}>Deals & Offers</span>
            <span style={{ background: "#E74C3C", color: "#fff", fontSize: 8, fontWeight: 800, padding: "2px 8px", borderRadius: 8 }}>🔥 HOT</span>
          </div>
          <button onClick={() => goTo("browse", "browse")} style={{ background: "none", border: "none", color: "#0D9373", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>See All →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {deals.map(med => <MedCard key={med.id} med={med} onPress={() => openMedicine(med)} onAdd={() => addToCart(med)} />)}
        </div>
      </div>

      {/* Popular */}
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: "#1a2332" }}>Popular Medicines</span>
          <button onClick={() => goTo("browse", "browse")} style={{ background: "none", border: "none", color: "#0D9373", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>See All →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {popular.map(med => <MedCard key={med.id} med={med} onPress={() => openMedicine(med)} onAdd={() => addToCart(med)} />)}
        </div>
      </div>

      {/* Companies */}
      <div style={{ padding: "0 16px 20px" }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: "#1a2332", display: "block", marginBottom: 10 }}>Top Companies</span>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {companies.map((c, i) => (
            <button key={i} onClick={() => { setSearchQuery(c); goTo("browse", "browse"); }} style={{
              minWidth: 90, background: "#fff", border: "1px solid #EEF2F6", borderRadius: 10,
              padding: "10px 8px", cursor: "pointer", fontSize: 10, fontWeight: 700,
              color: "#2C3E50", flexShrink: 0, textAlign: "center",
            }}>{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== MEDICINE CARD =====
function MedCard({ med, onPress, onAdd }) {
  return (
    <div onClick={onPress} style={{
      background: "#fff", borderRadius: 14, overflow: "hidden", cursor: "pointer",
      border: "1px solid #EEF2F6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      {med.discount >= 10 && (
        <div style={{
          position: "absolute", margin: "6px", background: "#E74C3C", color: "#fff",
          fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 6, zIndex: 1,
        }}>{med.discount}% OFF</div>
      )}
      <div style={{
        height: 80, background: "#F0FDF9", display: "flex", alignItems: "center",
        justifyContent: "center", position: "relative",
      }}>
        <span style={{ fontSize: 32, opacity: 0.8 }}>{med.img}</span>
        {med.rx && <span style={{
          position: "absolute", top: 6, right: 6, background: "#EBF5FB",
          fontSize: 8, fontWeight: 700, color: "#2563EB", padding: "2px 5px", borderRadius: 4,
        }}>℞</span>}
      </div>
      <div style={{ padding: "8px 10px 10px" }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#1a2332", lineHeight: 1.2, marginBottom: 2 }}>{med.name}</div>
        <div style={{ fontSize: 9, color: "#8896A6", marginBottom: 1 }}>{med.generic}</div>
        <div style={{ fontSize: 8, color: "#0D9373", fontWeight: 700, marginBottom: 4 }}>{med.company}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 14, fontWeight: 900, color: "#0D9373" }}>৳{med.price}</span>
            <span style={{ fontSize: 10, color: "#B0BEC5", textDecoration: "line-through", marginLeft: 4 }}>৳{med.mrp}</span>
            <div style={{ fontSize: 8, color: "#8896A6" }}>per {med.type.toLowerCase()}</div>
          </div>
          <button onClick={e => { e.stopPropagation(); onAdd(); }} style={{
            background: "linear-gradient(135deg, #0D9373, #14B8A6)", border: "none",
            color: "#fff", fontSize: 16, width: 30, height: 30, borderRadius: 8,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>+</button>
        </div>
      </div>
    </div>
  );
}

// ===== BROWSE/SEARCH SCREEN =====
function BrowseScreen({ goTo, openMedicine, addToCart, filteredMeds, selectedCat, setSelectedCat, searchQuery, setSearchQuery }) {
  return (
    <div>
      <div style={{ background: "#fff", padding: "40px 16px 12px", borderBottom: "1px solid #EEF2F6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <button onClick={() => { goTo("home", "home"); setSelectedCat(null); setSearchQuery(""); }}
            style={{ background: "#F0F4F8", border: "none", borderRadius: 10, width: 34, height: 34, cursor: "pointer", fontSize: 14 }}>←</button>
          <span style={{ fontSize: 17, fontWeight: 800 }}>{selectedCat ? selectedCat.name : "All Medicines"}</span>
          <span style={{ fontSize: 11, color: "#8896A6" }}>({filteredMeds.length})</span>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, background: "#F6F8FB",
          borderRadius: 12, padding: "8px 12px",
        }}>
          <span>🔍</span>
          <input placeholder="Search medicines..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 13, fontWeight: 600 }}
          />
          {searchQuery && <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14 }}>✕</button>}
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {filteredMeds.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#8896A6" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>No medicines found</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {filteredMeds.map(med => <MedCard key={med.id} med={med} onPress={() => openMedicine(med)} onAdd={() => addToCart(med)} />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ===== MEDICINE DETAIL SCREEN =====
function DetailScreen({ goTo, selectedMed, addToCart, medicines }) {
  if (!selectedMed) return null;
  const med = selectedMed;
  const alternatives = medicines.filter(m => m.generic === med.generic && m.id !== med.id);

  return (
    <div>
      <div style={{ background: "#F0FDF9", padding: "40px 16px 16px", position: "relative" }}>
        <button onClick={() => goTo("browse", "browse")} style={{
          position: "absolute", top: 40, left: 16, background: "rgba(255,255,255,0.9)",
          border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}>←</button>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <span style={{ fontSize: 60 }}>{med.img}</span>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
          {med.rx && <span style={{ background: "#EBF5FB", color: "#2563EB", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6 }}>℞ Prescription Required</span>}
          <span style={{ background: med.stock ? "#E8F8F5" : "#FDEDEC", color: med.stock ? "#0D9373" : "#E74C3C", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6 }}>
            {med.stock ? "✓ In Stock" : "✕ Out of Stock"}
          </span>
        </div>

        <div style={{ fontSize: 20, fontWeight: 900, color: "#1a2332", fontFamily: "Poppins" }}>{med.name}</div>
        <div style={{ fontSize: 12, color: "#8896A6", marginTop: 2 }}>{med.generic}</div>
        <div style={{ fontSize: 11, color: "#0D9373", fontWeight: 700, marginTop: 2 }}>{med.company} • {med.type}</div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "12px 0" }}>
          <span style={{ fontSize: 28, fontWeight: 900, color: "#0D9373" }}>৳{med.price}</span>
          <span style={{ fontSize: 16, color: "#B0BEC5", textDecoration: "line-through" }}>৳{med.mrp}</span>
          <span style={{ background: "#FFF3E0", color: "#EA580C", fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 6 }}>{med.discount}% OFF</span>
        </div>
        <div style={{ fontSize: 11, color: "#8896A6" }}>Strip of {med.strip} {med.type.toLowerCase()}s • ৳{(med.price * med.strip).toFixed(0)} per strip</div>

        <div style={{ background: "#F6F8FB", borderRadius: 14, padding: 14, margin: "14px 0" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1a2332", marginBottom: 6 }}>Description</div>
          <div style={{ fontSize: 12, color: "#5A6B7B", lineHeight: 1.6 }}>{med.desc}</div>
        </div>

        {/* Info boxes */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
          {[
            ["🚚", "Delivery", "2-4 hours inside Dhaka"],
            ["💳", "Payment", "COD, bKash, Nagad, Card"],
            ["✅", "Guarantee", "100% Genuine Medicine"],
          ].map(([icon, label, value]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span>{icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1a2332" }}>{label}:</span>
              <span style={{ fontSize: 11, color: "#8896A6" }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1a2332", marginBottom: 8 }}>Similar Medicines (Same Generic)</div>
            {alternatives.map(alt => (
              <div key={alt.id} onClick={() => { }} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "#fff", border: "1px solid #EEF2F6", borderRadius: 12, padding: 10, marginBottom: 6,
              }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{alt.name}</div>
                  <div style={{ fontSize: 10, color: "#0D9373" }}>{alt.company}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#0D9373" }}>৳{alt.price}</div>
                  <div style={{ fontSize: 9, color: "#B0BEC5", textDecoration: "line-through" }}>৳{alt.mrp}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ height: 70 }} />
      </div>

      {/* Bottom Add to Cart */}
      <div style={{
        position: "sticky", bottom: 0, background: "#fff", borderTop: "1px solid #EEF2F6",
        padding: "10px 16px 14px", display: "flex", gap: 8,
      }}>
        <button onClick={() => addToCart(med)} style={{
          flex: 1, background: "linear-gradient(135deg, #0D9373, #14B8A6)",
          border: "none", color: "#fff", fontSize: 14, fontWeight: 800, padding: "12px 0",
          borderRadius: 12, cursor: "pointer",
        }}>Add to Cart — ৳{(med.price * med.strip).toFixed(0)}</button>
      </div>
    </div>
  );
}

// ===== CART SCREEN =====
function CartScreen({ goTo, cart, updateQty, removeFromCart, cartTotal, cartCount, setOrderPlaced, setCart }) {
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 32px" }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>🛒</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#1a2332" }}>Your cart is empty</div>
        <div style={{ fontSize: 13, color: "#8896A6", margin: "6px 0 20px" }}>Browse medicines and add to cart</div>
        <button onClick={() => goTo("home", "home")} style={{
          background: "linear-gradient(135deg, #0D9373, #14B8A6)", border: "none",
          color: "#fff", fontSize: 13, fontWeight: 700, padding: "10px 28px",
          borderRadius: 12, cursor: "pointer",
        }}>Start Shopping</button>
      </div>
    );
  }

  const delivery = cartTotal >= 500 ? 0 : 49;

  return (
    <div>
      <div style={{ background: "#fff", padding: "40px 16px 12px", borderBottom: "1px solid #EEF2F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 20, fontWeight: 800 }}>My Cart ({cartCount})</span>
        <button onClick={() => setCart([])} style={{ background: "none", border: "none", color: "#E74C3C", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Clear All</button>
      </div>

      <div style={{ padding: 16 }}>
        {cart.map(item => (
          <div key={item.id} style={{
            display: "flex", gap: 10, background: "#fff", borderRadius: 14, padding: 10,
            marginBottom: 8, border: "1px solid #EEF2F6", alignItems: "center",
          }}>
            <div style={{ width: 50, height: 50, borderRadius: 10, background: "#F0FDF9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{item.img}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a2332" }}>{item.name}</div>
              <div style={{ fontSize: 9, color: "#8896A6" }}>{item.company} • Strip of {item.strip}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#0D9373" }}>৳{(item.price * item.strip * item.qty).toFixed(0)}</span>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #EEF2F6", borderRadius: 6, overflow: "hidden" }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 26, height: 26, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>−</button>
                  <span style={{ width: 26, textAlign: "center", fontSize: 12, fontWeight: 700, borderLeft: "1px solid #EEF2F6", borderRight: "1px solid #EEF2F6", lineHeight: "26px" }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 26, height: 26, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>+</button>
                </div>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#E74C3C", padding: 4 }}>🗑️</button>
          </div>
        ))}

        {/* Summary */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 14, marginTop: 8, border: "1px solid #EEF2F6" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: "#8896A6" }}>Subtotal</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>৳{cartTotal.toFixed(0)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: "#8896A6" }}>Delivery</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: delivery === 0 ? "#0D9373" : "#1a2332" }}>{delivery === 0 ? "Free" : `৳${delivery}`}</span>
          </div>
          <div style={{ borderTop: "1px dashed #EEF2F6", margin: "6px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 15, fontWeight: 800 }}>Total</span>
            <span style={{ fontSize: 17, fontWeight: 900, color: "#0D9373" }}>৳{(cartTotal + delivery).toFixed(0)}</span>
          </div>
        </div>

        {/* Checkout */}
        <button onClick={() => { setOrderPlaced(true); setCart([]); goTo("orders", "orders"); }} style={{
          width: "100%", background: "linear-gradient(135deg, #0D9373, #14B8A6)",
          border: "none", color: "#fff", fontSize: 14, fontWeight: 800, padding: "13px 0",
          borderRadius: 12, cursor: "pointer", marginTop: 12,
        }}>Proceed to Checkout →</button>
      </div>
    </div>
  );
}

// ===== ORDERS SCREEN =====
function OrdersScreen({ goTo, orderPlaced }) {
  return (
    <div>
      <div style={{ background: "#fff", padding: "40px 16px 12px", borderBottom: "1px solid #EEF2F6" }}>
        <span style={{ fontSize: 20, fontWeight: 800 }}>My Orders</span>
      </div>
      <div style={{ padding: 16 }}>
        {orderPlaced ? (
          <div style={{ background: "#E8F8F5", borderRadius: 14, padding: 16, textAlign: "center" }}>
            <span style={{ fontSize: 40 }}>✅</span>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0D9373", marginTop: 6 }}>Order Placed!</div>
            <div style={{ fontSize: 12, color: "#5A6B7B", marginTop: 4 }}>Your order #MM-1024 is being prepared</div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "14px 0", padding: "10px 12px", background: "#fff", borderRadius: 10 }}>
              {["Confirmed", "Preparing", "On the Way", "Delivered"].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 24, height: 24, borderRadius: 12, background: i < 2 ? "#0D9373" : "#EEF2F6", color: i < 2 ? "#fff" : "#B0BEC5", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2px" }}>
                    {i < 2 ? "✓" : i + 1}
                  </div>
                  <div style={{ fontSize: 8, fontWeight: 600, color: i < 2 ? "#0D9373" : "#B0BEC5" }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📦</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2332" }}>No orders yet</div>
            <div style={{ fontSize: 12, color: "#8896A6", marginTop: 4 }}>Your order history will appear here</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== ACCOUNT SCREEN =====
function AccountScreen({ goTo, lang, setLang }) {
  const menuItems = [
    { icon: "📦", label: "My Orders", sub: "Track & manage orders" },
    { icon: "📋", label: "My Prescriptions", sub: "Uploaded prescriptions" },
    { icon: "❤️", label: "Family Profiles", sub: "Manage family medicines" },
    { icon: "📍", label: "Delivery Address", sub: "Manage addresses" },
    { icon: "💳", label: "Payment Methods", sub: "bKash, Nagad, COD, Card" },
    { icon: "🎁", label: "Rewards & Referrals", sub: "Earn MediMart Cash" },
    { icon: "🔔", label: "Notifications", sub: "Order & medicine alerts" },
    { icon: "❓", label: "Help & Support", sub: "24/7 customer service" },
  ];

  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #0D9373, #14B8A6)", padding: "48px 16px 20px",
        borderRadius: "0 0 20px 20px", textAlign: "center",
      }}>
        <div style={{ width: 56, height: 56, borderRadius: 28, background: "rgba(255,255,255,0.2)", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: "2px solid rgba(255,255,255,0.3)" }}>👤</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Welcome!</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>Sign in for personalized experience</div>
        <button style={{ marginTop: 10, background: "#fff", border: "none", color: "#0D9373", fontSize: 12, fontWeight: 800, padding: "7px 24px", borderRadius: 20, cursor: "pointer" }}>Sign In / Register</button>
      </div>

      <div style={{ padding: 16 }}>
        {/* Language Toggle */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "#E8F8F5", borderRadius: 14, padding: "10px 14px", marginBottom: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>🌐</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Language</div>
              <div style={{ fontSize: 10, color: "#8896A6" }}>Switch language</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: lang === "en" ? 800 : 600, color: lang === "en" ? "#0D9373" : "#B0BEC5" }}>EN</span>
            <button onClick={() => setLang(lang === "en" ? "bn" : "en")} style={{
              width: 40, height: 22, borderRadius: 11, background: lang === "bn" ? "#0D9373" : "#D5DDE5",
              border: "none", cursor: "pointer", position: "relative", transition: "all 0.2s",
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: 9, background: "#fff",
                position: "absolute", top: 2, left: lang === "bn" ? 20 : 2, transition: "all 0.2s",
              }} />
            </button>
            <span style={{ fontSize: 12, fontWeight: lang === "bn" ? 800 : 600, color: lang === "bn" ? "#0D9373" : "#B0BEC5" }}>বাং</span>
          </div>
        </div>

        {menuItems.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10, background: "#fff",
            borderRadius: 14, padding: "10px 14px", marginBottom: 6,
            border: "1px solid #EEF2F6", cursor: "pointer",
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F0FDF9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2332" }}>{item.label}</div>
              <div style={{ fontSize: 10, color: "#8896A6" }}>{item.sub}</div>
            </div>
            <span style={{ color: "#B0BEC5" }}>›</span>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 16, color: "#B0BEC5", fontSize: 11 }}>
          MediMart v1.0.0 • medimart.com.bd
        </div>
      </div>
    </div>
  );
}

// ===== ALL CATEGORIES SCREEN =====
function AllCategoriesScreen({ goTo, openCategory, categories }) {
  return (
    <div>
      <div style={{ background: "#fff", padding: "40px 16px 12px", borderBottom: "1px solid #EEF2F6", display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={() => goTo("home", "home")} style={{ background: "#F0F4F8", border: "none", borderRadius: 10, width: 34, height: 34, cursor: "pointer", fontSize: 14 }}>←</button>
        <span style={{ fontSize: 20, fontWeight: 800 }}>All Categories</span>
      </div>
      <div style={{ padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => openCategory(cat)} style={{
            background: cat.color, border: "1px solid #EEF2F6", borderRadius: 16,
            padding: 16, cursor: "pointer", textAlign: "center",
          }}>
            <span style={{ fontSize: 30, display: "block", marginBottom: 6 }}>{cat.icon}</span>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1a2332" }}>{cat.name}</div>
            <div style={{ fontSize: 10, color: "#8896A6" }}>{cat.count} medicines</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== PRESCRIPTION MODAL =====
function PrescriptionModal({ onClose }) {
  return (
    <div style={{
      position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "flex-end", zIndex: 100,
    }}>
      <div style={{
        background: "#fff", borderRadius: "20px 20px 0 0", padding: "20px 16px 30px",
        width: "100%",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 17, fontWeight: 800 }}>Upload Prescription</span>
          <button onClick={onClose} style={{ background: "#F0F4F8", border: "none", borderRadius: 10, width: 32, height: 32, cursor: "pointer", fontSize: 14 }}>✕</button>
        </div>
        <div style={{
          border: "2px dashed #0D9373", borderRadius: 16, padding: "28px 20px",
          textAlign: "center", background: "#F0FDF9",
        }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📷</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1a2332" }}>Take photo or upload image</div>
          <div style={{ fontSize: 11, color: "#8896A6", marginTop: 4 }}>We'll deliver all medicines from your prescription</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14 }}>
            <button style={{
              background: "linear-gradient(135deg, #0D9373, #14B8A6)", border: "none",
              color: "#fff", fontSize: 12, fontWeight: 700, padding: "8px 18px",
              borderRadius: 10, cursor: "pointer",
            }}>📷 Camera</button>
            <button style={{
              background: "#F0F4F8", border: "none", color: "#1a2332",
              fontSize: 12, fontWeight: 700, padding: "8px 18px",
              borderRadius: 10, cursor: "pointer",
            }}>📁 Gallery</button>
          </div>
        </div>
        <div style={{ fontSize: 10, color: "#8896A6", textAlign: "center", marginTop: 10 }}>
          Valid prescription required for ℞ medicines • Max 5MB
        </div>
      </div>
    </div>
  );
}
