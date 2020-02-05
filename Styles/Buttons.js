import {StyleSheet} from 'react-native';
import * as AppPallett from '../constants/Colors';

const appAccent = AppPallett.appAccent;


export const importedStyles = StyleSheet.create({
    viewbuttonStyle: {
        width: 120, height: 40, backgroundColor: appAccent, alignItems: 'center', textAlignVertical:'center', justifyContent:'center', flex:1, borderRadius:5, margin:2
      },
      textbuttonStyle:{
        color:'#fff', fontWeight:'bold'
      }
});