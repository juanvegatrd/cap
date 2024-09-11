import { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth';
import { styled } from 'nativewind'; 
import { useTodoStore } from '@/store/todo';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function Login() {
  const { setLoading } = useTodoStore()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, register } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true)
      Keyboard.dismiss();
      await login(email, password);
      setLoading(false)
      router.replace('/todo');
    } catch (error) {
      setLoading(false)
      setErrorMessage('Error logging in');
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true)
      Keyboard.dismiss();
      await register(email, password);
      handleLogin()
    } catch (error) {
      setLoading(false)
      setErrorMessage('Error signing up');
    }
  };

  return (
    <StyledView className="flex-1 w-full justify-center items-center p-6 bg-gray-100">
      <StyledText className="text-3xl font-bold text-gray-800 mb-4">
        {isSignUp ? 'Sign Up' : 'Login'}
      </StyledText>
      <StyledTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="w-full p-4 bg-white border border-gray-300 rounded-lg mb-4 shadow-sm"
      />
      <StyledTextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        className="w-full p-4 bg-white border border-gray-300 rounded-lg mb-4 shadow-sm"
      />
      {errorMessage ? (
        <StyledText className="mb-4">{errorMessage}</StyledText>
      ) : null}

      <StyledTouchableOpacity
        onPress={isSignUp ? handleSignUp : handleLogin}
        className="w-full p-4 bg-green-500 rounded-lg items-center shadow-md mb-4"
      >
        <StyledText className="text-white font-bold text-lg">
          {isSignUp ? 'Sign Up' : 'Login'}
        </StyledText>
      </StyledTouchableOpacity>

      <StyledText
        className="text-blue-500 underline mt-4"
        onPress={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp
          ? 'Already have an account? Login'
          : "Don't have an account? Sign Up"}
      </StyledText>
    </StyledView>
  );
}
