import React, { Component } from "react";
import { createContainer, asFunction, asValue, InjectionMode } from "awilix";
import { Platform, StyleSheet, Text, View } from "react-native";

function createGreeter(platform: string): Greeter {
  return {
    greet() {
      return `Hi React Native on ${platform} from Awilix!`;
    }
  };
}

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });
container.register({
  greeter: asFunction(createGreeter),
  platform: asValue(
    Platform.select({
      android: "Android",
      ios: "iOS"
    })
  )
});

interface Greeter {
  greet(): string;
}

export default class App extends Component<any> {
  render() {
    const greeter = container.resolve<Greeter>("greeter");
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{greeter.greet()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});