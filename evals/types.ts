export type ObservationVerdict = 'pass' | 'fail' | 'skip';

export type Observation = {
  id: string;
  claim: string;
  verdict: ObservationVerdict;
  weight: number;
  note?: string;
};

export type ScenarioKind = 'offline' | 'live';

export type Scenario = {
  id: string;
  /** Passenger or agent job this stands in for. */
  useCase: string;
  kind: ScenarioKind;
  /**
   * What a coding agent is usually asked to do. Not executed by this harness.
   * A future agent-loop runner can take this as the prompt.
   */
  agentPrompt: string;
  /** Moves that usually succeed. Not scored. */
  expectedMoves: string[];
  run: () => Promise<Observation[]>;
};

export type TrialResult = {
  scenarioId: string;
  trial: number;
  observations: Observation[];
  score: number | null;
};

export type ScenarioSummary = {
  id: string;
  useCase: string;
  kind: ScenarioKind;
  trials: TrialResult[];
  score: number | null;
  skipped: boolean;
  skipReason?: string;
};

export const scoreObservations = (observations: Observation[]): number | null => {
  const counted = observations.filter((row) => row.verdict !== 'skip');
  const totalWeight = counted.reduce((sum, row) => sum + row.weight, 0);
  if (totalWeight === 0) {
    return null;
  }
  const passedWeight = counted
    .filter((row) => row.verdict === 'pass')
    .reduce((sum, row) => sum + row.weight, 0);
  return passedWeight / totalWeight;
};

export const observe = (
  id: string,
  claim: string,
  passed: boolean,
  options?: { weight?: number; note?: string; skip?: boolean },
): Observation => ({
  id,
  claim,
  verdict: options?.skip ? 'skip' : passed ? 'pass' : 'fail',
  weight: options?.weight ?? 1,
  ...(options?.note ? { note: options.note } : {}),
});

export const skipAll = (reason: string, claims: Array<{ id: string; claim: string; weight?: number }>): Observation[] =>
  claims.map((row) => observe(row.id, row.claim, false, { skip: true, note: reason, weight: row.weight }));
