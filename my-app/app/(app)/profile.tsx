import { View } from 'react-native';
import LogoutButton from '@/components/LogoutButton';
import { styled } from 'nativewind';

const StyledView = styled(View)

export default function ProfileScreen() {
  return (
    <StyledView className="flex-1 p-5 bg-gray-100">
      <LogoutButton />
    </StyledView>
  );
}
