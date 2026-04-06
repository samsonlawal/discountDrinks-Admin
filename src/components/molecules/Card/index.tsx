import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number | React.ReactNode;
  icon: string | React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
    showArrow?: boolean;
  };
  bgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  bgColor = "bg-blue-500",
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          {trend && trend.value && (
            <p
              className={`text-sm mt-2 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}
            >
              {(trend.showArrow ?? true) && (trend.isPositive ? "↑ " : "↓ ")}
              {trend.value}
            </p>
          )}
        </div>
        <div className={`${bgColor} p-3 rounded-lg flex items-center justify-center`}>
          {typeof icon === "string" ? (
            <img src={icon} alt={title} className="w-6 h-6 brightness-0 invert" />
          ) : (
            <div className="text-white">
              {icon}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Card;
