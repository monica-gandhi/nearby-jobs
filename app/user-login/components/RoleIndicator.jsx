'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, setSelectedRoleId } from '@/common/store/slices/roleSlice';
import Icon from '@/components/layout/AppIcon';

const RoleIndicator = () => {
  const dispatch = useDispatch();
  const { roles = [], selectedRoleId } = useSelector((state) => state.role || {});

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const getConfig = (roleName) => {
    const name = (roleName || "").toLowerCase();
    const isApplicant = name.includes('job') || name.includes('applic') || name === 'jobseeker';
    return {
      icon: isApplicant ? 'User' : 'Building2',
      label: isApplicant ? 'Job Seeker' : 'Employer',
      description: isApplicant ? 'Find your dream job' : 'Hire top talent',
      color: isApplicant ? 'text-accent' : 'text-primary',
    };
  };

  return (
    <div className="mb-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Choose your role</h3>
        <p className="text-sm text-muted-foreground">Select Job Seeker or Employer before logging in</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((role) => {
          const cfg = getConfig(role.roleName);
          const active = selectedRoleId === role.id;
          return (
            <button
              key={role.id}
              onClick={() => dispatch(setSelectedRoleId(role.id))}
              className={`flex flex-col items-center p-4 rounded-md border transition text-left
                ${active ? 'border-primary bg-primary/10' : 'bg-muted/50 border-border hover:bg-muted'}
              `}
              type="button"
            >
              <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center mb-3">
                <Icon name={cfg.icon} size={20} className={cfg.color} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">{cfg.label}</h4>
                <p className="text-xs text-muted-foreground">{cfg.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoleIndicator;

