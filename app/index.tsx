import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function SignUp() {
    const[firstName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')
    const[emailAddress,setEmailAddress]=useState('')
    const[password,setPassword]=useState('')
    const[pendingVerification,setPendingVerification]=useState(false)
    const { isLoaded, setActive, signUp } =useSignUp()
    const router = useRouter()

    const handleSignUp = async ()=>{
        if(!isLoaded) return
        try {
            await signUp.create({
                emailAddress,
                password
            })
            await signUp.prepareEmailAddressVerification({strategy:"email_code"})
            setPendingVerification(true)
            router.push('/otp')
        } catch (error) {
            console.log(JSON.stringify(error,null,2))
        }
    }
  return (
    <View style={styles.container}>
      <Text>Sign Up Page</Text>
      <TextInput 
      style={styles.input} 
      placeholder='Enter First Name'
      value={firstName}
      onChangeText={firstName=>setFirstName(firstName)}/>
      <TextInput
       style={styles.input} 
       placeholder='Enter Last Name'
       value={lastName}
       onChangeText={lastName=>setLastName(lastName)}/>
      <TextInput 
      style={styles.input} 
      placeholder='Enter Email'
      value={emailAddress}
      onChangeText={emailAddress=>setEmailAddress(emailAddress)}/>
      <TextInput 
      style={styles.input} 
      placeholder='Enter Password'
      secureTextEntry={true}
      value={password}
      onChangeText={password=>setPassword(password)}/>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {pendingVerification && (
        <View>

        <ActivityIndicator size={'large'} color={'black'}/>
        <Text>Sending Verification Code</Text>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    input:{
        width:"70%",
        height:35,
        backgroundColor:"lightgray",
        marginBottom:8
    },
    button:{
        backgroundColor:"plum",
        width:"70%",
        padding:12,
        borderRadius:12
    },
    buttonText:{
        textAlign:"center",
        fontSize:12,
        fontWeight:"bold",
        color:"black"
    }
})