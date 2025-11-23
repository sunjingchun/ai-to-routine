export default function RoutineCard({ title, steps }: any) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="space-y-3">
        {steps.map((item: any, idx: number) => (
          <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
            <p className="font-medium text-gray-900">
              步骤 {item.step}：{item.product}
            </p>
            <p className="text-gray-700 text-sm mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
