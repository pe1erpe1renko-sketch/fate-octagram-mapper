export function createPayment(planId: string): Promise<{
  ok: boolean;
  planId: string;
  paymentUrl: string;
  demo: boolean;
}>;

export function cancelSubscription(planId: string): Promise<{
  ok: boolean;
  planId: string;
  activeUntil: string;
  demo: boolean;
}>;
