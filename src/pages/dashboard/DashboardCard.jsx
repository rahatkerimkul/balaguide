// src/pages/dashboard/DashboardCard.jsx
const DashboardCard = ({ title, children }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-full h-full">
        {title && <h3 className="text-base font-medium text-gray-700 mb-2">{title}</h3>}
        {children}
    </div>
);

export default DashboardCard;
