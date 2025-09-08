import React, { useContext, useEffect, useState } from "react";
import {
  User as UserIcon,
  Bell,
  Shield,
  Palette,
  Database,
  Mail,
  Smartphone,
  Save,
  Key,
} from "lucide-react";
import { readAllDocuments, updateDocument } from "../../utils/db";
import { User, AuthContext } from "../../context/AuthContext";

export const SettingsPanel: React.FC = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    profile: {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@bottaye.com",
      phone: "+254 700 123 456",
      role: "Bottaye Manager",
      timezone: "America/New_York",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      maintenanceAlerts: true,
      paymentReminders: true,
      leaseExpirations: true,
      marketingEmails: false,
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      loginNotifications: true,
    },
    preferences: {
      theme: "light",
      currency: "USD",
      dateFormat: "MM/DD/YYYY",
      language: "en",
    },
  });
  const [users, setUsers] = useState<User[]>([]);

  const settingsTabs = [
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "data", label: "Data & Export", icon: Database },
    { id: "users", label: "User management", icon: Database },
  ];

  const handleSave = () => {
    console.log("Settings saved:", settings);
    // In a real app, this would make an API call
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={settings.profile.firstName}
              onChange={(e) =>
                updateSetting("profile", "firstName", e.target.value)
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={settings.profile.lastName}
              onChange={(e) =>
                updateSetting("profile", "lastName", e.target.value)
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={settings.profile.email}
              onChange={(e) =>
                updateSetting("profile", "email", e.target.value)
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={settings.profile.phone}
              onChange={(e) =>
                updateSetting("profile", "phone", e.target.value)
              }
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={settings.profile.role}
              onChange={(e) => updateSetting("profile", "role", e.target.value)}
              className="select-field"
            >
              <option value="Bottaye Manager">Bottaye Manager</option>
              <option value="Administrator">Administrator</option>
              <option value="Assistant">Assistant</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={settings.profile.timezone}
              onChange={(e) =>
                updateSetting("profile", "timezone", e.target.value)
              }
              className="select-field"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Profile Picture
        </h3>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-white" />
          </div>
          <div>
            <button className="btn-primary text-sm">Upload New Photo</button>
            <p className="text-xs text-gray-500 mt-2">
              JPG, PNG or GIF (max. 2MB)
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {[
            {
              key: "emailNotifications",
              label: "Email Notifications",
              description: "Receive notifications via email",
              icon: Mail,
            },
            {
              key: "pushNotifications",
              label: "Push Notifications",
              description: "Receive push notifications in browser",
              icon: Smartphone,
            },
            {
              key: "maintenanceAlerts",
              label: "Maintenance Alerts",
              description: "Get notified about maintenance requests",
              icon: Bell,
            },
            {
              key: "paymentReminders",
              label: "Payment Reminders",
              description: "Reminders for overdue payments",
              icon: Bell,
            },
            {
              key: "leaseExpirations",
              label: "Lease Expiration Alerts",
              description: "Alerts for upcoming lease expirations",
              icon: Bell,
            },
            {
              key: "marketingEmails",
              label: "Marketing Emails",
              description: "Receive product updates and tips",
              icon: Mail,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">{item.label}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      settings.notifications[
                        item.key as keyof typeof settings.notifications
                      ]
                    }
                    onChange={(e) =>
                      updateSetting("notifications", item.key, e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Security Settings
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) =>
                    updateSetting("security", "twoFactorAuth", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    Login Notifications
                  </h4>
                  <p className="text-sm text-gray-600">
                    Get notified when someone logs into your account
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.loginNotifications}
                  onChange={(e) =>
                    updateSetting(
                      "security",
                      "loginNotifications",
                      e.target.checked
                    )
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Session Timeout</h4>
                <p className="text-sm text-gray-600">
                  Automatically log out after period of inactivity
                </p>
              </div>
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) =>
                  updateSetting(
                    "security",
                    "sessionTimeout",
                    parseInt(e.target.value)
                  )
                }
                className="select-field"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={240}>4 hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Password</h3>
        <div className="space-y-4">
          <button className="btn-secondary">Change Password</button>
          <p className="text-sm text-gray-600">Last changed 3 months ago</p>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Display Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={settings.preferences.theme}
              onChange={(e) =>
                updateSetting("preferences", "theme", e.target.value)
              }
              className="select-field"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={settings.preferences.language}
              onChange={(e) =>
                updateSetting("preferences", "language", e.target.value)
              }
              className="select-field"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={settings.preferences.currency}
              onChange={(e) =>
                updateSetting("preferences", "currency", e.target.value)
              }
              className="select-field"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Format
            </label>
            <select
              value={settings.preferences.dateFormat}
              onChange={(e) =>
                updateSetting("preferences", "dateFormat", e.target.value)
              }
              className="select-field"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Data Management
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-900 mb-2">Export Data</h4>
            <p className="text-sm text-gray-600 mb-4">
              Download all your property management data
            </p>
            <button className="btn-primary">Export All Data</button>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-medium text-gray-900 mb-2">Backup Settings</h4>
            <p className="text-sm text-gray-600 mb-4">
              Automatic backups are enabled daily at 2:00 AM
            </p>
            <button className="btn-secondary">Configure Backup</button>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <h4 className="font-medium text-red-900 mb-2">Danger Zone</h4>
            <p className="text-sm text-red-600 mb-4">
              Permanently delete your account and all data
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-300">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotAllowed = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          User Management
        </h3>
        <div className="space-y-4">
          <h1 className="text-xl font-bold ">
            This page is only allowed to be accessed by superadmins
          </h1>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">User Management</h3>
      <ul>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 text-sm text-gray-900">{user.name}</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  <select
                    value={user.role}
                    onChange={(e) => {
                      const updatedRole = e.target.value as
                        | "superadmin"
                        | "property_manager"; // Explicitly cast the value
                      const updatedUsers = users.map((u) =>
                        u.id === user.id ? { ...u, role: updatedRole } : u
                      );
                      setUsers(updatedUsers);
                    }}
                    className="select-field"
                  >
                    <option value="Property Manager">Property Manager</option>
                    <option value="superadmin">Superadmin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ul>
      <button
        className="btn-primary mt-4"
        onClick={() => {
          // Here you would send the updated users to your backend or API
          console.log("Updated users:", users);
          // Optionally show a success message or handle errors
          Promise.all(
            users.map((user) =>
              updateDocument("users", user.id, { role: user.role })
            )
          )
            .then(() => {
              alert("User roles updated successfully!");
            })
            .catch((error) => {
              console.error("Error updating user roles:", error);
              alert("Failed to update user roles.");
            });
        }}
      >
        Update user roles
      </button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileSettings();
      case "notifications":
        return renderNotificationSettings();
      case "security":
        return renderSecuritySettings();
      case "preferences":
        return renderPreferencesSettings();
      case "data":
        return renderDataSettings();
      case "users":
        return user?.role === "superadmin"
          ? renderUserManagement()
          : renderNotAllowed();
      default:
        return renderProfileSettings();
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await readAllDocuments("users");
        setUsers(
          fetchedUsers.map((user: any) => ({
            id: user.id,
            name: user.name ?? "",
            email: user.email ?? "",
            role: user.role ?? "",
          }))
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="page-enter space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-display gradient-text">
            Settings
          </h2>
          <p className="text-gray-600 mt-1">
            Manage your account preferences and system configuration
          </p>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="card p-0">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Settings</h3>
            </div>
            <nav className="p-2">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-primary-100 text-primary-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="card">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};
