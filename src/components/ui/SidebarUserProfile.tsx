
import React from "react";

type SidebarUserProfileProps = {
  name: string;
  email: string;
  avatarUrl: string;
};

const SidebarUserProfile = ({ name, email, avatarUrl }: SidebarUserProfileProps) => (
  <div className="flex items-center px-4 py-3 border-b">
    <img
      src={avatarUrl}
      alt={name}
      className="w-10 h-10 rounded-full object-cover mr-3"
    />
    <div>
      <div className="font-bold">{name}</div>
      <div className="text-xs text-gray-400">{email}</div>
    </div>
  </div>
);

export default SidebarUserProfile;
