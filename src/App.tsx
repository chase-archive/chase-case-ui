import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Layout from './Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </MantineProvider>
  );
}
