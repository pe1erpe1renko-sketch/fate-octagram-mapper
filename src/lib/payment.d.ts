export function createPayment(planId: string): Promise<{
  ok: boolean;
  planId: string;
  paymentUrl: string;
  demo: boolean;
}>;
