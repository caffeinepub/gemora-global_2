import { useActor as useCoreActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { BackendActor } from "../types";

// Pre-bound hook — call useActor() with no arguments throughout the app
export function useActor(): {
  actor: BackendActor | null;
  isFetching: boolean;
} {
  const result = useCoreActor(createActor);
  return {
    actor: result.actor as BackendActor | null,
    isFetching: result.isFetching,
  };
}
