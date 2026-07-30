import { useParams } from 'react-router-dom';
import ServiceTemplate from '@/components/ServiceTemplate';
import { catalogServiceData } from '@/data/services/catalog';
import webDevelopment from '@/data/services/web-development';
import customSoftware from '@/data/services/custom-software-development';
import aiAgentDevelopment from '@/data/services/ai-agent-development';
import generativeAiSolutions from '@/data/services/generative-ai-solutions';

const detailedServices = {
  'web-development': webDevelopment,
  'custom-software-development': customSoftware,
  'ai-agent-development': aiAgentDevelopment,
  'generative-ai-solutions': generativeAiSolutions,
};

export default function ServicePage() {
  const { slug } = useParams();
  const serviceData = detailedServices[slug] || catalogServiceData[slug];
  return serviceData ? <ServiceTemplate serviceData={serviceData} /> : null;
}
