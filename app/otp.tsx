import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo'


export default function otp() {
    const[code,setCode]=useState('')
    const{isLoaded,signUp,setActive}=useSignUp()

    const verifyCode = async ()=>{
        if(!isLoaded) return
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({code})
            await setActive({session:completeSignUp.createdSessionId})
            console.log(code,"correct")
            
        } catch (error) {
            console.log(JSON.stringify(error,null,2))
        }
    }
  return (
    <View style={styles.container}>
      <Text>Enter Email Verification Code</Text>
      <TextInput 
      style={styles.input}
      placeholder='Enter Code'
      value={code}
      onChangeText={code=>setCode(code)}/>
      <TouchableOpacity style={styles.button} onPress={verifyCode}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center"
    },
    input:{
        borderRadius:12,
        height:35,
        width:"70%",
        backgroundColor:"lightgray"
    },
    button:{
        backgroundColor:"plum",
        borderRadius:12,
        padding:6,
        width:"70%"
    },
    buttonText:{
        textAlign:"center",
        fontSize:12,
        fontWeight:"bold"
    }
})