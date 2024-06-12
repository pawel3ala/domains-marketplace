import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const CtaButton = ({
  onPress,
  title,
  isLoading,
}: {
  onPress: () => void;
  title: string;
  isLoading: boolean;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={isLoading} color="white" />
      ) : (
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CtaButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#00A76F",
    width: "100%",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  textInput: {
    marginBottom: 10,
  },
});
