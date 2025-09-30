import   React   from 'react' 
import { 
   View , Text , Image , StyleSheet , ScrollView
 } from  'react-native'   

import  useHistoryStore  from   '../store/historyStore'   



export default  function   DetailsScreen ( { route } ) 
{
   const { id } =   route.params  

   const record = useHistoryStore( s  => 
       s.records.find( r  =>  r.id === id ) 
   ) ;


   if( ! record ) 
      return(
         <View style={ styles.center }>
            <Text>  Record not found. </Text>
         </View>
      ) ;


   return(
      <ScrollView 
           contentContainerStyle={ { padding:16 ,   gap :12 } } >

        { record.imageUri 
            ? <Image source={ { uri : record.imageUri } } style={styles.image} /> 
            : null }

        <Text style={ styles.h1 }> { record.plantName } </Text>

        <Text style={ styles.h2 }>
            { record.diseaseName } • { Math.round( record.confidence * 100 ) }%
        </Text>

        <Text style={ styles.body }> { record.description } </Text>

        <Text style={ styles.h3 }> Treatments / Preventive Actions </Text>

        { record.treatments.map( (t, idx) => (
             <Text key={ idx } style={ styles.body }> • { t } </Text>
        )) }

      </ScrollView>
   )
}



const  styles  =  StyleSheet.create ( {
    center : { flex:1 , alignItems:'center' , justifyContent:'center' } ,
    image : { width:'100%' , height:240 , borderRadius:12 } ,
    h1 : { fontSize:22 , fontWeight:'800' } ,
    h2 : { fontSize :16 , fontWeight : '700' } ,
    h3 : { fontSize :16 , fontWeight:'700' , marginTop:8 } ,
    body : { color:'#333' , lineHeight:20 }
} )
