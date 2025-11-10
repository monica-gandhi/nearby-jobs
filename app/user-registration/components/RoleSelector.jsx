'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, setSelectedRoleId } from '@/common/store/slices/roleSlice';
import { useEffect } from 'react';
import Icon from '@/components/layout/AppIcon';

const RoleSelector = ({ onRoleSelect }) => {
  const dispatch = useDispatch();
  const { roles, selectedRoleId } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleSelect = (role) => {
    dispatch(setSelectedRoleId(role.id)); // <-- ADD THIS LINE to update Redux
    onRoleSelect(role.roleName);          // <-- keep this to move to next step
  };


  return (
    <div>
      <h3 className="text-xl font-semibold text-center mb-6">Select Your Role</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => {
          const isApplicant = role.roleName === 'jobseeker';
          const config = {
            icon: isApplicant ? 'User' : 'Building2',
            label: isApplicant ? 'Job Seeker' : 'Employer',
            desc: isApplicant
              ? 'Looking for job opportunities and career growth.'
              : 'Hire top talent and manage recruitment easily.'
          };

          return (
            <div
              key={role.id}
              onClick={() => handleSelect(role)}
              className={`p-6 rounded-lg border cursor-pointer transition-all ${selectedRoleId === role.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/40'
                }`}
            >
              <div className="flex items-center space-x-4">
                <Icon name={config.icon} size={24} className="text-primary" />
                <div>
                  <h4 className="font-semibold text-lg">{config.label}</h4>
                  <p className="text-gray-500 text-sm">{config.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelector;
