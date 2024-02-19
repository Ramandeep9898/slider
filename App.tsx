import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slider } from './components/Slider/Slider';
import { RangeSlider } from './components/RangeSlider/RangeSlider';


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.text}>Slider - basic</Text>
          <Slider max={500} steps={10} />

          <Text style={styles.text}>Slider - progress (editable)</Text>
          <Slider max={500} steps={10} progress={30} />

          <Text style={styles.text}>Slider - progress (non-editable) shady</Text>
          <Slider max={500} steps={10} progress={30} frozenProgress={20} />

          <Text style={styles.text}>Slider - progress (non-editable) || variant - will start from min (not 0)</Text>
          <Slider max={500} steps={10} progress={30} min={20} />

          <Text style={styles.text}>Slider - custom width</Text>
          <Slider max={500} steps={10} width={100} />


          <RangeSlider max={500} steps={1} />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginLeft: 20,
  }
});
