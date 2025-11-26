type RoutineCardProps = {
  steps: {
    step: number;
    product: string;
    description: string;
  }[];
};

export default function RoutineCard({ steps }: RoutineCardProps) {
  return (
    <div className="space-y-3">
      {steps.map((item) => (
        <div
          key={item.step}
          className="p-3 rounded-lg bg-gray-50 border border-gray-100"
        >
          <p className="font-medium text-gray-900">
            步骤 {item.step}：{item.product}
          </p>
          <p className="text-gray-700 text-sm mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
