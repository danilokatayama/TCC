import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center'
  },

  dashTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 30,
    marginTop: 5,
    color: '#3E3E3E'
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  reload: {
    position: 'absolute',
    right: 10,
    top: 122
  },

  linechart: {
    marginTop: 30,
    borderRadius: 16,
  },

  valueBoxContainer: {
    flex: 0.8,
    flexDirection: 'row',
  },

  valueBoxWrapper: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  valueBoxTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },

  valueBoxText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },

})

export default styles;