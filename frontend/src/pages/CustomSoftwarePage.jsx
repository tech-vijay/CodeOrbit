import ServiceTemplate from '@/components/ServiceTemplate';
import serviceData from '@/data/services/custom-software-development';

export default function CustomSoftwarePage() {
  return <ServiceTemplate serviceData={serviceData} />;
}
