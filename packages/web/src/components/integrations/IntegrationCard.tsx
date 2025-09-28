import Link from 'next/link';
import Image from 'next/image';
import { Integration } from '@/types/integrations';

interface IntegrationCardProps {
  integration: Integration;
}

export function IntegrationCard({ integration }: IntegrationCardProps) {

  return (
    <Link href={integration.href}>
      <div className="group rounded-lg border p-4 hover:shadow-md transition-all duration-200 cursor-pointer bg-white border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300">
        <div className="flex items-start space-x-3">
          {/* Icon/Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-full rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={integration.image || ''}
                  alt={integration.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold mb-1 text-neutral-900">
              {integration.name}
            </h3>
            <p className="text-sm mb-2 text-neutral-600">
              {integration.description}
            </p>
            
            {/* Status and arrow */}
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                integration.status === 'connected' 
                  ? 'bg-success-50 text-success-500' 
                  : 'bg-neutral-100 text-neutral-600'
              }`}>
                {integration.status === 'connected' ? 'Connected' : 'Connect'}
              </span>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
