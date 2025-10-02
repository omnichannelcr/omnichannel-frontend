'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { 
  CustomerList, 
  CustomerDetail, 
  CustomerSearch, 
  CustomerStats, 
  CustomerEditModal 
} from '@/components';
import { 
  mockCustomers, 
  searchCustomers 
} from '@/data/customers';
import { Customer, CustomerFilters } from '@/types/customers';

export default function CustomersPage() {
  const t = useTranslations('customers');
  
  // State management
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [filters, setFilters] = useState<CustomerFilters>({
    search: '',
    status: '',
    priority: '',
    source: '',
    tags: []
  });

  // Filtered customers based on search and filters
  const filteredCustomers = useMemo(() => {
    let result = customers;

    // Apply search filter
    if (filters.search) {
      result = searchCustomers(filters.search);
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(customer => customer.status === filters.status);
    }

    // Apply priority filter
    if (filters.priority) {
      result = result.filter(customer => customer.priority === filters.priority);
    }

    // Apply source filter
    if (filters.source) {
      result = result.filter(customer => customer.source === filters.source);
    }

    // Apply tags filter
    if (filters.tags.length > 0) {
      result = result.filter(customer => 
        filters.tags.some(tag => customer.tags.includes(tag))
      );
    }

    return result;
  }, [customers, filters]);

  // Calculate stats for filtered customers
  const currentStats = useMemo(() => {
    const total = filteredCustomers.length;
    const active = filteredCustomers.filter(c => c.status === 'active').length;
    const prospects = filteredCustomers.filter(c => c.status === 'prospect').length;
    const leads = filteredCustomers.filter(c => c.status === 'lead').length;
    const totalValue = filteredCustomers.reduce((sum, c) => sum + c.totalValue, 0);
    const averageValue = total > 0 ? totalValue / total : 0;

    return {
      total,
      active,
      prospects,
      leads,
      totalValue,
      averageValue
    };
  }, [filteredCustomers]);

  // Event handlers
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsEditModalOpen(true);
    setIsAddingNew(false);
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setIsEditModalOpen(true);
    setIsAddingNew(true);
  };

  const handleSaveCustomer = (customerData: Customer) => {
    if (isAddingNew) {
      // Add new customer
      setCustomers(prev => [...prev, customerData]);
    } else {
      // Update existing customer
      setCustomers(prev => 
        prev.map(c => c.id === customerData.id ? customerData : c)
      );
      
      // Update selected customer if it's the one being edited
      if (selectedCustomer?.id === customerData.id) {
        setSelectedCustomer(customerData);
      }
    }
    
    setIsEditModalOpen(false);
    setEditingCustomer(null);
    setIsAddingNew(false);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingCustomer(null);
    setIsAddingNew(false);
  };

  const handleCloseDetail = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      {/* Stats Overview */}
      <CustomerStats stats={currentStats} />

      {/* Search and Filters */}
      <CustomerSearch
        filters={filters}
        onFiltersChange={setFilters}
        onAddCustomer={handleAddCustomer}
      />

      {/* Main Content */}
      <div className="w-full">
        {/* Customer List */}
        <CustomerList
          customers={filteredCustomers}
          onSelectCustomer={handleSelectCustomer}
          onEditCustomer={handleEditCustomer}
          selectedCustomerId={selectedCustomer?.id}
        />
      </div>

      {/* Customer Detail Modal */}
      <CustomerDetail
        customer={selectedCustomer}
        isOpen={!!selectedCustomer}
        onEdit={handleEditCustomer}
        onClose={handleCloseDetail}
      />

      {/* Edit/Add Customer Modal */}
      <CustomerEditModal
        customer={editingCustomer}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCustomer}
        isNew={isAddingNew}
      />
    </div>
  );
}