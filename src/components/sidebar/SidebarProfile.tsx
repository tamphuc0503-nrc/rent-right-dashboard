
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function SidebarProfile({ isOpen }: { isOpen: boolean }) {
  return (
    <div className={cn(
      "flex items-center p-4 border-t border-gray-200",
      isOpen ? "justify-between" : "justify-center"
    )}>
      <div className="flex items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        {isOpen && (
          <div className="ml-3">
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        )}
      </div>
    </div>
  );
}
