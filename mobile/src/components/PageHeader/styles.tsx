import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#rgba(255, 255, 255, 0.0)',
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 120,
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  },


  goBackContainer: {
    flexDirection: 'row'
  },

  titulo: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#3E3E3E',
    position: "absolute",
    left: 30,
    height: '60%'
    // top: 0,
    // bottom: 0,
    // marginVertical: 'auto'
  },

  LogoutContainer: {
    alignSelf: 'flex-end',
  },
  logoutButton: {
    textAlign: 'right',
    marginTop: 5,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#3E3E3E'
  }

});

export default styles;