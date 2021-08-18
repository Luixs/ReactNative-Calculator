import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'





export default function App(){
  //----SET ESTADO DO DARK MODE--
  const [darkMode, setDarkMode] = useState(false);
  const buttons = ['AC', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 3, 2, 1, '+', 0, '.', '+/-', '='];
  const [lastNumber, setLastNumber] = useState(" ");
  const [currentNumber, setCurrentNumber] = useState(" ");

  function calculator(){
    const splitNumbers = currentNumber.split(' ')
    const firstNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]
    console.log(splitNumbers)
    switch (operator){
      case "+":
        setCurrentNumber((firstNumber + lastNumber).toString())
      return;
      case "-":
        setCurrentNumber((firstNumber - lastNumber).toString())
      return;
      case "*":
        setCurrentNumber((firstNumber * lastNumber).toString())
      return;
      case "/":
        setCurrentNumber((firstNumber / lastNumber).toString())
      return;
    }
  }

  function handleInput(buttonPressed){
    console.log(buttonPressed)
    if(buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "*" | buttonPressed === "/" ){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length -1)))
        return
      case 'AC':
        setLastNumber("")
        setCurrentNumber("")
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }


  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#000' : '#fff',
      width: '100%',
      minHeight: 280,
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    resultsText: {
      margin:10,
      fontSize: 40,
      color: darkMode ? "#74C69D" : "#081c15"
    },
    historyText:{
      color: darkMode ? "#74C69D" : "#081c15",
      fontSize: 20,
      alignSelf: "flex-end",
      marginRight:10
    },
    themeButton:{
      alignSelf: 'flex-start',
      bottom: 130,
      marginBottom:-10,
      marginLeft:10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: darkMode ? '#fff' : '#43956f',
      width:50,
      height:50,
      borderRadius:25
    },
    button:{
      borderColor: darkMode ? '#3f4d5b' : '#081c15',
      borderWidth:0.5,
      minWidth: 90,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight:90,
      flex:2
    },
    buttons:{
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  });

  return(
    <View>
      <View style={styles.results}>
        {/*DarkMode Button*/}
        <TouchableOpacity style={styles.themeButton}>
          <Icon name={ darkMode ? 'light-up' : 'moon' } size={25} color={ darkMode ? '#081c15' : 'white'} onPress ={()=>
            darkMode ? setDarkMode(false) : setDarkMode(true)
          }/>
        </TouchableOpacity>
        <Text style={styles.historyText}> {lastNumber}</Text>
        <Text style={styles.resultsText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button)=>
          button === '=' ? 
          <TouchableOpacity key={button} onPress={()=> handleInput(button)} style={[styles.button, {backgroundColor: "#43956f"}]}>
            <Text style={[styles.textButton, {color: 'white', fontSize: 28}]}>{button}</Text>
          </TouchableOpacity>
          : 
          <TouchableOpacity key={button} onPress={()=> handleInput(button)} style={[styles.button,
          {backgroundColor: typeof(button)==='number' ? darkMode===true ? '#000': '#fff': darkMode===true ? '#000' : '#43956f' }]}>
            <Text style={
              {
                color: typeof(button)==='number'? darkMode===true ? 'white' : 'black': darkMode===true? "white" : 'white',
                fontSize: 20
              }
            }>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
  
}

