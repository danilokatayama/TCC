import { StyleSheet } from 'react-native';
// #c6edf1 #49c290 #529ddb #5b80c1 rgba(198,237,241,1)'
const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: "center",
    alignContent: 'center',
    paddingHorizontal: 10,
  },

  button: {
    marginTop: 10,
    height: 100,
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#c6edf1',
    borderRadius: 8,
    padding: 20
  },

  buttonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#4c4c4c',
    textAlign: 'center'
  }

});

export default styles;