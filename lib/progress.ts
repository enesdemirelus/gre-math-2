"use client";
import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "./storage";

const EVT = "gre-progress";

export interface QuizRecord {
  best: number;
  total: number;
  lastScore: number;
  last: number; // epoch ms
  attempts: number;
}

export interface PracticeAttempt {
  date: number;
  score: number;
  total: number;
  secondsUsed: number;
  bySection: Record<string, { correct: number; total: number }>;
  byType: Record<string, { correct: number; total: number }>;
}

function readJson<T>(key: string, fallback: T): T {
  const raw = readStorage(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  writeStorage(key, JSON.stringify(value));
  try {
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* ignore */
  }
}

export const getQuiz = (sectionId: string) => readJson<QuizRecord | null>(`gre:quiz:${sectionId}`, null);

export function recordQuiz(sectionId: string, score: number, total: number) {
  const prev = getQuiz(sectionId);
  const rec: QuizRecord = {
    best: Math.max(prev?.best ?? 0, score),
    total,
    lastScore: score,
    last: Date.now(),
    attempts: (prev?.attempts ?? 0) + 1,
  };
  writeJson(`gre:quiz:${sectionId}`, rec);
}

export const getKnown = (sectionId: string) => readJson<string[]>(`gre:known:${sectionId}`, []);
export const setKnown = (sectionId: string, ids: string[]) => writeJson(`gre:known:${sectionId}`, ids);

/** Mistake keys are "<sectionId>/<questionId>". */
export const getMistakes = () => readJson<string[]>("gre:mistakes", []);

export function updateMistakes(sectionId: string, wrong: string[], right: string[]) {
  const set = new Set(getMistakes());
  for (const id of wrong) set.add(`${sectionId}/${id}`);
  for (const id of right) set.delete(`${sectionId}/${id}`);
  writeJson("gre:mistakes", [...set]);
}

export const getPractice = () => readJson<PracticeAttempt[]>("gre:practice", []);
export function addPractice(a: PracticeAttempt) {
  writeJson("gre:practice", [...getPractice(), a].slice(-50));
}

export function resetAllProgress(sectionIds: string[]) {
  try {
    for (const id of sectionIds) {
      window.localStorage.removeItem(`gre:quiz:${id}`);
      window.localStorage.removeItem(`gre:known:${id}`);
    }
    window.localStorage.removeItem("gre:mistakes");
    window.localStorage.removeItem("gre:practice");
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVT));
}

/** Reads from storage after mount and again whenever progress changes. */
export function useStored<T>(read: () => T, initial: T): [T, boolean] {
  const [v, setV] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const load = () => {
      setV(read());
      setReady(true);
    };
    load();
    window.addEventListener(EVT, load);
    return () => window.removeEventListener(EVT, load);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [v, ready];
}
