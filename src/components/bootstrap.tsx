"use client";

import { services } from "@/services";
import { updateAuthToken } from "@/utils/auth-token";
import { PropsWithChildren, useEffect, useRef } from "react";

interface BootStrapProps extends PropsWithChildren {}

export default function BootStrap({ children }: BootStrapProps) {
  const hasBootstrapped = useRef(false);

  async function handleBootstrap() {
    try {
      await services.bootstrap.post();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAuthToken() {
    try {
      const token = await services.authToken.post();
      return token;
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  async function bootstrap() {
    if (hasBootstrapped.current) return;

    hasBootstrapped.current = true;

    await handleBootstrap();
    const token = await handleAuthToken();
    updateAuthToken(token);
  }

  useEffect(() => {
    bootstrap();
  }, []);

  return <>{children}</>;
}
