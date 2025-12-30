import { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");

  const buttons = [
    ["c", "m", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "+/-", "="],
  ];

  const handlePress = (value) => {
    if (value === "c") {
      setExpression("");
      setResult("0");
    } else if (value === "=") {
      try {
        // Hisoblash mantiqi
        const formattedExpression = expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/—/g, "-");
        const evalResult = eval(formattedExpression);
        setResult(String(evalResult));
        setExpression(String(evalResult));
      } catch (e) {
        setResult("Error");
      }
    } else if (value === "+/-") {
      setResult((prev) => (parseFloat(prev) * -1).toString());
    } else if (value === "m") {
      // Memory funksiyasi (ixtiyoriy)
    } else {
      setExpression((prev) => prev + value);
      // Real vaqtda natijani pastda hisoblab ko'rsatib turish (ixtiyoriy)
    }
  };

  // Orqa fondagi geometrik shakllar komponenti
  const BackgroundIcons = () => (
    <View style={StyleSheet.absoluteFill}>
      <Text
        style={[
          styles.bgIcon,
          { top: "10%", left: "10%", transform: [{ rotate: "45deg" }] },
        ]}
      >
        □
      </Text>
      <Text style={[styles.bgIcon, { top: "20%", right: "15%" }]}>○</Text>
      <Text style={[styles.bgIcon, { bottom: "15%", left: "15%" }]}>○</Text>
      <Text style={[styles.bgIcon, { top: "50%", left: "5%", fontSize: 30 }]}>
        △
      </Text>
      <Text
        style={[
          styles.bgIcon,
          { bottom: "25%", right: "10%", transform: [{ rotate: "-20deg" }] },
        ]}
      >
        □
      </Text>
      <Text style={[styles.bgIcon, { top: "40%", right: "5%" }]}>△</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <BackgroundIcons />

      <View style={styles.calculatorCard}>
        <View style={styles.historyContainer}>
          <Text style={styles.historyText}>{expression || " "}</Text>
        </View>

        <View style={styles.displayWrapper}>
          <View style={styles.displayInner}>
            <Text
              style={styles.resultText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {result}
            </Text>
          </View>
        </View>

        <View style={styles.buttonsGrid}>
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((btn) => {
                const isGreen = [
                  "c",
                  "m",
                  "%",
                  "÷",
                  "×",
                  "-",
                  "+",
                  "=",
                  ".",
                ].includes(btn);
                return (
                  <TouchableOpacity
                    key={btn}
                    style={styles.button}
                    onPress={() => handlePress(btn)}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        isGreen ? styles.greenText : styles.whiteText,
                        btn === "=" && styles.equalText,
                      ]}
                    >
                      {btn}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#86efac",
    alignItems: "center",
    justifyContent: "center",
  },
  bgIcon: {
    position: "absolute",
    color: "rgba(0,0,0,0.1)", // Shaffof ikonlar
    fontSize: 75,
  },
  calculatorCard: {
    width: 320,
    backgroundColor: "#32383e",
    borderRadius: 40,
    paddingVertical: 25,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 20,
  },
  historyContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 25,
    height: 25,
  },
  historyText: {
    color: "#636e72",
    fontSize: 18,
    fontFamily: "System",
  },
  displayWrapper: {
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  displayInner: {
    backgroundColor: "#ffffff",
    height: 85,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 30,
    // Neomorfizm soyasi
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  resultText: {
    fontSize: 40,
    color: "#2d3436",
    fontWeight: "500",
  },
  buttonsGrid: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  button: {
    width: 65,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "400",
  },
  whiteText: {
    color: "#efefef",
  },
  greenText: {
    color: "#55efc4",
  },
  equalText: {
    fontSize: 32,
    color: "#55efc4",
  },
});

export default Calculator;
