'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { 
  createPipelineStages,
  pipelineMetrics, 
  getTotalPipelineValue, 
  getActiveLeadsCount 
} from '@/data/pipeline';
import { PipelineLead, PipelineStage } from '@/types/pipeline';
import { getIcon } from '@/components';
import Link from 'next/link';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Droppable Stage Component
const DroppableStage = ({ stage, onLeadClick, t }: { 
  stage: PipelineStage; 
  onLeadClick: (lead: PipelineLead) => void;
  t: (key: string) => string;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: stage.id,
  });

  const totalValue = stage.leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
  
  return (
    <div 
      ref={setNodeRef}
      className={`flex flex-col h-full transition-all duration-200 ${
        isOver ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      }`}
    >
      {/* Stage Header */}
      <div className={`p-4 rounded-t-lg border-2 ${stage.color} ${
        isOver ? 'bg-blue-50 border-blue-300' : ''
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">{stage.name}</h3>
          <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
            {stage.leads.length}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{t('value')}: ${totalValue.toLocaleString()}</span>
          <span className="text-gray-500">{stage.leads.length} {t('leads')}</span>
        </div>
      </div>

      {/* Leads List */}
      <div className={`flex-1 bg-gray-50 p-2 space-y-2 min-h-[400px] transition-colors duration-200 ${
        isOver ? 'bg-blue-50' : ''
      }`}>
        <SortableContext items={stage.leads.map(lead => lead.id)} strategy={verticalListSortingStrategy}>
          {stage.leads.map((lead) => (
            <SortableLeadCard key={lead.id} lead={lead} onClick={() => onLeadClick(lead)} />
          ))}
        </SortableContext>
        
        {stage.leads.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400">
            <div className="text-center">
              {getIcon('users', 'w-8 h-8 mx-auto mb-2', 32)}
              <p className="text-sm">
                {isOver ? t('dropLeadHere') : t('noLeadsInStage')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sortable Lead Card Component
const SortableLeadCard = ({ lead, onClick }: { 
  lead: PipelineLead; 
  onClick: () => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg p-3 shadow-sm border hover:shadow-md transition-shadow cursor-pointer ${
        isDragging ? 'rotate-2 scale-105' : ''
      }`}
      onClick={onClick}
    >
      <LeadCardContent lead={lead} />
    </div>
  );
};

// Lead Card Content Component (extracted for reuse)
const LeadCardContent = ({ lead }: { lead: PipelineLead }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSourceIcon = (source: string) => {
    const iconMap: { [key: string]: string } = {
      whatsapp: 'whatsapp',
      instagram: 'instagram',
      facebook: 'facebook',
      telegram: 'telegram',
      website: 'globe',
      email: 'message-circle',
      phone: 'phone',
    };
    
    return getIcon(iconMap[source] || 'message-circle', 'w-4 h-4', 16);
  };

  return (
    <>
      {/* Lead Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          {lead.avatar ? (
            <Image 
              src={lead.avatar} 
              alt={lead.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {lead.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h4 className="font-medium text-sm text-gray-900">{lead.name}</h4>
            <p className="text-xs text-gray-500">{lead.company}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {getSourceIcon(lead.source)}
          {lead.unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {lead.unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Lead Details */}
      <div className="space-y-2">
        {/* Priority and Value */}
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(lead.priority)}`}>
            {lead.priority}
          </span>
          {lead.value && (
            <span className="text-sm font-semibold text-green-600">
              ${lead.value.toLocaleString()}
            </span>
          )}
        </div>

        {/* Lead Score */}
        <div className="flex items-center space-x-2">
          {getIcon('hash', 'w-3 h-3 text-gray-400', 12)}
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${lead.leadScore}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">{lead.leadScore}</span>
        </div>

        {/* Assigned Agent */}
        {lead.assignedTo && (
          <div className="flex items-center space-x-2">
            {lead.assignedTo.avatar ? (
              <Image 
                src={lead.assignedTo.avatar} 
                alt={lead.assignedTo.name}
                width={16}
                height={16}
                className="w-4 h-4 rounded-full"
              />
            ) : (
              <div className="w-4 h-4 bg-gray-300 rounded-full" />
            )}
            <span className="text-xs text-gray-600">{lead.assignedTo.name}</span>
          </div>
        )}

        {/* Last Activity */}
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          {getIcon('message-circle', 'w-3 h-3', 12)}
          <span>{lead.lastActivity.toLocaleDateString()}</span>
        </div>

        {/* Tags */}
        {lead.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {lead.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {lead.tags.length > 2 && (
              <span className="text-xs text-gray-500">+{lead.tags.length - 2}</span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

// Metrics Dashboard Component
const MetricsDashboard = ({ t }: { t: (key: string) => string }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Leads */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{t('totalLeads')}</p>
            <p className="text-2xl font-bold text-gray-900">{pipelineMetrics.totalLeads}</p>
          </div>
          {getIcon('users', 'w-8 h-8 text-blue-500', 32)}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {getActiveLeadsCount()} active
        </p>
      </div>

      {/* Conversion Rate */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{t('conversionRate')}</p>
            <p className="text-2xl font-bold text-green-600">{pipelineMetrics.conversionRate}%</p>
          </div>
          {getIcon('bar-chart', 'w-8 h-8 text-green-500', 32)}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          +2.1% from last month
        </p>
      </div>

      {/* Pipeline Value */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{t('pipelineValue')}</p>
            <p className="text-2xl font-bold text-purple-600">
              ${getTotalPipelineValue().toLocaleString()}
            </p>
          </div>
          {getIcon('wallet', 'w-8 h-8 text-purple-500', 32)}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          ${pipelineMetrics.averageDealValue.toLocaleString()} avg deal
        </p>
      </div>

      {/* Sales Cycle */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{t('avgSalesCycle')}</p>
            <p className="text-2xl font-bold text-orange-600">{pipelineMetrics.averageSalesCycle} {t('days')}</p>
          </div>
          {getIcon('message-circle', 'w-8 h-8 text-orange-500', 32)}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          -3 days from last month
        </p>
      </div>
    </div>
  );
};

// Lead Detail Modal Component
const LeadDetailModal = ({ 
  lead, 
  isOpen, 
  onClose 
}: { 
  lead: PipelineLead | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Lead Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Lead Info */}
        <div className="space-y-4">
          {/* Basic Info */}
          <div className="flex items-start space-x-4">
            {lead.avatar ? (
              <Image 
                src={lead.avatar} 
                alt={lead.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xl font-medium text-gray-600">
                  {lead.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
              <p className="text-gray-600">{lead.company}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-500">{lead.email}</span>
                <span className="text-sm text-gray-500">{lead.phone}</span>
              </div>
            </div>
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <p className="text-sm text-gray-900 capitalize">{lead.status.replace('_', ' ')}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Priority</label>
              <p className="text-sm text-gray-900 capitalize">{lead.priority}</p>
            </div>
          </div>

          {/* Lead Score and Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Lead Score</label>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${lead.leadScore}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{lead.leadScore}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Deal Value</label>
              <p className="text-sm text-gray-900">${lead.value?.toLocaleString() || 'N/A'}</p>
            </div>
          </div>

          {/* Activity */}
          <div>
            <label className="text-sm font-medium text-gray-700">Recent Activity</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {getIcon('message-circle', 'w-4 h-4', 16)}
                <span>{lead.conversationCount} conversations</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {getIcon('message-circle', 'w-4 h-4', 16)}
                <span>Last activity: {lead.lastActivity.toLocaleDateString()}</span>
              </div>
              {lead.estimatedCloseDate && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  {getIcon('message-circle', 'w-4 h-4', 16)}
                  <span>Est. close: {lead.estimatedCloseDate.toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-gray-700">Tags</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {lead.tags.map((tag) => (
                <span 
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Last Message */}
          {lead.lastMessage && (
            <div>
              <label className="text-sm font-medium text-gray-700">Last Message</label>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-900">{lead.lastMessage.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {lead.lastMessage.sender === 'lead' ? 'From lead' : 'From agent'} • {lead.lastMessage.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
            View Conversation
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
            Take Action
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Pipeline Page Component
export default function PipelinePage() {
  const t = useTranslations('pipeline');
  
  const [selectedLead, setSelectedLead] = useState<PipelineLead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stages, setStages] = useState(() => createPipelineStages(t));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Configure drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleLeadClick = (lead: PipelineLead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = () => {
    // This provides real-time feedback during drag
    // The visual feedback is handled by the DroppableStage component
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) {
      console.log('No drop target found');
      return;
    }

    const leadId = active.id as string;
    const overId = over.id as string;

    console.log('Drag end:', { leadId, overId });

    // Find the lead and current stage
    const lead = stages.flatMap(stage => stage.leads).find(l => l.id === leadId);
    if (!lead) {
      console.log('Lead not found:', leadId);
      return;
    }

    const currentStage = stages.find(stage => stage.leads.some(l => l.id === leadId));
    if (!currentStage) {
      console.log('Current stage not found for lead:', leadId);
      return;
    }

    console.log('Current stage:', currentStage.id);

    // Determine the target stage
    let targetStageId: string;
    
    // If dropped on a stage (droppable area)
    if (stages.some(stage => stage.id === overId)) {
      targetStageId = overId;
      console.log('Dropped on stage:', targetStageId);
    } else {
      // If dropped on another lead, find which stage that lead belongs to
      const targetStage = stages.find(stage => stage.leads.some(l => l.id === overId));
      if (!targetStage) {
        console.log('Target stage not found for overId:', overId);
        return;
      }
      targetStageId = targetStage.id;
      console.log('Dropped on lead in stage:', targetStageId);
    }

    // Don't do anything if dropped in the same stage
    if (currentStage.id === targetStageId) {
      console.log('Dropped in same stage, no action needed');
      return;
    }

    // Update the lead's status
    const updatedLead = { ...lead, status: targetStageId as PipelineLead['status'] };
    console.log('Updated lead:', updatedLead);

    // Update stages
    setStages(prevStages => {
      console.log('Previous stages:', prevStages.map(s => ({ id: s.id, leadCount: s.leads.length })));
      
      const newStages = prevStages.map(stage => {
        if (stage.id === currentStage.id) {
          // Remove lead from current stage
          const newLeads = stage.leads.filter(l => l.id !== leadId);
          console.log(`Removing lead from ${stage.id}, new count: ${newLeads.length}`);
          return {
            ...stage,
            leads: newLeads
          };
        } else if (stage.id === targetStageId) {
          // Add lead to new stage
          const newLeads = [...stage.leads, updatedLead];
          console.log(`Adding lead to ${stage.id}, new count: ${newLeads.length}`);
          return {
            ...stage,
            leads: newLeads
          };
        }
        return stage;
      });
      
      console.log('New stages:', newStages.map(s => ({ id: s.id, leadCount: s.leads.length })));
      return newStages;
    });

    // Here you would typically make an API call to update the backend
    console.log(`Moved lead ${leadId} from ${currentStage.id} to ${targetStageId}`);
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    
    // TODO: Add API call to update lead status in backend
    // updateLeadStage(leadId, targetStageId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
              <p className="text-gray-600">{t('subtitle')}</p>
              <p className="text-sm text-blue-600 mt-1">
                {t('dragHint')}
              </p>
            </div>
            <div className="flex items-center space-x-3">
                <Link 
                  href="/dashboard/pipeline/analytics"
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                {getIcon('bar-chart', 'w-4 h-4', 16)}
                <span>{t('analytics')}</span>
              </Link>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                {getIcon('hash', 'w-4 h-4', 16)}
                <span>{t('filters')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Dashboard */}
        <MetricsDashboard t={t} />

        {/* Search and Filters */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex-1 relative">
            {getIcon('search', 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4', 16)}
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Pipeline Stages */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {stages.map((stage) => (
            <DroppableStage
              key={stage.id}
              stage={stage}
              onLeadClick={handleLeadClick}
              t={t}
            />
          ))}
        </div>

        {/* Lead Detail Modal */}
        <LeadDetailModal
          lead={selectedLead}
          isOpen={isModalOpen}
          onClose={closeModal}
        />

        {/* Success Notification */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
            {getIcon('check-circle', 'w-5 h-5', 20)}
            <span>{t('leadMovedSuccessfully')}</span>
          </div>
        )}
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeId ? (
          <div className="bg-white rounded-lg p-3 shadow-lg border-2 border-blue-500 rotate-2 scale-105">
            <LeadCardContent 
              lead={stages.flatMap(stage => stage.leads).find(lead => lead.id === activeId)!} 
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
