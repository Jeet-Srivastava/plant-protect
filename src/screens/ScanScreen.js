import   'react-native-get-random-values' 
import   React , { useState } from 'react' 
import { 
  View , Text , TextInput , StyleSheet , Image , Alert ,
  KeyboardAvoidingView , Platform , ScrollView
} from  'react-native'   

import * as ImagePicker from  'expo-image-picker' 
import { Button } from   '../ui/Button'  
import { diagnoseByName , getMockDiagnosis } from '../services/diseaseService' 
import  useHistoryStore  from   '../store/historyStore' 
import { v4 as  uuidv4 } from  'uuid' 



export default function   ScanScreen ( { navigation } ) 
{
  const [ plantName , setPlantName ] = useState ( '' )
  const [ imageUri , setImageUri ]   = useState ( null )
  const addRecord = useHistoryStore ( s => s.addRecord )
  const [ submitting , setSubmitting ] = useState ( false ) 


  const pickImage = async ( ) => {
     const result = await ImagePicker.launchImageLibraryAsync ( {
        mediaTypes : ImagePicker.MediaTypeOptions.Images ,
        quality : 0.8 ,
        base64 : false ,
     } )
     if ( ! result.canceled )  setImageUri( result.assets[0].uri )
  }


  const takePhoto = async ( ) => {
     const { status } = await ImagePicker.requestCameraPermissionsAsync ( )
     if ( status !== 'granted' ) {
        Alert . alert ( 'Permission required' , 'Camera permission is needed to take photos.' )
        return
     }
     const result = await ImagePicker.launchCameraAsync ( { quality:0.8 , base64:false } )
     if ( ! result.canceled ) setImageUri ( result.assets[0].uri )
  }


  const onDiagnose = ( ) => {
     if ( submitting ) return
     setSubmitting ( true )
     try {
        console . log ( 'Diagnose pressed' )
        const diagnosis = getMockDiagnosis ( )

        const record = {
           id : uuidv4 ( ) ,
           plantName : plantName.trim ( ) ,
           imageUri ,
           createdAt : new Date ( ).toISOString ( ) ,
           ... diagnosis ,
        }

        addRecord ( record )
        console . log ( 'Navigating to Result' )
        navigation . navigate ( 'Result' , { record } )
     }
     finally {
        setSubmitting ( false )
     }
  }



  return (
    <KeyboardAvoidingView 
        behavior = { Platform.OS === 'ios' ? 'padding' : undefined }
        style = { { flex:1 } } >

      <ScrollView 
          contentContainerStyle = { styles.container }
          keyboardShouldPersistTaps = "handled" >

        <Text style = { styles.title }>
           Capture or upload plant leaf images and type the plant name
        </Text>

        <View style = { styles.imageBox } >
          { imageUri 
              ? <Image source={ { uri:imageUri } } style={ styles.image } />
              : <Text style={ { color:'#888' } }> No image selected </Text> }
        </View>

        <View style = { styles.row } >
           <Button title="Take Photo" onPress={ takePhoto } />
           <View style={ { width:12 } } />
           <Button title="Upload" onPress={ pickImage } variant="secondary" />
        </View>

        <Text style={ styles.label }> Plant Name </Text>

        <TextInput
           placeholder = "e.g., Rose, Tomato, Mango"
           value = { plantName }
           onChangeText = { setPlantName }
           style = { styles.input }
           autoCapitalize = "words"
        />

        <Button 
           title = "Diagnose"
           onPress = { onDiagnose }
           disabled = { submitting }
           loading = { submitting }
        />

      </ScrollView>
    </KeyboardAvoidingView>
  )
}



const styles = StyleSheet.create ( {
  container : { padding:16 , gap:16 } ,
  title : { fontSize:18 , fontWeight:'600' } ,
  imageBox : {
     height:220 , borderWidth:1 , borderColor:'#ddd' , borderRadius:12 ,
     alignItems:'center' , justifyContent:'center' , overflow:'hidden' ,
     backgroundColor:'#fafafa'
  } ,
  image : { width:'100%' , height:'100%' } ,
  row : { flexDirection:'row' , alignItems:'center' } ,
  label : { fontWeight:'600' } ,
  input : {
     borderWidth:1 , borderColor:'#ccc' , borderRadius:8 , padding:12 ,
     backgroundColor:'#fff'
  }
} )
