import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { useInterval } from '@/hooks/useInterval';
import color from '@/lib/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function IndexScreen() {
  const [isSleeping, setIsSleeping] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00:00')
  const [timerLogs, setTimerLogs] = useState<string[]>([]);
  const isEmpty = !timerLogs.length
const timerHandler = () => {
  const now = new Date();
      const diff = now.getTime() - startTime;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setCurrentTime(formattedTime);
      console.log('timer',startTime)
}
  useInterval(()=>{
    startTime>0 && timerHandler()
  },1000,[startTime])

  const toggleTimer = (start:'awake'|'sleep') => {
    const nowDate = new Date()
    setStartTime(nowDate.getTime())
    setIsSleeping(start==='sleep')
    const text = start==='awake'? 'Woke up' : 'Fell asleep'
    const startTimeLocal = nowDate.toLocaleTimeString();
    setTimerLogs([`${text} at ${startTimeLocal}`, ...timerLogs]);
  };



  return (
    <View style={styles.container}>
      <View style={styles.timerBlock}>
        <View style={styles.status}>
          <MaterialIcons name={isSleeping?"bedtime":"sunny"} size={24} color={"yellow"} />
          <Text style={styles.statusText}>{isSleeping?"Sleeping":'Awake'}</Text>
        </View>
        <Text style={styles.timerText}>
          {currentTime}
          </Text>
      </View>

      <View style={styles.buttonContainer}>
        {(!isSleeping||isEmpty)&&<Pressable
          style={[styles.mainButton, isEmpty&&styles.buttonTop]}
          onPress={()=>toggleTimer('sleep')}
        >
          <Text style={styles.mainButtonText}>
            {'Fall\nasleep'}
          </Text>
        </Pressable>}
        {(isSleeping||isEmpty)&&<Pressable
          style={[styles.mainButton, isEmpty&&styles.buttonBottom]}
          onPress={()=>toggleTimer('awake')}
        >
          <Text style={styles.mainButtonText}>
            {`Wake\nup`}
          </Text>
        </Pressable>}

        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Manual</Text>
        </Pressable>
      </View>

      <View style={styles.logsContainer}>
        <ScrollView style={styles.scrollView}>
          {isEmpty&&<Text style={styles.logText}>No records today...</Text>}
          {timerLogs.map((log, index) => (
            <Text key={index} style={styles.logText}>{log}</Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: color.accent,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    textShadowColor: 'rgba(255, 211, 61, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  timerBlock: {
    padding: 20,
    borderRadius: 25,
    width: 300,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: color.accent,
    alignSelf:'center'
  },
  status: {
    flexDirection:'row',
    alignItems:'center',
    position:'absolute',
    backgroundColor:color.accent,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8,
    height: 34,
    top: -17,
  },
  statusText: {
    color: color.textSecondary,
    fontSize: 16,
  },
  timerText: {
    fontSize: 36,
    color: color.textPrimary,
    fontWeight: 'regular',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 20,
  },
  mainButton: {
    backgroundColor: color.accent,
    width: 250,
    height: 250,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1.02 }],
  },
  buttonTop:{
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 120,
  }, 
  buttonBottom:{
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 120,
  },
  stopButton: {
    backgroundColor: '#ff4444',
    shadowColor: '#ff4444',
  },
  mainButtonText: {
    fontSize: 36,
    fontWeight: 'regular',
    color: color.textSecondary,
    letterSpacing: 1,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  secondaryButton: {
    width: 250,
    height: 55,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: color.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: color.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  secondaryButtonText: {
    fontSize: 20,
    color: color.accent,
    fontWeight: '600',
    letterSpacing: 1,
  },
  logsContainer: {
    flex: 1,
    marginTop: 30,
  },
  scrollView: {
    borderRadius: 20,
    padding: 20,
    borderColor: color.accent,
    borderWidth: 2,
  },
  logText: {
    color: color.textSecondary,
    fontSize: 16,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: color.accent,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

