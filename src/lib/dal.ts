import { cache } from "react";
import { verifySession } from "./auth";
import {
  demoClient,
  demoDocuments,
  demoProperty,
  demoVisits,
  type VisitRecord,
} from "./demoData";

export interface CurrentUser {
  id: string;
  name: string;
  firstName: string;
  initials: string;
  email: string;
  location: string;
  phone: string;
}

/**
 * Data access layer for the client portal.
 *
 * Every function verifies the session before returning data. Today the data
 * comes from the demo dataset; replacing these functions with database calls
 * later will not require changes in the pages.
 */

export const getCurrentUser = cache(async (): Promise<CurrentUser> => {
  const session = await verifySession();
  const [firstName = session.name] = session.name.split(" ");
  const initials = session.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return {
    id: session.userId,
    name: session.name,
    firstName,
    initials,
    email: session.email,
    location: demoClient.location,
    phone: demoClient.phone,
  };
});

export const getProperty = cache(async () => {
  await verifySession();
  return demoProperty;
});

export const getVisits = cache(async (): Promise<VisitRecord[]> => {
  await verifySession();
  return demoVisits;
});

export const getVisit = cache(async (id: string): Promise<VisitRecord | null> => {
  await verifySession();
  return demoVisits.find((visit) => visit.id === id) ?? null;
});

export const getDocuments = cache(async () => {
  await verifySession();
  return demoDocuments;
});
