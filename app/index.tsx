import React from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, Dimensions } from "react-native";
import Row from '../components/Row';
import Button from "../components/Button";
import calculator, { initialState } from "@/app/calculator";
import { TouchableOpacity } from "react-native-gesture-handler";

// Obter o tamanho da tela para cálculo da largura do botão
const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4;

// Definir a interface do estado
interface State {
  currentValue: string;
  operator: string | null;
  previousValue: string | null;
  cientifcCalculator: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end",
  },
  value: {
    color: "#fff",
    fontSize: 40,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  img: {
    width: 40,
    height: 40
  },
  btn: {
    backgroundColor: "#333333",
    flex: 1,
    height: Math.floor(buttonWidth - 10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Math.floor(buttonWidth),
    margin: 5,
    width: 60
  }
});

export default class App extends React.Component<{}, State> {
  // Defina o estado inicial
  constructor(props: {}) {
    super(props);
    this.state = {
      ...initialState,
      cientifcCalculator: false, // Flag para o modo científico
    };
  }

  handleTap = (type: string, value?: number | string) => {
    this.setState((prevState) => calculator(type, value, prevState));
  };

  handleCalculator = () => {
    // Alterna entre o modo científico e o modo padrão
    this.setState((prevState) => ({
      cientifcCalculator: !prevState.cientifcCalculator
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Text style={styles.value}>
            {parseFloat(this.state.currentValue).toLocaleString()}
          </Text>

          {/* Botões de ação da calculadora */}
          <Row>
            <Button text="C" theme="secondary" onPress={() => this.handleTap("clear")} />
            <Button text="+/-" theme="secondary" onPress={() => this.handleTap("posneg")} />
            <Button text="%" theme="secondary" onPress={() => this.handleTap("percentage")} />
            <Button text="/" theme="accent" onPress={() => this.handleTap("operator", "/")} />
          </Row>

          {/* Botões numéricos e operadores básicos */}
          <Row>
            <Button text="7" onPress={() => this.handleTap("number", 7)} />
            <Button text="8" onPress={() => this.handleTap("number", 8)} />
            <Button text="9" onPress={() => this.handleTap("number", 9)} />
            <Button text="x" theme="accent" onPress={() => this.handleTap("operator", "*")} />
            {this.state.cientifcCalculator && (
              <Button text="x^2" theme="accent" onPress={() => this.handleTap("operator", "^2")} />
            )}
          </Row>

          <Row>
            <Button text="4" onPress={() => this.handleTap("number", 4)} />
            <Button text="5" onPress={() => this.handleTap("number", 5)} />
            <Button text="6" onPress={() => this.handleTap("number", 6)} />
            <Button text="-" theme="accent" onPress={() => this.handleTap("operator", "-")} />
            {this.state.cientifcCalculator && (
              <Button text="π" theme="accent" onPress={() => this.handleTap("operator", "π")} />
            )}
          </Row>

          <Row>
            <Button text="1" onPress={() => this.handleTap("number", 1)} />
            <Button text="2" onPress={() => this.handleTap("number", 2)} />
            <Button text="3" onPress={() => this.handleTap("number", 3)} />
            <Button text="+" theme="accent" onPress={() => this.handleTap("operator", "+")} />
            {this.state.cientifcCalculator && (
              <Button text="10^x" theme="accent" onPress={() => this.handleTap("operator", "10^x")} />
            )}
          </Row>

          {/* Botões de ação */}
          <Row>
            <TouchableOpacity onPress={this.handleCalculator} style={styles.btn}>
              <Image source={require('../assets/images/logo.svg')} style={styles.img} />
            </TouchableOpacity>

            <Button text="0" onPress={() => this.handleTap("number", 0)} />
            <Button text="." onPress={() => this.handleTap("number", ".")} />
            <Button text="=" theme="accent" onPress={() => this.handleTap("equal")} />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}
