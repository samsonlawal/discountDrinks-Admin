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
    <Card className="p-6 h-full flex flex-col justify-between">
      <div className="flex-1 flex flex-row items-start gap-4 ">
                <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
        </div>
        <div className={`${bgColor} p-2 rounded-lg flex items-center justify-center shrink-0`}>
          {typeof icon === "string" ? (
            <img src={icon} alt={title} className="w-5 h-5 brightness-0 invert" />
          ) : (
            <div className="text-white scale-90">
              {icon}
            </div>
          )}
        </div>

      </div>
      {trend && trend.value && (
        <p className={`text-sm ${trend.isPositive ? "text-green-600" : "text-red-600"} font-medium`}>
          {(trend.showArrow ?? true) && (trend.isPositive ? "↑ " : "↓ ")}
          {trend.value}
        </p>
      )}
    </Card>
  );
};

export default Card;
