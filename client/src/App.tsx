import { Suspense } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import TodoPage from './components/page';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
          <Suspense fallback={'Loading...'}>
            <div className="app">
              <TodoPage />
            </div>
          </Suspense>
        </ErrorBoundary>
      </RelayEnvironmentProvider>
    </RecoilRoot>
  );
}

export default App;
