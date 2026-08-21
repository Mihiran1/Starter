import { AppShell, Burger, Group, NavLink, Title, Button, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={3} style={{ color: '#228be6' }}>Acme Inc.</Title>
          </Group>
          {user && <Title order={6} fw={500}>{user.email}</Title>}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Box style={{ flex: 1 }}>
          <NavLink
            label="Dashboard Home"
            active={location.pathname === '/dashboard'}
            onClick={() => {
              navigate('/dashboard');
              if (opened) toggle();
            }}
            variant="filled"
            style={{ borderRadius: '8px' }}
          />
          {/* Add more navigation links here later */}
        </Box>
        
        <Box>
          <Button fullWidth variant="light" color="red" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </AppShell.Navbar>

      <AppShell.Main style={{ backgroundColor: '#f8f9fa' }}>
        {/* The current child route will be rendered here */}
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
