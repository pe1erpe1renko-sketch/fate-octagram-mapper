export function generatePDF(matrix: unknown): Promise<{
  ok: boolean;
  url: string | null;
  demo: boolean;
  birthDate?: string | null;
}>;
