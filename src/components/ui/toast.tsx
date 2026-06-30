import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { colors } from "@/lib/theme";

const TOAST_DURATION_MS = 3000;

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((nextMessage: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setMessage(nextMessage);

    timeoutRef.current = setTimeout(() => {
      setMessage(null);
      timeoutRef.current = null;
    }, TOAST_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {message && (
        <View pointerEvents="none" style={styles.toast}>
          <AppText variant="body3" color="white">
            {message}
          </AppText>
        </View>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: colors.black,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
