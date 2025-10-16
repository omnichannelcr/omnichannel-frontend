export interface Feature {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export const homeFeatures: Feature[] = [
  {
    id: 'leadManagement',
    icon: 'users',
    titleKey: 'features.leadManagement.title',
    descriptionKey: 'features.leadManagement.description'
  },
  {
    id: 'omnichannel',
    icon: 'message-circle',
    titleKey: 'features.omnichannel.title',
    descriptionKey: 'features.omnichannel.description'
  },
  {
    id: 'aiPowered',
    icon: 'brain',
    titleKey: 'features.aiPowered.title',
    descriptionKey: 'features.aiPowered.description'
  },
  {
    id: 'analytics',
    icon: 'bar-chart',
    titleKey: 'features.analytics.title',
    descriptionKey: 'features.analytics.description'
  }
];
