import React from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";

import Row from "../components/Row";
import Button from "../components/Button";
import calculator, { initialState } from "../util/calculator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end"
  },
  value: {
    color: "#fff",
    fontSize: 40,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10
  }
});

export default class App extends React.Component {
  state = initialState;

  handleTap = (type, value) => {
    this.setState(state => calculator(type, value, state));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Text style={styles.value}>
            {parseFloat(this.state.currentValue).toLocaleString()}
          </Text>
          <Row>
            <Button
              text="C"
              theme="secondary"
              size={""}
              onPress={() => this.handleTap("clear", "")}
            />
            <Button
              text="+/-"
              theme="secondary"
              size={""}
              onPress={() => this.handleTap("posneg","")}
            />
            <Button
              text="%"
              theme="secondary"
              size={""}
              onPress={() => this.handleTap("percentage","")}
            />
            <Button
              text="/"
              theme="accent"
              size={""}
              onPress={() => this.handleTap("operator", "/")}
            />
          </Row>

          <Row>
            <Button text="7" onPress={() => this.handleTap("number", 7)} size={""} theme={""}/>
            <Button text="8" onPress={() => this.handleTap("number", 8)} size={""} theme={""}/>
            <Button text="9" onPress={() => this.handleTap("number", 9)} size={""} theme={""}/>
            <Button
              text="x"
              theme="accent"
              onPress={() => this.handleTap("operator", "*")}
              size={""}
            />
          </Row>

          <Row>
            <Button text="4" onPress={() => this.handleTap("number", 4)} size={""} theme={""}/>
            <Button text="5" onPress={() => this.handleTap("number", 5)} size={""} theme={""}/>
            <Button text="6" onPress={() => this.handleTap("number", 6)} size={""} theme={""}/>
            <Button
              text="-"
              theme="accent"
              onPress={() => this.handleTap("operator", "-")}
              size={""}
            />
          </Row>

          <Row>
            <Button text="1" onPress={() => this.handleTap("number", 1)} size={""} theme={""}/>
            <Button text="2" onPress={() => this.handleTap("number", 2)} size={""} theme={""}/>
            <Button text="3" onPress={() => this.handleTap("number", 3)} size={""} theme={""}/>
            <Button
              text="+"
              theme="accent"
              onPress={() => this.handleTap("operator", "+")}
              size={""}
            />
          </Row>

          <Row>
            <Button
              text="0"
              size="double"
              onPress={() => this.handleTap("number", 0)}
              theme={""}
            />
            <Button text="." onPress={() => this.handleTap("number", ".")} 
              size={""} theme={""}/>
            <Button
              text="="
              theme="accent"
              onPress={() => this.handleTap("equal")}
              size={""}
            />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}
