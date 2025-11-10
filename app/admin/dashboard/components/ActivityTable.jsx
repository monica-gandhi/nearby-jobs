import React, { useState } from 'react';
import Icon from '@/components/layout/AppIcon';
import Button from '@/components/shared/button/page';
const ActivityTable = ({ title, data, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('all');
  const itemsPerPage = 5;

  const filteredData = data?.filter(item => {
    if (filterType === 'all') return true;
    return item?.type === filterType;
  });

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success border-success/20', label: 'Active' },
      pending: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pending' },
      expired: { color: 'bg-error/10 text-error border-error/20', label: 'Expired' },
      completed: { color: 'bg-success/10 text-success border-success/20', label: 'Completed' },
      failed: { color: 'bg-error/10 text-error border-error/20', label: 'Failed' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-md border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getTypeIcon = (itemType) => {
    const typeIcons = {
      user: 'User',
      employer: 'Building2',
      login: 'LogIn',
      subscription: 'CreditCard',
      payment: 'DollarSign'
    };
    return typeIcons?.[itemType] || 'Activity';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e?.target?.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">All Types</option>
              <option value="user">Users</option>
              <option value="employer">Employers</option>
              <option value="subscription">Subscriptions</option>
              <option value="payment">Payments</option>
            </select>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">User</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Activity</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Date</th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item) => (
              <tr key={item?.id} className="border-b border-border hover:bg-muted/30 transition-micro">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Icon name={getTypeIcon(item?.type)} size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item?.userName}</p>
                      <p className="text-xs text-muted-foreground">{item?.userEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-foreground">{item?.activity}</p>
                  {item?.details && (
                    <p className="text-xs text-muted-foreground mt-1">{item?.details}</p>
                  )}
                </td>
                <td className="py-4 px-6">
                  {getStatusBadge(item?.status)}
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-foreground">{formatDate(item?.date)}</p>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData?.length)} of {filteredData?.length} results
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <span className="text-sm text-foreground">
                {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTable;