/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {images, theme} from '../../constants'

// Images
const { onboarding1, onboarding2, onboarding3} = images

// Theme
const {COLORS, FONTS, SIZES} = theme

// Dummy data istället för json-fil
const OnBoardings = [
  {
    title: 'Welcome to Waytogo',
    discription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: onboarding1
   
  },
  {
    title: 'How to use waytogo',
    discription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: onboarding2
  
  },
  {
    title: 'Lets begin',
    discription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: onboarding3
  }
  
]


const OnBoarding = () => {
  const [completed, setCompleted] =useState(false)

  const scrollX = new Animated.Value(0)

  // To check if user scroll to end page.
  useEffect(() => {
    scrollX.addListener(({value}) => {
      if(Math.floor(value / SIZES.width) === OnBoardings.length -1) {
        setCompleted(true)
      }
    })
    return () => scrollX.removeListener()
  }, [])

  // Render 
  function renderContent(){
    return (
    <Animated.ScrollView
    horizontal
    pagingEnabled
    scrollEnabled
    decelerationRate={0}
    scrollEventThrottle={16}
    snapToAlignment='center'
    showsHorizontalScrollIndicator={false}
    onScroll={Animated.event([
      {nativeEvent: {contentOffset: {x: scrollX}}}
    ], {useNativeDriver: false})}
    >
    {OnBoardings.map((item, index) => (
      
        <View 
        key={index}
        style={{width: SIZES.width}}

        >
        {/*Image */}
         <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
         <Image source={item.img}
                resizeMode='cover'
                style={{
                  width: SIZES.width,
                  height: SIZES.height

                }}
         />
         </View>
         <View 
         style={{ 
          position:'absolute',
          bottom:'10%',
          left:40,
          right:40
          
         }}>
         <Text
         style={{
          ...FONTS.h1,
          color:COLORS.white,
          textAlign:'center'
         }}>
         {item.title}
         </Text>
         <Text
         style={{
           ...FONTS.body3,
           color:COLORS.gray,
           marginTop:SIZES.base,
           textAlign:'center'

         }}>{item.discription}</Text>
         </View>
      
         <TouchableOpacity
         style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 150,
          height: 60,
          paddingLeft: 20,
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
          justifyContent: 'center',
           backgroundColor: COLORS.blue
          }}
          onPress={() => {
            console.log('Skip or Login')
          }}
         >
         <Text style={{...FONTS.h2, color: COLORS.white}}>{completed ? 'Login' : 'Skip'}</Text>
         </TouchableOpacity>
        </View>
      
    ))}
    </Animated.ScrollView>
    )
  }

  function renderDots(){

    const dotPosition = Animated.divide(scrollX, SIZES.width)
    return (
      <View style={styles.dotContainer}>
      {OnBoardings.map((item, index) => {

        const opacity = dotPosition.interpolate({
          inputRange: [index -2, index, index +2],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp'
        })

        const dotSize = dotPosition.interpolate({
          inputRange: [index -2, index, index +2],
          outputRange: [SIZES.base, 17, SIZES.base],
          extrapolate: 'clamp'
        })
        return(
          <Animated.View
          key={`dot-${index}`}
          opacity={opacity}
          style={[styles.dot, {width: dotSize, height:dotSize}]

          }>
          </Animated.View>
        )
      })}
      </View>
    )
  }
  return (
      <SafeAreaView style={styles.container}>
      <View>
      {renderContent()}
      </View>
      <View style={styles.dotsRootContainer}>
      {renderDots()}
      </View>
 
      </SafeAreaView>
   
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  dotsRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '30%' : '20%'
  },
  dotContainer: {
    flexDirection:'row',
    height: SIZES.padding,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor:COLORS.blue,
    marginHorizontal: SIZES.radius / 2
  }

})

export default OnBoarding;

