import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import Header from "../components/Header";

import Animated, {
  FadeInUp,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

import { useFocusEffect } from "@react-navigation/native";

export default function DashboardScreen({ navigation }) {
  const handleLogout = () => navigation.replace("Login");

  const [refreshKey, setRefreshKey] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setRefreshKey((prev) => prev + 1);
    }, [])
  );

  const theme = darkMode ? dark : light;

  //  Pulse Animation (Notification / Live feel)
  const pulse = useSharedValue(1);

  useFocusEffect(
    useCallback(() => {
      pulse.value = withRepeat(withTiming(1.3, { duration: 800 }), -1, true);
    }, [])
  );

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <View style={{ flex: 1 }}>
      <ScrollView key={refreshKey} style={theme.container}>
        <Header title="Dashboard" onLogout={handleLogout} />

        {/*  TOP BAR */}
        <View style={theme.topBar}>
          <Text style={theme.title}></Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Animated.View style={[theme.liveDot, pulseStyle]} />
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>
        </View>

        {/* HERO GLASS CARD */}
        <Animated.View entering={FadeInDown.duration(700)} style={theme.hero}>
          <Text style={theme.heroTitle}>City Care Hospital</Text>
          <Text style={theme.heroSub}>Smart Healthcare Dashboard</Text>
        </Animated.View>

        {/*  AI INSIGHTS */}
        <Animated.View entering={FadeInUp.delay(200)} style={theme.insightCard}>
          <Text style={theme.insightTitle}>🧠 AI Insights</Text>
          <Text style={theme.insightText}>
            ICU demand expected to increase by 15% today.
          </Text>
        </Animated.View>

        {/*  DOCTORS */}
        <Text style={theme.sectionTitle}>👨‍⚕️ Doctors On Duty</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { name: "Dr. Sharma", status: "Available" },
            { name: "Dr. Mehta", status: "Busy" },
            { name: "Dr. Richa", status: "Available" },
          ].map((doc, i) => (
            <Animated.View
              key={i}
              entering={FadeInUp.delay(i * 150)}
              style={theme.doctorCard}
            >
              <View style={theme.avatar}>
                <Text style={{ color: "#fff" }}>👨‍⚕️</Text>
              </View>
              <Text style={theme.docName}>{doc.name}</Text>
              <Text
                style={{
                  color: doc.status === "Available" ? "#00b894" : "#e17055",
                  fontSize: 12,
                }}
              >
                ● {doc.status}
              </Text>
            </Animated.View>
          ))}
        </ScrollView>

        {/*  QUEUE */}
        <Text style={theme.sectionTitle}>🧑 Patient Queue</Text>

        {[
          { token: "A12", name: "Rahul Sharma", time: "10:30 AM" },
          { token: "A13", name: "Priya Mehta", time: "10:45 AM" },
        ].map((p, i) => (
          <Animated.View
            key={i}
            entering={FadeInUp.delay(i * 150)}
            style={theme.queueCard}
          >
            <View style={theme.tokenBox}>
              <Text style={theme.token}>{p.token}</Text>
            </View>

            <View>
              <Text style={theme.queueName}>{p.name}</Text>
              <Text style={theme.queueTime}>{p.time}</Text>
            </View>
          </Animated.View>
        ))}

        {/*  UPCOMING */}
        <Animated.View entering={FadeInUp.delay(400)} style={theme.upcoming}>
          <Text style={theme.sectionTitle}>⏱️ Upcoming Appointments</Text>
          <Text style={theme.upText}>Dr. Sharma • 11:00 AM</Text>
          <Text style={theme.upText}>Dr. Mehta • 11:30 AM</Text>
        </Animated.View>

        {/*  QUICK ACTIONS */}
        <Text style={theme.sectionTitle}>⚡ Quick Actions</Text>

        <View style={theme.quickGrid}>
          {[
            { icon: "👨‍⚕️", label: "Doctors", screen: "Doctors" },
            { icon: "🧑‍🤝‍🧑", label: "Patients", screen: "Patients" },
            { icon: "📅", label: "Appointments", screen: "Appointments" },
            { icon: "💊", label: "Pharmacy", screen: "Pharmacy" },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate(item.screen)}
              style={theme.quickCard}
            >
              <Text style={theme.quickIcon}>{item.icon}</Text>
              <Text style={theme.quickText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={theme.fab}
        onPress={() => navigation.navigate("Appointments")}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

/*  LIGHT THEME */
const light = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fb" },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },

  title: { fontSize: 18, fontWeight: "bold" },

  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    marginRight: 10,
  },

  hero: {
    backgroundColor: "#6C5CE7",
    margin: 12,
    padding: 20,
    borderRadius: 18,
  },

  heroTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  heroSub: { color: "#ddd" },

  insightCard: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 15,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#6C5CE7",
  },

  insightTitle: { fontWeight: "bold" },
  insightText: { color: "gray" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    marginTop: 15,
  },

  doctorCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    margin: 10,
    alignItems: "center",
  },

  avatar: {
    backgroundColor: "#6C5CE7",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },

  docName: { fontWeight: "bold" },

  queueCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  tokenBox: {
    backgroundColor: "#6C5CE7",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  token: { color: "#fff" },
  queueName: { fontWeight: "bold" },
  queueTime: { color: "gray", fontSize: 12 },

  upcoming: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 15,
    borderRadius: 15,
  },

  upText: { marginTop: 5 },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
  },

  quickCard: {
    width: "48%",
    backgroundColor: "#fff",
    margin: "1%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },

  quickIcon: { fontSize: 26 },
  quickText: { marginTop: 8 },

  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6C5CE7",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

/*  DARK */
const dark = StyleSheet.create({
  ...light,
  container: { flex: 1, backgroundColor: "#121212" },
});