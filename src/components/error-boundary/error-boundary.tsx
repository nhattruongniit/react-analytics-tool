import React, { useEffect, useCallback, FC, PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

// libs
import { Result, Button } from "antd";

const DefaultPage: FC<PropsWithChildren> = ({ children }) => {
  const [boundaryKey, setBoundaryKey] = React.useState(0);
  const memorizedSyncLog = useCallback(async (message?: any, componentStack?: any, version?: string) => {
    const params = {
      level: "ERROR",
      datetime: new Date().toUTCString(),
      userId: Date.now(),
      error: JSON.stringify(message),
      componentStack: JSON.stringify(componentStack),
      location: window.location.href,
      version,
      environment: process.env.VITE_ENV,
      userAgent: navigator.userAgent,
    };

    window.sessionStorage.setItem("errorLog", JSON.stringify(params));
  }, []);

  useEffect(() => {
    async function sendLogWhenOnline() {
      const getLogFromStorage: string | null = window.sessionStorage.getItem("errorLog");
      if (getLogFromStorage) {
        memorizedSyncLog();
      }
    }
    sendLogWhenOnline();

    window.onerror = async (message, _, __, ___, errorObj) => {
      memorizedSyncLog(message, errorObj?.stack);
    };

    return () => {
      window.onerror = null;
    };
  }, [memorizedSyncLog]);

  function ErrorFallbackUI() {
    return (
      <div className="flex justify-center w-screen h-screen">
        <Result
          className="place-self-center "
          title="There are some problems with your operation."
          subTitle={
            <>
              <br />
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  // resetErrorBoundary();
                  window.location.href = "/";
                  window.localStorage.clear();
                }}
              >
                Back Home
              </Button>
            </>
          }
          status="warning"
        />
      </div>
    );
  }

  return (
    <ErrorBoundary
      resetKeys={[boundaryKey]}
      FallbackComponent={ErrorFallbackUI}
      onReset={() => setBoundaryKey((prev) => prev + 1)}
    >
      {children}
    </ErrorBoundary>
  );
};

export default DefaultPage;
