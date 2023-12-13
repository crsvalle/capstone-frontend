import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuHandler, MenuList, MenuItem, Avatar, Typography } from '@material-tailwind/react';
import { UserCircleIcon, Cog6ToothIcon, ChevronDownIcon, PowerIcon } from '@heroicons/react/24/solid';

const ProfileMenu = ({ logout, id }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = () => {
    logout();
    closeMenu();
  };

  const profileMenuItems = [
    {
      label: 'My Profile',
      icon: UserCircleIcon,
      path: '/user/profile', 
    },
    {
      label: 'Edit Profile',
      icon: Cog6ToothIcon,
      path: `/user/${id}/edit`
    },
    {
      label: 'Sign Out',
      icon: PowerIcon,
      onClick: handleSignOut,
      isRed: true, 
    },
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="User Avatar"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1527877083249-88d406b6ac27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHdoaXRlJTIwd29tYW58ZW58MHx8MHx8fDA%3D"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path, onClick, isRed }, key) => (
          <MenuItem
            key={label}
            onClick={onClick || closeMenu}
            className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}
          >
            <Link to={path} className="flex items-center gap-2 w-full">
              {React.createElement(icon, {
                className: `h-4 w-4 ${isRed ? 'text-red-500' : ''}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className={`font-normal ${isRed ? 'text-red-500' : ''}`}
              >
                {label}
              </Typography>
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
