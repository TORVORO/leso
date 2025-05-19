import { LeaseDetailsPage } from '@/components/leases/lease-details-page';

export default function LeaseDetails({ params }: { params: { id: string } }) {
  return <LeaseDetailsPage id={params.id} />;
}