
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { argsToDetails, argsToMessage, normalizeErrorInput, toPlainError } from './error-utils';

interface Props {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const IFRAME_ID = 'mobile-view-iframe';

const webTargetOrigins = [
  "http://localhost:3000",
  "https://gotvibe.ai",
  "https://gotvibe.ai",
];    

function sendErrorToIframeParent(error: any, errorInfo?: any) {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    const normalized = normalizeErrorInput(error, errorInfo);
    const errorMessage = {
      type: 'ERROR',
      error: normalized,
      iframeId: IFRAME_ID,
    } as const;

    try {
      window.parent.postMessage(
        errorMessage,
        webTargetOrigins.includes(document.referrer) ? document.referrer : '*'
      );
    } catch (postMessageError) {
      console.warn('Failed to send error to parent:', postMessageError);
    }
  }
}

if (Platform.OS === 'web' && typeof window !== 'undefined') {
  // Capture all window errors with useCapture=true
  window.addEventListener('error', (event) => {
    event.preventDefault();
    const errorDetails = event.error ?? {
      message: event.message ?? 'Unknown error',
      filename: event.filename ?? 'Unknown file',
      lineno: event.lineno ?? 'Unknown line',
      colno: event.colno ?? 'Unknown column'
    };
    sendErrorToIframeParent(errorDetails);
    return true;
  }, true);

  // Capture promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    sendErrorToIframeParent(event.reason);
    return true;
  }, true);

  // Override console.error to catch React errors
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    // Produce a readable message and rich details instead of [object Object]
    const message = argsToMessage(args);
    // Heuristic: first arg might be an Error
    const first = args[0];
    const payload = first ? toPlainError(first) : { message };
    // Attach additional details from the rest of the args
    const details = argsToDetails(args);
    if (details !== undefined) (payload as any).details = details;

    sendErrorToIframeParent(payload);
    originalConsoleError.apply(console, args);
  };

  // Override window.onerror as a fallback
  const originalOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    sendErrorToIframeParent({
      message: message?.toString() || 'Unknown error',
      source,
      lineno,
      colno,
      stack: error?.stack
    });
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    return true;
  };
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to parent iframe
    sendErrorToIframeParent(error, errorInfo);
    
    // Also log to console for debugging
    // These will be serialized by our console override without [object Object]
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidMount() {
    // Set up global error handler for async errors
    if (Platform.OS === 'web') {
      // React 18+ error handling
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('error', this.handleGlobalError);
        window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
      }
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.removeEventListener('error', this.handleGlobalError);
      window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
    }
  }

  handleGlobalError = (event: ErrorEvent) => {
    const error = new Error(event.message);
    error.stack = event.error?.stack || `at ${event.filename}:${event.lineno}:${event.colno}`;
    this.setState({ hasError: true, error });
  };

  handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const error = new Error(event.reason?.message || event.reason?.toString() || 'Unhandled Promise Rejection');
    error.stack = event.reason?.stack || 'No stack trace available';
    this.setState({ hasError: true, error });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Something went wrong</Text>
            <Text style={styles.subtitle}>{this.state.error?.message}</Text>
            {Platform.OS !== 'web' && (
              <Text style={styles.description}>
                Please check your device logs for more details.
              </Text>
            )}
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
}); 
