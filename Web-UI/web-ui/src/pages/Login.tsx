import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Box,
  Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { IconBrandApple, IconBrandGoogle, IconBrandMeta } from '@tabler/icons-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import bgImage from '../assets/login-bg.png';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleLogin = async (values: typeof form.values) => {
    try {
      const response = await api.post('/auth/login', values);
      const { data } = response.data;
      login(data.token, { email: data.email, role: data.role });
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response?.data?.message) {
        form.setErrors({ email: error.response.data.message });
      } else {
        form.setErrors({ email: 'An error occurred during login' });
      }
    }
  };

  return (
    <Box 
      style={{ 
        backgroundColor: '#f9fafb', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <Paper radius="md" shadow="sm" style={{ overflow: 'hidden', display: 'flex', width: '100%', maxWidth: 900 }}>
        {/* Left Side: Form */}
        <Box w={{ base: '100%', md: '50%' }} p={40} style={{ backgroundColor: 'white' }}>
          <Title ta="center" fw={700} size="h3">Welcome back</Title>
          <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
            Login to your Acme Inc account
          </Text>

          <form onSubmit={form.onSubmit(handleLogin)}>
            <TextInput
              label={<Text fw={600} size="sm">Email</Text>}
              placeholder="m@example.com"
              required
              {...form.getInputProps('email')}
            />

            <Group justify="space-between" mt="md" mb={5}>
              <Text fw={600} size="sm" component="label" htmlFor="password-input">Password</Text>
              <Anchor component="button" size="xs" color="dimmed" onClick={(e) => e.preventDefault()}>
                Forgot your password?
              </Anchor>
            </Group>
            <PasswordInput
              id="password-input"
              placeholder="Your password"
              required
              {...form.getInputProps('password')}
            />

            <Button fullWidth mt="xl" type="submit" color="black" radius="md">
              Login
            </Button>
          </form>

          <Divider label="Or continue with" labelPosition="center" my="lg" />

          <Group grow mb="md" mt="md">
            <Button variant="default" radius="md" h={40}>
              <IconBrandApple size={20} stroke={1.5} color="black" />
            </Button>
            <Button variant="default" radius="md" h={40}>
              <IconBrandGoogle size={20} stroke={1.5} color="black" />
            </Button>
            <Button variant="default" radius="md" h={40}>
              <IconBrandMeta size={20} stroke={1.5} color="black" />
            </Button>
          </Group>

          <Text c="dimmed" size="sm" ta="center" mt="xl">
            Don't have an account?{' '}
            <Anchor size="sm" component="button" color="dimmed" style={{ textDecoration: 'underline' }} onClick={() => navigate('/signup')}>
              Sign up
            </Anchor>
          </Text>
        </Box>

        {/* Right Side: Image/Placeholder */}
        <Box 
          w={{ base: '0%', md: '50%' }} 
          style={{ 
            backgroundColor: '#e5e7eb',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          visibleFrom="md"
        />
      </Paper>
      
      <Text c="dimmed" size="xs" ta="center" mt={25}>
        By clicking continue, you agree to our <Anchor size="xs" color="dimmed" style={{ textDecoration: 'underline' }}>Terms of Service</Anchor> and <Anchor size="xs" color="dimmed" style={{ textDecoration: 'underline' }}>Privacy Policy</Anchor>.
      </Text>
    </Box>
  );
}
