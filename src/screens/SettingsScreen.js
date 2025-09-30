import   React   from 'react' 
import { 
   View , Text , TextInput , StyleSheet
} from  'react-native'   

import useSettingsStore from   '../store/settingsStore'   



export default  function   SettingsScreen ( ) 
{
   const apiKey   = useSettingsStore( s => s.plantIdApiKey )  
   const setApiKey = useSettingsStore( s => s.setPlantIdApiKey ) 


   return(
      <View style={ styles.container }>

         <Text style={ styles.h1 }> Settings </Text>

         <Text style={ styles.label }> Plant.id API Key (optional) </Text>

         <TextInput
            value = { apiKey }
            onChangeText = { setApiKey }
            placeholder = "Enter API key to enable API-based diagnosis"
            style = { styles.input }
            autoCapitalize = "none"
         />

         <Text style={ { color:'#666' } }>
           Leave blank to use local diagnosis by plant name only. 
           Images are optional and used for display.
         </Text>

      </View>
   )
}



const styles = StyleSheet.create ( {
   container : { padding:16 , gap:12 } ,
   h1 : { fontSize:22 , fontWeight:'800' } ,
   label : { fontWeight:'700' } ,
   input : { 
      borderWidth:1 , borderColor:'#ccc' , borderRadius:8 , padding:12 ,
      backgroundColor:'#fff'
   }
} )
