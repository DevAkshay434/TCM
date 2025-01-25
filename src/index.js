import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'aos/dist/aos.css';
import "swiper/css";
import "swiper/css/navigation";
import 'react-toastify/dist/ReactToastify.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, ApolloLink , InMemoryCache, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { AuthProvider } from './Context/useAuth';
import { CurrencyProvider } from './Context/useCurrency';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, new HttpLink({ uri: 'https://tcmcricket.com/admin/graphql' })]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first', // Prioritize cached data for subsequent visits
      nextFetchPolicy: 'cache-and-network', // Refresh data without blocking UI
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <CurrencyProvider>
      <AuthProvider>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
      </AuthProvider>
    </CurrencyProvider>
  </BrowserRouter>
);

// Optional: measure performance and report
reportWebVitals();
