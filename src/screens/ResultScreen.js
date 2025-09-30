import   React   from 'react' 
import { 
   View , Text , StyleSheet , Image , ScrollView
} from   'react-native'   

import { Button } from   '../ui/Button'   



export default   function ResultScreen ( { route , navigation } ) 
{
   const { record } = route.params  

   const { plantName , imageUri , diseaseName , confidence , description , treatments } = record


   return(
      <ScrollView contentContainerStyle={ styles.container }>

         { imageUri 
             ? <Image source={ { uri:imageUri } } style={ styles.image } /> 
             : null }

         <Text style={ styles.h1 }> { plantName } </Text>

         <View style={ styles.card }>

            <Text style={ styles.label }> Disease </Text>
            <Text style={ styles.value }> { diseaseName } </Text>

            <Text style={ styles.label }> Confidence </Text>
            <Text style={ styles.value }> { Math.round( confidence *100 ) }% </Text>

            <Text style={ styles.label }> Description </Text>
            <Text style={ styles.body }> { description } </Text>

            <Text style={ styles.label }>
               Recommended treatments / preventive actions
            </Text>

            { treatments.map( (t , idx) => (
                 <Text key={ idx } style={ styles.body }> • { t } </Text>
            )) }

         </View>

         <Button 
            title="Back to Scan" 
            onPress={ () => navigation.popToTop() } />

      </ScrollView>
   )
}



const styles = StyleSheet.create ( {
   container : { padding:16 , gap:16 } ,
   h1 : { fontSize:24 , fontWeight:'700' } ,
   image : { width:'100%' , height:240 , borderRadius:12 } ,
   card : { 
      padding:16 , borderWidth:1 , borderColor:'#eee' , borderRadius:12 ,
      backgroundColor:'#fff' , gap:8 
   } ,
   label : { fontWeight:'700' } ,
   value : { fontSize:16 } ,
   body : { color:'#333' , lineHeight:20 }
} )
