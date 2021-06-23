import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },

  content: {
    flexDirection: 'column',
    height: '90%',
    width: 350,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 80
  },

  generator: {
    position: 'absolute',
    height: 97,
    top: 0,
    left: -170
  },
  generatorTitle: {
    position: 'absolute',
    top: 50,
    left: 0,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16
  },

  rp: {
    position: 'absolute',
    height: 206,
    top: 97,
    left: 25
  },

  rp5101Title: {
    position: 'absolute',
    top: 110,
    left: 55,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16
  },
  rpTR01Title: {
    position: 'absolute',
    top: 216,
    left: 55,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16
  },

  dj: {
    position: 'absolute',
    height: 144,
    top: 303,
    left: 58
  },

  rp5102Title: {
    position: 'absolute',
    top: 320,
    left: 55,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16
  },

  loadTitle: {
    position: 'absolute',
    top: 420,
    left: 55,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16
  },

  tableText: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16
  },

  infoBox1Container: {
    width: 150,
    height: 100,
    flexWrap: 'wrap',
    backgroundColor: 'white',
    alignContent: 'space-between',
    padding: 2
  },

  infoBox2Container: {
    width: 150,
    height: 170,
    flexWrap: 'wrap',
    backgroundColor: 'white',
    alignContent: 'space-between',
    padding: 2
  },

  infoBoxLeftItem: {
    backgroundColor: '#4b5e80',
    height: '100%',
    width: '25%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },


  infoBoxRightItem: {
    paddingLeft: 10,
    backgroundColor: '#4b5e80',
    height: '100%',
    width: '70%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start'
  },

});

export default styles;