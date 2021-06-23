import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
import { StyleSheet } from 'react-native';
//    #356483 #3e6e8d #97c0db #234a64 #FDB590 #5B80C1
// #c6edf1 #49c290 #529ddb #5b80c1
const styles = StyleSheet.create({
  container: {
    height: height
  },

  content: {
    flex: 1
  },

  logo: {
    marginTop: 50,
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  },

  loginContainer: {
    padding: 20,
    marginTop: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    marginHorizontal: 40
  },

  loginHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 10,
  },

  title: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#4c4c4c',
    fontSize: 24,
  },

  inputGroup: {
  },

  inputTitle: {

  },

  input: {
    fontFamily: 'Poppins_400Regular',
    backgroundColor: '#c6edf1',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10
  },

  button: {
    marginTop: 10,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5b80c1',
    padding: 10,
    borderRadius: 8
  }

});

export default styles;