import { Suspense } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { RecoilRoot } from 'recoil';
import { RecoilRelayEnvironmentProvider } from 'recoil-relay';
import RelayEnvironment, { environmentKey } from './RelayEnvironment';
import TodoPage from './components/page';

function App() {
  return (
    <RecoilRoot>
      <RecoilRelayEnvironmentProvider
        environment={RelayEnvironment}
        environmentKey={environmentKey}
      >
        <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
          <Suspense fallback={'Loading...'}>
            <div className="app">
              <TodoPage />
            </div>
          </Suspense>
        </ErrorBoundary>
      </RecoilRelayEnvironmentProvider>
    </RecoilRoot>
  );
}

export default App;
