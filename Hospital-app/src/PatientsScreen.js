import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Header from "../components/Header";
import { Swipeable } from "react-native-gesture-handler";

import Animated, { FadeInRight, FadeInUp } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";

export default function PatientsScreen({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [disease, setDisease] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const [refreshKey, setRefreshKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setRefreshKey((prev) => prev + 1);
    }, [])
  );

  const handleLogout = () => navigation.replace("Login");

  useEffect(() => {
    loadInitialPatients();
  }, []);

  const loadInitialPatients = () => {
    setPatients([
      { id: "1", name: "Rahul Sharma", disease: "Fever" },
      { id: "2", name: "Priya Mehta", disease: "Diabetes" },
    ]);
  };

  const handleAdd = () => {
    if (!name || !disease) return;

    setPatients((prev) => [
      ...prev,
      { id: Date.now().toString(), name, disease },
    ]);

    setName("");
    setDisease("");
  };

  const handleDelete = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadInitialPatients();
      setRefreshing(false);
    }, 1000);
  };

  const loadMore = () => {
    const newData = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now().toString() + i,
      name: "Patient " + (page * 5 + i),
      disease: "Checkup",
    }));

    setPatients((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      style={styles.deleteBox}
      onPress={() => handleDelete(id)}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => renderRightActions(item.id)}
    >
      <Animated.View
        entering={FadeInRight.delay(index * 120).duration(600)}
        style={styles.card}
      >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.disease}>{item.disease}</Text>
      </Animated.View>
    </Swipeable>
  );

  return (
    <View key={refreshKey} style={styles.container}>
      <Header title="Patients" onLogout={handleLogout} />

      <Animated.View entering={FadeInUp.duration(700)} style={styles.form}>
        <TextInput
          placeholder="Patient Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Disease"
          value={disease}
          onChangeText={setDisease}
          style={styles.input}
        />

        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.btnText}>Add Patient</Text>
        </TouchableOpacity>
      </Animated.View>

      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fb" },

  form: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 12,
    elevation: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },

  addBtn: {
    backgroundColor: "#2E86DE",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  btnText: { color: "#fff", fontWeight: "bold" },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },

  name: { fontSize: 16, fontWeight: "bold" },
  disease: { color: "gray" },

  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    marginVertical: 6,
    borderRadius: 10,
  },

  deleteText: { color: "#fff", fontWeight: "bold" },
});