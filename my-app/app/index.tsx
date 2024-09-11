import Login from '@/components/Login';
import { useAuthStore } from '@/store/auth';
import { Redirect } from 'expo-router';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledSafeAreaView = styled(SafeAreaView);


export default function HomePage() {
  const { isAuth } = useAuthStore();

  if (isAuth) {
    return <Redirect href="/todo" />;
  }
 return(
  <StyledSafeAreaView className="flex-1 justify-start items-center p-5 bg-gradient-to-b from-blue-300 to-blue-600">
    <Login/>
  </StyledSafeAreaView>
 )
}