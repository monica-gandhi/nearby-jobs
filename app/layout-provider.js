'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../common/store/store';
import { Toaster } from 'react-hot-toast';

export default function ClientLayoutWrapper({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Toaster
            toastOptions={{
              style: {
                fontSize: '16px',
                padding: '12px 20px',
                background: '#333',
                color: '#fff',
                borderRadius: '8px',
              },
              success: {
                style: {
                  background: '#4BB543',
                },
              },
              error: {
                style: {
                  background: '#FF3333',
                },
              },
            }}
          />
         {children}
      </PersistGate>
    </Provider>
  );
}
